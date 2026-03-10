# Globe Agent Operating Model

작성일: 2026-03-10  
목적: 3개 에이전트가 같은 제품을 병렬 개발해도 충돌과 재작업을 최소화하기 위한 운영 규칙

## 1. 팀 구조

- Human owner: 방향 결정, 계정/API 키 발급, 최종 우선순위 승인
- Agent A: frontend / map / UX
- Agent B: backend / ingestion / normalization
- Agent C: integration / contracts / AI / merge governance

초기에는 에이전트를 더 늘리지 않는다.  
현재 단계에서 3개 축이 가장 효율적이다.

## 2. 핵심 원칙

- 같은 repo를 쓰되 같은 작업공간을 공유하지 않는다.
- 각 에이전트는 별도 branch와 별도 `git worktree`를 사용한다.
- 현재 MVP 범위는 `global only`이며 특정 도시 데이터는 Post-MVP로 미룬다.
- 파일 충돌보다 의도 충돌이 더 위험하므로, 공통 계약을 먼저 고정한다.
- shared surface는 한 명만 수정한다.
- 큰 머지 1번보다 작은 머지 여러 번이 낫다.

## 3. 권장 worktree 구조

메인 저장소 루트 기준:

- `/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe`
- `/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-web`
- `/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-api`
- `/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-integration`

권장 브랜치:

- `codex/frontend-mvp`
- `codex/backend-mvp`
- `codex/integration-mvp`

예시 명령:

```bash
git worktree add ../03_Globe-web -b codex/frontend-mvp
git worktree add ../03_Globe-api -b codex/backend-mvp
git worktree add ../03_Globe-integration -b codex/integration-mvp
```

## 4. 디렉토리 소유권

### Agent A

- `apps/web`
- `packages/ui`

수정 가능 범위:

- 화면 구조
- 지도 컴포넌트
- 레이어 컨트롤
- 리스트/상세 패널
- 프런트 상태 관리

직접 수정 금지:

- DB schema
- root infra config
- OpenAPI source-of-truth

### Agent B

- `apps/api`
- `workers`

수정 가능 범위:

- 데이터 수집기
- 정규화 로직
- API 구현
- 캐시 및 stream publish

직접 수정 금지:

- 프런트 UI
- shared contract shape 임의 변경

### Agent C

- `packages/contracts`
- `docs/contracts`
- `infra`
- root-level integration config

수정 가능 범위:

- canonical schema
- OpenAPI / JSON schema
- env contract
- AI summary flow
- merge and integration fixes

직접 수정 금지:

- 프런트 전용 UI 작업
- 백엔드 feature 구현 세부사항 전부를 대신 떠안는 것

## 5. Source of truth

초기 소스 오브 트루스는 아래 순서를 따른다.

1. [docs/globe-prd.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/globe-prd.md)
2. [docs/mvp-execution-plan.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/mvp-execution-plan.md)
3. [docs/contracts/api-contract-v1.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe/docs/contracts/api-contract-v1.md)
4. `packages/contracts`

규칙:

- 계약 문서 없이 API 응답 필드를 바꾸지 않는다.
- schema 변경이 있으면 Agent C가 먼저 문서/타입을 갱신한다.
- Agent A와 B는 그 이후 구현을 맞춘다.

## 6. 변경 등급

### Level 1. Local change

- 자기 디렉토리 내부 변경
- 다른 에이전트 영향 없음

바로 진행 가능

### Level 2. Contract change

- API shape
- canonical event schema
- env variable 추가

문서 업데이트 후 진행

### Level 3. Shared infra change

- Docker Compose
- CI
- root scripts
- DB migration naming policy

Agent C 승인 또는 직접 처리 필요

## 7. 일일 운영 루프

### Start of day

- 오늘 작업 범위 확정
- contract change 여부 확인
- blocker 확인

### During work

- 작은 단위로 커밋
- schema 변경 필요 시 즉시 Agent C에 반영 요청
- 임시 mock은 허용하되 shape는 계약과 맞춘다

### Integration checkpoint

- 하루 2회 이상 통합 권장
- 권장 순서: `contracts -> backend -> frontend`

### End of day

- 변경 파일 목록
- contract change 여부
- 테스트 결과
- 다음 에이전트가 알아야 할 리스크

## 8. 상태 보고 포맷

각 에이전트는 아래 형식으로 짧게 남긴다.

```md
Changed:
- apps/api/routes/events.py
- workers/sources/usgs.py

Contract:
- none

Test:
- unit pass
- integration not run

Risk:
- frontend mock data still missing severity color mapping
```

## 9. 머지 전략

- 장수 브랜치를 오래 끌지 않는다.
- 충돌 해결은 코드를 먼저 보지 말고 source-of-truth부터 확인한다.
- 마지막 대병합 금지
- 작은 기능 단위로 자주 머지

권장 순서:

1. `codex/integration-mvp`에 contract 반영
2. `codex/backend-mvp`에서 구현 및 머지
3. `codex/frontend-mvp`에서 소비 및 머지
4. 통합 테스트 후 main 또는 trunk 반영

## 10. 충돌 해결 규칙

### 계약 충돌

- API contract 문서가 우선
- 문서가 없으면 Agent C가 먼저 결정

### DB migration 충돌

- migration 번호는 한 명만 관리
- 동시에 여러 migration을 만들지 않는다

### Root config 충돌

- Agent C만 수정

### 범위 침범

- 다른 에이전트 디렉토리까지 고쳐야 하면 먼저 이유를 기록
- 가능하면 issue로 넘기고 본인 작업은 로컬 범위만 마무리

## 11. 초기 2주 분업

### Agent A

- 지도 레이아웃
- 이벤트 레이어
- 리스트/상세 패널
- 시간 필터 UI
- summary action button

### Agent B

- PostGIS 연결
- USGS adapter
- FIRMS adapter
- canonical event transformation
- `GET /api/v1/events`
- `GET /api/v1/events/:id`

### Agent C

- repo skeleton
- env contract
- API contract
- mock fixtures
- AI summary endpoint contract
- integration validation

## 12. 지금 단계에서 하지 말 것

- agent별로 데이터 소스를 나눠 소유하게 하지 않는다.
- frontend가 API shape를 임의로 정하지 않는다.
- backend가 UI 표시 규칙을 임의로 정하지 않는다.
- 자유형 AI chat을 먼저 만들지 않는다.
- SaaS auth/billing을 MVP 전에 넣지 않는다.

## 13. 성공 조건

이 운영 모델의 성공 조건은 아래다.

- 각 에이전트가 동시에 일해도 같은 파일을 자주 건드리지 않는다.
- contract 변경이 즉시 드러난다.
- 하루 안에 통합 가능하다.
- 데모에 필요한 기능이 단계적으로 완성된다.
