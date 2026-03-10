# Globe Parallel Development Runbook

작성일: 2026-03-10  
목적: 현재 메인 에이전트 1개에 추가 에이전트 2개를 붙여 병렬 개발할 때, Git 구조, worktree, 동기화, 머지, 충돌 해결을 일관되게 운영하기 위한 실행 문서

## 1. 최종 운영 구조

권장 구조는 아래다.

- 현재 메인 쓰레드: `integration / contracts / merge governance`
- 추가 쓰레드 1: `frontend / map / UX`
- 추가 쓰레드 2: `backend / ingestion / normalization`

즉, 총 3개 축으로 간다.

- Agent C: 현재 메인 쓰레드
- Agent A: frontend worktree
- Agent B: backend worktree

현재 MVP 범위는 `global only`다.  
특정 도시 데이터는 Post-MVP로 미룬다.

## 2. 중요한 전제

현재 `Globe` 폴더는 상위 `/Users/isanginn` Git 저장소 안의 `untracked directory`다.  
이 상태에서 바로 worktree를 쓰면 상위 저장소와 얽히기 때문에, `Globe`를 먼저 독립 Git repo로 만드는 것이 맞다.

추천 방식:

- `Globe`는 자체 Git repo로 운영
- 상위 `/Users/isanginn` repo와는 분리
- 이후 이 repo 안에서만 worktree 사용

## 3. 1회성 초기 세팅 명령

아래 명령은 `Globe`를 독립 repo로 만들 때 1번만 실행한다.

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe"
git init
git add .
git commit -m "Initialize Globe planning and parallel dev scaffold"
git branch -M main
```

원격 저장소를 붙일 경우:

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe"
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

## 4. 브랜치 전략

초기 브랜치는 아래처럼 고정한다.

- `main`: 통합 기준 브랜치
- `codex/frontend-mvp`: Agent A 전용
- `codex/backend-mvp`: Agent B 전용
- `codex/integration-mvp`: Agent C 전용

규칙:

- `main`에 직접 기능 개발하지 않는다.
- 기능 구현은 각 에이전트 브랜치에서 한다.
- 공통 계약은 `codex/integration-mvp`에서 먼저 반영한다.

## 5. worktree 디렉토리 구조

권장 구조:

- `/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe`
- `/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-web`
- `/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-api`
- `/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-integration`

명령:

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe"
bash scripts/setup-worktrees.sh
```

수동으로 하면:

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe"
git worktree add ../03_Globe-web -b codex/frontend-mvp main
git worktree add ../03_Globe-api -b codex/backend-mvp main
git worktree add ../03_Globe-integration -b codex/integration-mvp main
```

## 6. 쓰레드별 실제 작업 위치

### 현재 메인 쓰레드

추천 위치:

- `../03_Globe-integration`

담당:

- contracts
- env
- mock fixtures
- AI summary flow
- merge governance
- integration fixes

### 추가 쓰레드 1

위치:

- `../03_Globe-web`

담당:

- `apps/web`
- `packages/ui`

### 추가 쓰레드 2

위치:

- `../03_Globe-api`

담당:

- `apps/api`
- `workers`

## 7. 각 쓰레드 시작 명령

### Agent C

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-integration"
git branch --show-current
```

### Agent A

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-web"
git branch --show-current
```

### Agent B

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-api"
git branch --show-current
```

브랜치 확인 결과는 아래여야 한다.

- Agent C: `codex/integration-mvp`
- Agent A: `codex/frontend-mvp`
- Agent B: `codex/backend-mvp`

## 8. 각 쓰레드가 먼저 읽어야 하는 문서

공통:

- [docs/globe-prd.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/globe-prd.md)
- [docs/mvp-execution-plan.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/mvp-execution-plan.md)
- [docs/contracts/api-contract-v1.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/contracts/api-contract-v1.md)
- [docs/agent-operating-model.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/agent-operating-model.md)
- [docs/agent-kickoff-prompts.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/agent-kickoff-prompts.md)

## 9. 데일리 운영 명령

현재 상태 확인:

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe"
bash scripts/parallel-status.sh
```

각 쓰레드에서 작업 전:

```bash
git status --short --branch
```

작업 후 로컬 커밋:

```bash
git add .
git commit -m "<short message>"
```

원격에 올릴 경우:

```bash
git push -u origin <current-branch>
```

## 10. 추천 통합 순서

통합 순서는 고정한다.

1. `codex/integration-mvp`
2. `codex/backend-mvp`
3. `codex/frontend-mvp`
4. `main`

이유:

- contract가 먼저 고정되어야 한다.
- backend가 contract를 구현한다.
- frontend가 backend/contract를 소비한다.

## 11. branch 동기화 명령

`main`의 최신 상태를 각 에이전트 브랜치에 반영할 때:

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe"
bash scripts/sync-agent-branch.sh integration
bash scripts/sync-agent-branch.sh backend
bash scripts/sync-agent-branch.sh frontend
```

수동으로 하면:

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe"
git switch main
git pull --ff-only origin main

cd "../03_Globe-integration"
git merge main

cd "../03_Globe-api"
git merge main

cd "../03_Globe-web"
git merge main
```

remote가 아직 없다면 `git pull --ff-only origin main`은 생략한다.

## 12. 머지 명령

### Step 1. integration 브랜치 검토 후 main에 머지

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe"
git switch main
git merge --no-ff codex/integration-mvp -m "Merge codex/integration-mvp"
```

### Step 2. backend 브랜치에 main 반영 후 main에 머지

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe"
bash scripts/sync-agent-branch.sh backend
git switch main
git merge --no-ff codex/backend-mvp -m "Merge codex/backend-mvp"
```

### Step 3. frontend 브랜치에 main 반영 후 main에 머지

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe"
bash scripts/sync-agent-branch.sh frontend
git switch main
git merge --no-ff codex/frontend-mvp -m "Merge codex/frontend-mvp"
```

### Step 4. 원격 반영

```bash
cd "/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe"
git push origin main
```

## 13. 머지 충돌이 났을 때 규칙

충돌은 코드 편집보다 `source of truth 확인`이 먼저다.

우선순위:

1. PRD
2. MVP execution plan
3. API contract
4. shared contracts package
5. implementation

충돌 유형별 해결 방식:

### 계약 충돌

- `docs/contracts/api-contract-v1.md`를 먼저 본다.
- 문서와 구현이 다르면 문서 기준으로 맞춘다.
- 문서 자체가 애매하면 Agent C가 결정한다.

### UI vs API 충돌

- 프런트가 임의로 shape를 정한 경우 프런트를 고친다.
- backend가 문서 없는 필드 변경을 한 경우 backend를 고친다.

### 공용 설정 충돌

- `docker-compose.yml`, `.env.example`, `infra`, `packages/contracts`는 Agent C가 최종 결정한다.

### DB migration 충돌

- migration naming/ordering은 Agent C가 관리한다.
- 동시에 여러 migration을 독립적으로 만들지 않는다.

## 14. 절대 하지 말 것

- 상위 `/Users/isanginn` repo 기준으로 worktree를 만들지 않는다.
- `main`에서 바로 기능 개발하지 않는다.
- contract 문서 없이 API 응답 shape를 바꾸지 않는다.
- frontend가 raw source payload를 직접 해석하지 않는다.
- 특정 도시 데이터 소스를 MVP에 끌고 오지 않는다.
- 큰 기능을 오래 묵혔다가 한 번에 머지하지 않는다.

## 15. 가장 실용적인 운영 습관

- 머지는 하루 1번이 아니라 작은 단위로 한다.
- 각 에이전트는 작업 종료 시 상태 보고를 남긴다.
- 공통 파일 수정 필요 시 먼저 Agent C에 넘긴다.
- 코드보다 문서와 계약을 먼저 업데이트한다.

## 16. 지금 가장 좋은 실제 진행 방식

내 판단으로는 아래 순서가 가장 좋다.

1. `Globe`를 독립 repo로 만든다.
2. worktree 3개를 만든다.
3. 현재 메인 쓰레드는 `integration`을 맡는다.
4. 새 쓰레드 2개는 각각 `frontend`, `backend`를 맡는다.
5. 먼저 contract와 mock fixture를 고정한다.
6. 그 다음 실제 코드 작업을 병렬로 시작한다.

이 방식이면:

- 머지 충돌이 가장 적고
- 각 쓰레드 책임이 분명하고
- 이후 팀이 붙을 때도 구조를 그대로 확장할 수 있다.
