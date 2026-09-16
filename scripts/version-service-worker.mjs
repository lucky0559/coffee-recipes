import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const serviceWorkerPath = join(distDirectory, "sw.js");
const buildIdToken = "__BUILD_ID__";

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const filePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(filePath)));
    } else {
      files.push(filePath);
    }
  }

  return files;
}

const serviceWorker = await readFile(serviceWorkerPath, "utf8");
if (!serviceWorker.includes(buildIdToken)) {
  throw new Error(`Expected ${buildIdToken} in ${serviceWorkerPath}`);
}

const hash = createHash("sha256");
const files = (await collectFiles(distDirectory)).sort();

for (const filePath of files) {
  const relativePath = relative(distDirectory, filePath).split(sep).join("/");
  hash.update(relativePath);
  hash.update("\0");
  hash.update(await readFile(filePath));
  hash.update("\0");
}

const buildId = hash.digest("hex").slice(0, 12);
await writeFile(serviceWorkerPath, serviceWorker.replaceAll(buildIdToken, buildId));
console.log(`Service worker cache version: ${buildId}`);
