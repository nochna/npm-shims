'use strict'
// Ασφαλές deepmerge(a, b[, opts]) / deepmerge.all([...]): αγνοεί __proto__/constructor/prototype,
// πίνακες = συνένωση (όπως το αρχικό), αντιγράφει — δεν αλλάζει τα ορίσματα.
const UNSAFE = new Set(['__proto__', 'constructor', 'prototype'])
const isPlain = v => v !== null && typeof v === 'object' && !Array.isArray(v) &&
  (Object.getPrototypeOf(v) === Object.prototype || Object.getPrototypeOf(v) === null)
const clone = v => Array.isArray(v) ? v.map(clone) : isPlain(v) ? merge({}, v) : v
function merge(target, source) {
  if (Array.isArray(target) && Array.isArray(source)) return [...target.map(clone), ...source.map(clone)]
  if (!isPlain(source)) return clone(source)
  const out = {}
  if (isPlain(target)) for (const k of Object.keys(target)) if (!UNSAFE.has(k)) out[k] = clone(target[k])
  for (const k of Object.keys(source)) {
    if (UNSAFE.has(k)) continue
    out[k] = Object.prototype.hasOwnProperty.call(out, k) && (isPlain(out[k]) || Array.isArray(out[k]))
      ? merge(out[k], source[k]) : clone(source[k])
  }
  return out
}
function deepmerge(a, b) { return merge(a, b) }
deepmerge.all = arr => {
  if (!Array.isArray(arr)) throw new Error('first argument should be an array')
  return arr.reduce((acc, x) => merge(acc, x), {})
}
module.exports = deepmerge
module.exports.default = deepmerge
