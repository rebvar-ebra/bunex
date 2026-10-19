import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

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
