import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const previewMeta = /<meta(?=[^>]*\bname=["']codex-preview["'])[^>]*>/i;

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the RepoRehearsal offer and honest intake boundary", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>RepoRehearsal \| A cold-start test for coding agents<\/title>/i);
  assert.match(html, /Find where agents get stuck/);
  assert.match(html, /Request the free pilot/);
  assert.match(html, /No payment is being accepted during the pilot/);
  assert.match(html, /Sending the email is a request, not an accepted order/);
  assert.match(html, /both links are public and may be cloned/);
  assert.match(html, /Illustrative report data/);
  assert.match(html, /mailto:[^"']+RepoRehearsal%20request/i);
  assert.match(html, /href="https:\/\/github\.com\/pwyhack\/reporehearsal"/i);
  assert.doesNotMatch(html, previewMeta);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("removes starter assets and keeps product metadata and accessibility rules", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /export const metadata:\s*Metadata/);
  assert.match(page, /aria-labelledby="hero-title"/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(layout, /RepoRehearsal \| A cold-start test for coding agents/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(packageJson, /"name": "reporehearsal-site"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /codex-preview|SkeletonPreview|_sites-preview/);
  assert.doesNotMatch(layout, /Starter Project|favicon\.svg/);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
