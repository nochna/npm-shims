# npm-shims

Small drop-in replacements for transitive npm dependencies that have security advisories but no fixed
release compatible with the packages that depend on them. Used through `overrides` in `package.json`.

| Tag | Replaces | Advisory | Why a shim |
|---|---|---|---|
| `deepmerge-4.3.1-safe.0` | `deepmerge` ≤ 4.3.1 | GHSA-gcqx-w48m-w2h4 | no fixed release |
| `rimraf-3.0.2-safe.0` | `rimraf` 3 (callback API) | GHSA-g3hv-75wg-m249 (via glob → minimatch) | rimraf ≥ 4 dropped callbacks |
| `minimatch-3.1.5-safe.0` | `minimatch` 3 / 9 / 10 | GHSA-g3hv-75wg-m249 | ESLint plugins need the v3 API; fix only in 11 |

Each tag contains a single package at the repository root. Use the tag tarball (no `git` needed on the build machine):

```json
"overrides": {
  "deepmerge": "https://codeload.github.com/nochna/npm-shims/tar.gz/refs/tags/deepmerge-4.3.1-safe.0"
}
```

The lock file records the tarball's integrity hash, so a changed tag makes `npm ci` fail instead of installing something else.

Why not `file:` overrides: npm 11 resolves a relative `file:` path against each nested dependant, producing a broken lock file.

Tests: `node --test` inside each folder.
