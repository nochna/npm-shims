'use strict'
// rimraf(path[, opts], cb) / rimraf.sync(path) πάνω στο fs.rm — χωρίς glob (τα paths είναι πάντα κυριολεκτικά)
const fs = require('node:fs')
function rimraf(p, opts, cb) {
  if (typeof opts === 'function') { cb = opts; opts = {} }
  const maxRetries = (opts && opts.maxBusyTries) || 3
  fs.rm(p, { recursive: true, force: true, maxRetries, retryDelay: 100 }, err => cb && cb(err || null))
}
rimraf.sync = p => fs.rmSync(p, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 })
module.exports = rimraf
