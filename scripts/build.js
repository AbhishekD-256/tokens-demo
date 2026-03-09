const fs = require("fs");
const path = require("path");

const tokensDir = path.join(__dirname, "../tokens");
const outputFile = path.join(__dirname, "../build/tokens.json");

const files = fs.readdirSync(tokensDir);

let merged = {};

files.forEach((file) => {
  const filePath = path.join(tokensDir, file);
  const json = JSON.parse(fs.readFileSync(filePath, "utf8"));

  merged = {
    ...merged,
    ...json
  };
});

fs.writeFileSync(outputFile, JSON.stringify(merged, null, 2));

console.log("✅ Tokens built successfully");