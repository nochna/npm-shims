'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const deepmerge = require('./index.js')

test('deep merge, arrays concatenated, inputs untouched', () => {
  const a = { intl: { accept_languages: 'el' }, list: [1], keep: true }
  const b = { intl: { charset: 'utf-8' }, list: [2] }
  assert.deepEqual(deepmerge(a, b), { intl: { accept_languages: 'el', charset: 'utf-8' }, list: [1, 2], keep: true })
  assert.deepEqual(a, { intl: { accept_languages: 'el' }, list: [1], keep: true })
  assert.deepEqual(deepmerge.all([{ a: 1 }, { b: 2 }, { a: 3 }]), { a: 3, b: 2 })
})

test('ignores __proto__ / constructor / prototype', () => {
  const evil = JSON.parse('{"__proto__": {"polluted": 1}, "constructor": {"prototype": {"x": 1}}, "ok": 1}')
  const out = deepmerge({}, evil)
  assert.equal(out.ok, 1)
  assert.equal(out.polluted, undefined)
  assert.equal({}.polluted, undefined)
  assert.equal(Object.getPrototypeOf(out), Object.prototype)
})
