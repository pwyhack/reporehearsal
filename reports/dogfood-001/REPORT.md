# RepoRehearsal dogfood report 001

This is operator-owned demo evidence. It is not a customer result and not revenue evidence.

## Scope

- Repository: `https://github.com/pwyhack/reporehearsal`
- Issue: `https://github.com/pwyhack/reporehearsal/issues/1`
- Commit: `4c0850fb4cdb4bbd244c4f68c1d476b422af6520`
- Environment: Node `v26.0.0`, npm `11.12.1`
- Declared check: `npm test && npm run lint && npm audit --omit=dev`
- Report digest: `bf0fcf12b5ec479b29d6dd9265ca43d59febe60af3eee3a6060b0a43eb71e4c3`

## Result

Every public README release gate completed successfully without private credentials or undocumented setup. First full green result: 13.546 seconds of recorded command time.

## Timeline

| Elapsed | Event | Evidence |
| ---: | --- | --- |
| 1.481s | Clean shallow clone pinned the public commit. | [`evt_5c5afd4032d987b3`](evidence/clone.txt) |
| 8.261s | `npm install` completed with two deprecation warnings and 20 development-tree advisories. | [`evt_a64787a2d820642f`](evidence/npm-install.txt) |
| 11.961s | The production build and two product tests passed. The build emitted Node deprecation and route-classification warnings. | [`evt_97e093ad508db89e`](evidence/npm-test.txt) |
| 13.317s | ESLint passed with no findings. | [`evt_754dc78d618086b5`](evidence/npm-lint.txt) |
| 13.546s | The production-only audit reported zero vulnerabilities. | [`evt_4d1bc0ba0b4b937d`](evidence/npm-audit-production.txt) |

## Findings

1. The README is sufficient for a clean contributor to install and run every documented gate.
2. The production dependency boundary is clean according to npm's audit at run time.
3. The development toolchain remains noisy: 20 advisories, two deprecated packages, a deprecated Node API, and uncertain route classification.

## Smallest remediation plan

1. Keep `npm audit --omit=dev` as the production release boundary.
2. Track the starter toolchain advisories separately and upgrade only with a clean build and rendered-page proof.
3. Recheck vinext after its route classifier and Node registration API support change; do not hide the warnings with local guards.

## Limitations

- This is an operator-owned dogfood run, not an unrelated customer result.
- Timings exclude orchestration time between commands.
- No browser matrix or deployment mutation was in scope.
