const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourceRoot = path.join(root, "html-embeds");
const outputRoot = path.join(root, "wix-ready", "html-embeds");
const envPath = path.join(root, ".env.local");
const marker = "REDACTED_GOOGLE_MAPS_BROWSER_KEY";

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("Missing .env.local. Create it with GOOGLE_MAPS_BROWSER_KEY=your_key before preparing Wix files.");
  }

  const values = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    values[key] = value;
  }
  return values;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("_public-scrape-")) return [];
      return walk(fullPath);
    }
    return entry.isFile() && entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

function copyPreparedFile(filePath, googleMapsKey) {
  const relativePath = path.relative(sourceRoot, filePath);
  const outputPath = path.join(outputRoot, relativePath);
  const source = fs.readFileSync(filePath, "utf8");
  const prepared = source.replaceAll(marker, googleMapsKey);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, prepared);

  return {
    relativePath,
    replaced: source.includes(marker),
  };
}

function main() {
  const env = readEnvFile(envPath);
  const googleMapsKey = env.GOOGLE_MAPS_BROWSER_KEY;

  if (!googleMapsKey || googleMapsKey === marker) {
    throw new Error("GOOGLE_MAPS_BROWSER_KEY is missing or still redacted in .env.local.");
  }

  fs.rmSync(outputRoot, { recursive: true, force: true });

  const files = walk(sourceRoot);
  const prepared = files.map((file) => copyPreparedFile(file, googleMapsKey));
  const withKey = prepared.filter((file) => file.replaced).length;

  console.log(`Prepared ${prepared.length} HTML file(s) in wix-ready/html-embeds.`);
  console.log(`Restored Google Maps key in ${withKey} file(s).`);
}

main();

