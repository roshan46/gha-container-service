import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { add, createServer } from '../src/app.js';
test('unit: addition', () => assert.equal(add(2, 3), 5));
test('integration: health and missing route', async (t) => {
  const server = createServer().listen(0, '127.0.0.1');
  t.after(() => new Promise(resolve => server.close(resolve)));
  await once(server, 'listening');
  const base = 'http://127.0.0.1:' + server.address().port;
  const health = await fetch(base + '/health');
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: 'ok' });
  assert.equal((await fetch(base + '/missing')).status, 404);
});
