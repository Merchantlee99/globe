# Globe

Globe is a web-based geo intelligence dashboard that starts as an MVP operating console and expands into an ontology-backed SaaS platform.

## Current focus

- Execute the MVP defined in [docs/globe-prd.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/globe-prd.md)
- Keep the MVP scope `global only`; defer city-specific data layers to later phases
- Enable parallel development across 3 agents without merge chaos
- Ship a map-first prototype before ontology and SaaS expansion

## Repository layout

- `apps/web`: frontend application
- `apps/api`: backend API service
- `packages/contracts`: shared schemas and API contracts
- `packages/ui`: shared UI primitives if needed later
- `workers`: ingestion and background jobs
- `infra`: local infrastructure, compose files, deployment notes
- `scripts`: helper scripts for local development
- `docs`: PRD, planning, contracts, and operating rules

## Start here

- [docs/globe-prd.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/globe-prd.md)
- [docs/agent-operating-model.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/agent-operating-model.md)
- [docs/mvp-execution-plan.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/mvp-execution-plan.md)
- [docs/mvp-backlog.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/mvp-backlog.md)
- [docs/agent-kickoff-prompts.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/agent-kickoff-prompts.md)
- [docs/parallel-dev-runbook.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/parallel-dev-runbook.md)
- [docs/contracts/api-contract-v1.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/contracts/api-contract-v1.md)
