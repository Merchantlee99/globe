# Globe Thread Launch Checklist

작성일: 2026-03-10  
목적: 새 frontend/backend 스레드를 띄울 때 cwd, 첫 메시지, 첫 작업 범위를 바로 적용하기 위한 체크리스트

## 1. Thread mapping

- 현재 스레드: [03_Globe-integration](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-integration)
- frontend 스레드: [03_Globe-web](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-web)
- backend 스레드: [03_Globe-api](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-api)

## 2. Frontend thread first message

```md
cwd는 `/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-web`로 잡아줘.

당신은 Globe 프로젝트의 frontend/map 담당이다. MVP 범위는 `global only`다. 특정 도시 데이터는 제외한다.

먼저 아래 문서를 읽고 바로 작업 시작해줘.
- `docs/globe-prd.md`
- `docs/mvp-execution-plan.md`
- `docs/mvp-backlog.md`
- `docs/contracts/api-contract-v1.md`
- `docs/agent-operating-model.md`
- `docs/agent-kickoff-prompts.md`

바로 `A-001`부터 `A-007`까지 진행해줘.

우선순위:
1. frontend bootstrap
2. app shell layout
3. map container placeholder
4. left layer panel
5. event list panel
6. detail panel placeholder
7. mock data marker rendering

수정 범위는 `apps/web`, 필요 시 `packages/ui`만 우선 다뤄줘. contract shape는 임의 변경하지 말고, shared/root config는 건드리지 말아줘.
```

## 3. Backend thread first message

```md
cwd는 `/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-api`로 잡아줘.

당신은 Globe 프로젝트의 backend/data 담당이다. MVP 범위는 `global only`다. 특정 도시 CCTV/교통 데이터는 제외한다.

먼저 아래 문서를 읽고 바로 작업 시작해줘.
- `docs/globe-prd.md`
- `docs/mvp-execution-plan.md`
- `docs/mvp-backlog.md`
- `docs/contracts/api-contract-v1.md`
- `docs/agent-operating-model.md`
- `docs/agent-kickoff-prompts.md`

바로 `B-001`부터 `B-007`까지 진행해줘.

우선순위:
1. FastAPI bootstrap
2. Postgres/PostGIS connection setup
3. source adapter interface
4. USGS adapter
5. FIRMS adapter
6. canonical transform
7. events API foundation

수정 범위는 `apps/api`, `workers`만 우선 다뤄줘. shared contract shape와 root infra는 임의 변경하지 말아줘.
```

## 4. Integration thread first tasks

현재 스레드는 아래를 먼저 처리한다.

- root package and workspace files
- shared contracts package
- mock fixtures
- launch/runbook maintenance
- branch sync and merge governance

## 5. Verification

각 스레드는 시작 직후 아래를 확인한다.

```bash
git branch --show-current
git status --short --branch
```

기대 브랜치:

- frontend: `codex/frontend-mvp`
- backend: `codex/backend-mvp`
- integration: `codex/integration-mvp`
