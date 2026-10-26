import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import net from 'node:net';

async function getAvailablePort() {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(url, process) {
  const timeoutAt = Date.now() + 30_000;

  while (Date.now() < timeoutAt) {
    if (process.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready with code ${process.exitCode}`);
    }

    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }

  throw new Error('Next.js did not become ready within 30 seconds');
}

test('an unknown URL returns the branded 404 with clear recovery routes', { timeout: 60_000 }, async (t) => {
  const port = await getAvailablePort();
  const origin = `http://127.0.0.1:${port}`;
  const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '-p', String(port)], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    stdio: 'ignore',
  });

  t.after(() => {
    server.kill('SIGTERM');
  });

  await waitForServer(origin, server);

  const response = await fetch(`${origin}/dieser-link-existiert-nicht`);
  const html = await response.text();

  assert.equal(response.status, 404);
  assert.match(html, /Dieser Smash ist vom Tisch\./);
  assert.match(html, /href="\/"[^>]*>[^<]*Zur Startseite/);
  assert.match(html, /href="\/#karte"[^>]*>[^<]*Speisekarte ansehen/);
});
