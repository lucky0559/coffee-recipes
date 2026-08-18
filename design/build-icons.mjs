import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = resolve(__dirname, "icon-source.svg");
const publicDir = resolve(__dirname, "..", "public");
const svg = readFileSync(svgPath);

const sizes = [
  { file: "favicon-16.png", size: 16 },
  { file: "favicon-32.png", size: 32 },
  { file: "favicon-48.png", size: 48 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
];

for (const { file, size } of sizes) {
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(resolve(publicDir, file));
  console.log("wrote", file);
}

const icoBuffer = await pngToIco([
  resolve(publicDir, "favicon-16.png"),
  resolve(publicDir, "favicon-32.png"),
  resolve(publicDir, "favicon-48.png"),
]);
writeFileSync(resolve(publicDir, "favicon.ico"), icoBuffer);
console.log("wrote favicon.ico");
