import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

async function importOrUndefined(path) {
  try {
    return await import(path);
  } catch {
    return undefined;
  }
}

async function readOrEmpty(path, encoding) {
  try {
    return await readFile(new URL(path, import.meta.url), encoding);
  } catch {
    return encoding ? '' : Buffer.alloc(0);
  }
}

function pngDimensions(buffer) {
  if (buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') {
    return undefined;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

async function createWorkerHarness(fetchImplementation = async () => {
  throw new Error('offline');
}) {
  const origin = 'https://bunex.test';
  const source = await readOrEmpty('../public/sw.js', 'utf8');
  const listeners = new Map();
  const stores = new Map();
  let fetcher = fetchImplementation;
  let skippedWaiting = false;
  let claimedClients = false;

  const normalize = (request) => new URL(
    typeof request === 'string' ? request : request.url,
    origin,
  ).href;

  const cacheStorage = {
    async open(name) {
      const store = stores.get(name) ?? new Map();
      stores.set(name, store);

      return {
        async addAll(urls) {
          for (const url of urls) {
            store.set(normalize(url), response(`precache:${url}`));
          }
        },
        async match(request) {
          return store.get(normalize(request));
        },
        async put(request, value) {
          store.set(normalize(request), value);
        },
        async delete(request) {
          return store.delete(normalize(request));
        },
      };
    },
    async match(request) {
      for (const store of stores.values()) {
        const value = store.get(normalize(request));
        if (value) return value;
      }
      return undefined;
    },
    async keys() {
      return [...stores.keys()];
    },
    async delete(name) {
      return stores.delete(name);
    },
  };

  const worker = {
    location: { origin },
    clients: {
      async claim() {
        claimedClients = true;
      },
    },
    addEventListener(type, listener) {
      listeners.set(type, listener);
    },
    async skipWaiting() {
      skippedWaiting = true;
    },
  };

  vm.runInNewContext(source, {
    self: worker,
    caches: cacheStorage,
    URL,
    fetch: (...args) => fetcher(...args),
  });

  async function dispatch(type, init = {}) {
    const listener = listeners.get(type);
    let lifetime;
    let responsePromise;
    const event = {
      ...init,
      waitUntil(promise) {
        lifetime = Promise.resolve(promise);
      },
      respondWith(promise) {
        responsePromise = Promise.resolve(promise);
      },
    };

    listener?.(event);
    if (lifetime) await lifetime;

    return { handled: Boolean(responsePromise), response: responsePromise && await responsePromise };
  }

  return {
    dispatch,
    stores,
    normalize,
    cacheStorage,
    setFetch(nextFetcher) {
      fetcher = nextFetcher;
    },
    state() {
      return { skippedWaiting, claimedClients };
    },
  };
}

function response(body, ok = true) {
  return {
    body,
    ok,
    clone() {
      return response(body, ok);
    },
  };
}

test('publishes an installable standalone BUNEX manifest', async () => {
  const module = await importOrUndefined('../lib/pwa.mjs');
  const manifest = module?.webAppManifest;

  assert.deepEqual(manifest, {
    name: 'BUNEX Smashburger',
    short_name: 'BUNEX',
    description: 'BUNEX Smashburger in Teltow — knusprig gesmasht, saftig serviert.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0a0a08',
    theme_color: '#ffec00',
    lang: 'de',
    categories: ['food', 'lifestyle'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  });
});

test('ships install icons at every size declared by the manifest', async () => {
  const icons = [
    ['../public/icons/icon-192.png', { width: 192, height: 192 }],
    ['../public/icons/icon-512.png', { width: 512, height: 512 }],
    ['../public/icons/icon-maskable-512.png', { width: 512, height: 512 }],
  ];

  for (const [path, expected] of icons) {
    assert.deepEqual(pngDimensions(await readOrEmpty(path)), expected, path);
  }
});

test('registers the root service worker only in production', async () => {
  const module = await importOrUndefined('../lib/pwa.mjs');

  assert.equal(module?.shouldRegisterServiceWorker('development'), false);
  assert.equal(module?.shouldRegisterServiceWorker('test'), false);
  assert.equal(module?.shouldRegisterServiceWorker('production'), true);
  assert.deepEqual(module?.serviceWorkerRegistration, {
    scriptURL: '/sw.js',
    options: { scope: '/', updateViaCache: 'none' },
  });
});

test('mounts PWA registration with the brand theme at the application root', async () => {
  const layout = await readOrEmpty('../app/layout.tsx', 'utf8');

  assert.match(layout, /import \{ PwaRegistration \} from "@\/components\/pwa-registration"/);
  assert.match(layout, /themeColor:\s*"#ffec00"/);
  assert.match(layout, /<PwaRegistration \/>/);
});

test('precaches the complete offline shell during service-worker installation', async () => {
  const harness = await createWorkerHarness();

  await harness.dispatch('install');

  const staticCache = harness.stores.get('bunex-pwa-v2-static');
  assert.deepEqual(
    [...staticCache.keys()].sort(),
    [
      '/favicon.svg',
      '/icons/icon-192.png',
      '/icons/icon-512.png',
      '/icons/icon-maskable-512.png',
      '/offline.html',
    ].map(harness.normalize).sort(),
  );
  assert.equal(harness.state().skippedWaiting, true);
});

test('uses the self-contained fallback when the first offline request is home', async () => {
  const harness = await createWorkerHarness();
  await harness.dispatch('install');
  const request = { method: 'GET', mode: 'navigate', destination: 'document', url: 'https://bunex.test/' };

  const result = await harness.dispatch('fetch', { request });

  assert.equal(result.response.body, 'precache:/offline.html');
});

test('activation removes only obsolete BUNEX caches', async () => {
  const harness = await createWorkerHarness();
  await harness.cacheStorage.open('bunex-pwa-v1-static');
  await harness.cacheStorage.open('bunex-pwa-v2-static');
  await harness.cacheStorage.open('bunex-pwa-v2-runtime');
  await harness.cacheStorage.open('another-app-cache');

  await harness.dispatch('activate');

  assert.deepEqual((await harness.cacheStorage.keys()).sort(), [
    'another-app-cache',
    'bunex-pwa-v2-runtime',
    'bunex-pwa-v2-static',
  ]);
  assert.equal(harness.state().claimedClients, true);
});

test('leaves non-GET and cross-origin requests entirely to the browser', async () => {
  const harness = await createWorkerHarness();

  const post = await harness.dispatch('fetch', {
    request: { method: 'POST', mode: 'navigate', destination: '', url: 'https://bunex.test/' },
  });
  const external = await harness.dispatch('fetch', {
    request: { method: 'GET', mode: 'navigate', destination: '', url: 'https://orders.example/menu' },
  });

  assert.equal(post.handled, false);
  assert.equal(external.handled, false);
});

test('uses the network for navigations and stores successful pages for later', async () => {
  const online = response('fresh page');
  const harness = await createWorkerHarness(async () => online);
  const request = { method: 'GET', mode: 'navigate', destination: 'document', url: 'https://bunex.test/menu' };

  const result = await harness.dispatch('fetch', { request });

  assert.equal(result.response, online);
  assert.equal((await harness.cacheStorage.match(request)).body, 'fresh page');
});

test('prefers a refreshed runtime homepage over installation-era HTML when offline', async () => {
  const fresh = response('fresh homepage');
  const harness = await createWorkerHarness(async () => fresh);
  const request = { method: 'GET', mode: 'navigate', destination: 'document', url: 'https://bunex.test/' };
  const staticCache = await harness.cacheStorage.open('bunex-pwa-v2-static');
  await staticCache.put(request, response('installation homepage'));

  assert.equal((await harness.dispatch('fetch', { request })).response.body, 'fresh homepage');
  harness.setFetch(async () => {
    throw new Error('offline');
  });
  assert.equal((await harness.dispatch('fetch', { request })).response.body, 'fresh homepage');
});

test('falls back to the self-contained offline page when navigation fails', async () => {
  const harness = await createWorkerHarness();
  await harness.dispatch('install');
  const request = { method: 'GET', mode: 'navigate', destination: 'document', url: 'https://bunex.test/missing' };

  const result = await harness.dispatch('fetch', { request });

  assert.equal(result.response.body, 'precache:/offline.html');
});

test('reuses a cached static asset without another network request', async () => {
  let requests = 0;
  const harness = await createWorkerHarness(async () => {
    requests += 1;
    return response('photo');
  });
  const request = { method: 'GET', mode: 'no-cors', destination: 'image', url: 'https://bunex.test/photo.webp' };

  assert.equal((await harness.dispatch('fetch', { request })).response.body, 'photo');
  harness.setFetch(async () => {
    requests += 1;
    throw new Error('network should not be used');
  });
  assert.equal((await harness.dispatch('fetch', { request })).response.body, 'photo');
  assert.equal(requests, 1);
});

test('defines no-cache and same-origin security headers for the worker script', async () => {
  const module = await importOrUndefined('../lib/pwa.mjs');

  assert.deepEqual(module?.serviceWorkerHeaders, [
    { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
    { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
    { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'" },
  ]);
});

test('offline fallback is self-contained and offers a retry path', async () => {
  const offlinePage = await readOrEmpty('../public/offline.html', 'utf8');

  assert.match(offlinePage, /Du bist gerade offline\./);
  assert.match(offlinePage, /href="\/"/);
  assert.doesNotMatch(offlinePage, /<(?:script|link)\b/i);
});
