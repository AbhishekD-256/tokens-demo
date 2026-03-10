# tokens-demo

This repository publishes design token artifacts through GitHub Releases.

## Generated build files

Running `pnpm build` now creates four files in the `build` directory:

- `common.json` shared non-color tokens (sizing, spacing, typography)
- `uk.json` UK brand color overrides
- `us.json` US brand color overrides
- `tokens.json` manifest with relative references to the generated files

Manifest format:

```json
{
	"common": "./common.json",
	"brands": {
		"uk": "./uk.json",
		"us": "./us.json"
	}
}
```

## Consuming release assets

1. Download `tokens.json` from a release.
2. Resolve `common` and the selected brand path (`brands.uk` or `brands.us`) relative to the same release asset URL.
3. Merge `common` first, then apply brand override values.

Example release URLs:

- `https://github.com/AbhishekD-256/tokens-demo/releases/download/vX.Y.Z/tokens.json`
- `https://github.com/AbhishekD-256/tokens-demo/releases/download/vX.Y.Z/common.json`
- `https://github.com/AbhishekD-256/tokens-demo/releases/download/vX.Y.Z/uk.json`
- `https://github.com/AbhishekD-256/tokens-demo/releases/download/vX.Y.Z/us.json`
