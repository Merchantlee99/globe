# packages/contracts

Shared contract ownership: Agent C

Source of truth candidates:

- canonical event schema
- OpenAPI fragments
- generated frontend/backend shared types
- typed mock fixtures

Rule:

- No API shape changes without updating this package and `docs/contracts`.
- `packages/contracts/src/fixtures.ts` is the importable fixture source for frontend/backend local development.
- `packages/contracts/fixtures/*.json` remains the raw snapshot used by verification scripts.
