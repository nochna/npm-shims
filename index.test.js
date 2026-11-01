'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const { mkdtempSync, writeFileSync, mkdirSync, existsSync } = require('node:fs')
const { tmpdir } = require('node:os')
const { join } = require('node:path')
const rimraf = require('./index.js')

test('removes a directory recursively (callback and sync)', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'shim-'))
  mkdirSync(join(dir, 'a', 'b'), { recursive: true })
  writeFileSync(join(dir, 'a', 'b', 'f.txt'), 'x')
  await new Promise((res, rej) => rimraf(dir, { maxBusyTries: 4 }, e => (e ? rej(e) : res())))
  assert.equal(existsSync(dir), false)
  const d2 = mkdtempSync(join(tmpdir(), 'shim-'))
  rimraf.sync(d2)
  assert.equal(existsSync(d2), false)
  await new Promise(res => rimraf(join(tmpdir(), 'does-not-exist-shim'), e => { assert.equal(e, null); res() }))
})
