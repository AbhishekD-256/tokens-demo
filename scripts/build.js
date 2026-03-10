const fs = require("fs");
const path = require("path");

const tokensDir = path.join(__dirname, "../tokens");
const brandsDir = path.join(tokensDir, 'brands');
const outputDir = path.join(__dirname, '../build');
const commonSourceFiles = ['sizing.json', 'spacing.json', 'typography.json'];
const requiredBrands = ['uk', 'us'];

function ensureExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing expected path: ${filePath}`);
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function mergeJsonFiles(filePaths) {
  return filePaths.reduce((merged, filePath) => {
    return {
      ...merged,
      ...readJson(filePath),
    };
  }, {});
}

ensureExists(tokensDir);
ensureExists(brandsDir);

const commonFilePaths = commonSourceFiles.map((file) =>
  path.join(tokensDir, file),
);
commonFilePaths.forEach(ensureExists);
const commonTokens = mergeJsonFiles(commonFilePaths);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDir, 'common.json'),
  JSON.stringify(commonTokens, null, 2),
);

const brands = {};

requiredBrands.forEach((brand) => {
  const brandDir = path.join(brandsDir, brand);
  ensureExists(brandDir);

  const brandFiles = fs
    .readdirSync(brandDir)
    .filter((file) => file.endsWith('.json'))
    .sort();

  if (brandFiles.length === 0) {
    throw new Error(`No JSON token files found for brand: ${brand}`);
  }

  const brandFilePaths = brandFiles.map((file) => path.join(brandDir, file));
  const brandTokens = mergeJsonFiles(brandFilePaths);
  const outputName = `${brand}.json`;

  fs.writeFileSync(
    path.join(outputDir, outputName),
    JSON.stringify(brandTokens, null, 2),
  );
  brands[brand] = `./${outputName}`;
});

const manifest = {
  common: './common.json',
  brands,
};

fs.writeFileSync(
  path.join(outputDir, 'tokens.json'),
  JSON.stringify(manifest, null, 2),
);

console.log(
  'Token artifacts generated: common.json, uk.json, us.json, tokens.json',
);