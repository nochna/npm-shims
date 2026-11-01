'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const minimatch = require('./index.js')

test('v3 API: callable + Minimatch/filter/makeRe', () => {
  assert.equal(minimatch('src/a.ts', 'src/**/*.ts'), true)
  assert.equal(minimatch('a.js', '*.ts'), false)
  assert.equal(new minimatch.Minimatch('**/*.tsx').match('x/y.tsx'), true)
  assert.deepEqual(['a.ts', 'b.js'].filter(minimatch.filter('*.ts')), ['a.ts'])
  const re = minimatch.makeRe('src/**/*.ts')
  assert.equal(re.test('src/a/b.ts'), true)
  assert.equal(re.test('lib/a.ts'), false)
})

test('v9+ API: named exports', () => {
  const { minimatch: fn, Minimatch } = require('./index.js')
  assert.equal(fn('a.ts', '*.ts'), true)
  assert.equal(typeof Minimatch, 'function')
  assert.equal(minimatch.default, minimatch)
})
