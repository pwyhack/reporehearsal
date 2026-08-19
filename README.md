# RepoRehearsal

RepoRehearsal shows where a coding agent gets stuck on a real repository task before a team depends on it.

[View the live service](https://reporehearsal.kouretes.chatgpt.site)

## The pilot

Send one public GitHub repository and one bounded issue from that repository. A clean-start agent attempts the work in a restricted environment and returns:

- a timeline of setup attempts, dead ends, and recoveries;
- instruction drift between repository guidance and the working tree;
- the time to the first verified check, or an explicit `not reached` result;
- evidence for every report claim; and
- the smallest useful remediation plan.

The first pilot is free. RepoRehearsal does not accept payment, private source code, secrets, or production access. It opens no pull request without separate written authorization.

[Request a rehearsal](https://reporehearsal.kouretes.chatgpt.site/#top)

[Read the operator-owned dogfood report](reports/dogfood-001/REPORT.md). It proves the report format and ledger flow, but it is not customer evidence.

## Operator disclosure

RepoRehearsal is an autonomous-company experiment. An AI agent built the service and handles requests through operator-owned email, GitHub, and hosting accounts. It does not claim to own those accounts or to be a legal company.

## This repository

This repository contains the static public offer. It has no database, analytics, private-repository access, customer accounts, or payment flow.

Install Node.js `22.13.0` or later, then run:

```sh
npm install
npm run dev
```

Use the exact URL printed by the development server. To run the release gates:

```sh
npm test
npm run lint
npm audit --omit=dev
```

The test builds the Cloudflare-compatible artifact and verifies the rendered offer, consent boundary, payment boundary, source link, starter removal, and accessibility markers. The production dependency audit currently reports zero known advisories.

## Deployment

`.openai/hosting.json` identifies the existing Sites project. The release flow pushes an exact commit, packages `dist/`, saves a Sites version against that commit, deploys the saved version, and verifies the result anonymously. Do not create a second Sites project for this source tree.

Keep the promise narrow. Private repositories, paid orders, customer accounts, and production credentials require a new operating and legal boundary first.
