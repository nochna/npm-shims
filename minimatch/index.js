'use strict'
// minimatch 3: `const minimatch = require('minimatch'); minimatch(p, pattern)` + minimatch.Minimatch/filter/makeRe…
// minimatch 9+: `const { minimatch, Minimatch } = require('minimatch')` — η συνάρτηση έχει ήδη τα περισσότερα πεδία.
// Το shim εξυπηρετεί και τα δύο, πάνω στη διορθωμένη έκδοση. Το `makeRe` (eslint-plugin-import) δεν υπάρχει
// πια στην 11 (δεν φτιάχνει regex) → αντικείμενο με `.test()` πάνω στο `Minimatch.match` (ο κανόνας μόνο αυτό καλεί).
const real = require('minimatch-fixed')
const minimatch = real.minimatch
const makeRe = (pattern, options = {}) => { const mm = new real.Minimatch(pattern, options); return { test: s => mm.match(s), source: pattern } }
module.exports = Object.assign(minimatch, real, { minimatch, makeRe, default: minimatch })
