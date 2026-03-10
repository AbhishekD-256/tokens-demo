---
"tokens-demo": major
---

split token output into brand-aware artifacts and manifest.

breaking changes:
- build/tokens.json now contains references to generated files instead of merged tokens.
- release assets now include build/common.json, build/uk.json, and build/us.json.
