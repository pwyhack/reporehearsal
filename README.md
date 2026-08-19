# RepoRehearsal site

This project contains the public RepoRehearsal pilot page. The site explains the offer, shows the evidence format, and opens a structured email request. It has no database, private-repository access, analytics, or payment flow.

## Run the site

Install Node.js `22.13.0` or later. Then run:

```sh
npm install
npm run dev
```

Use the exact local URL that the development server prints. Port 3000 may already be in use.

## Verify the product

```sh
npm test
npm audit --omit=dev
```

The test builds the Cloudflare-compatible artifact and checks the rendered HTML. It verifies the product title, request link, public-clone consent, free-pilot payment boundary, starter removal, and basic accessibility markers.

The full development dependency tree currently has known advisories. The production dependency audit reports zero known advisories. See the root `JOURNEY.md` for the recorded limitation.

## Publish the site

`.openai/hosting.json` contains the opaque Sites project ID. The Sites workflow packages `dist/`, saves a version against the pushed source commit, and deploys that saved version. Do not call site creation again for this project.

## Keep the promise narrow

The pilot accepts one public GitHub repository and one issue from that repository. Do not add private-repository intake, payment, customer accounts, or production credentials without redesigning the operating and legal boundaries first.
