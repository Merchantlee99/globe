# Globe MVP Backlog

작성일: 2026-03-10  
목적: 에이전트 3개가 병렬로 작업할 수 있도록 MVP 범위를 실행 가능한 태스크로 분해한다.

## Priority legend

- `P0`: 지금 바로 시작
- `P1`: P0 이후 바로 연결
- `P2`: 데모 안정화 또는 선택 기능

## Agent C first: contracts and shared setup

### P0

- `C-001` repo skeleton 확정
- `C-002` `.env.example` 확정
- `C-003` `docker-compose.yml`로 PostGIS/Redis 개발환경 정의
- `C-004` canonical event schema v1 확정
- `C-005` API contract v1 확정
- `C-006` mock fixture 2종 생성

### P1

- `C-007` summary endpoint contract 정의
- `C-008` shared types 위치 확정
- `C-009` worktree/branch 운영 가이드 확정

### P2

- `C-010` integration validation checklist 작성
- `C-011` demo script 문서 초안
- `C-012` Post-MVP specific city expansion note 작성

## Agent B: backend and data

### P0

- `B-001` FastAPI app bootstrap
- `B-002` Postgres/PostGIS 연결
- `B-003` event/source 테이블 초안 작성
- `B-004` source adapter interface 작성
- `B-005` USGS adapter 구현
- `B-006` FIRMS adapter 구현
- `B-007` canonical event transformation 구현
- `B-008` `GET /api/v1/events` 구현
- `B-009` `GET /api/v1/events/:id` 구현

### P1

- `B-010` weather alerts adapter 구현
- `B-011` source health status API 구현
- `B-012` polling/scheduler 기본 구현
- `B-013` query filters: bbox/time/type/source 적용

### P2

- `B-014` summary request preparation layer
- `B-015` `POST /api/v1/summary` 구현
- `B-016` SSE or polling refresh strategy 구현
- `B-017` optional global flight source 추가

## Agent A: frontend and map UX

### P0

- `A-001` frontend app bootstrap
- `A-002` app shell layout 구현
- `A-003` map container 구현
- `A-004` left layer panel 구현
- `A-005` event list panel 구현
- `A-006` detail panel placeholder 구현
- `A-007` mock data 기반 marker rendering 구현

### P1

- `A-008` 실제 events API 연결
- `A-009` list-marker selection sync
- `A-010` time filter UI 구현
- `A-011` source/eventType filters 구현
- `A-012` loading/empty/error states 구현

### P2

- `A-013` summary action UI 구현
- `A-014` summary result card 구현
- `A-015` source citation rendering
- `A-016` demo preset buttons

## Dependency map

- `C-004`, `C-005` 없이는 `A-008`, `B-008`을 안정적으로 진행하면 안 된다.
- `B-008` 없이는 `A-008`이 mock에서 실제 연결로 넘어갈 수 없다.
- `B-015` 없이는 `A-013`이 완성될 수 없다.
- `C-006`은 `A-007`과 `B-007` 모두에 필요하다.

## Recommended start order

1. `C-001` ~ `C-006`
2. `A-001` ~ `A-007` and `B-001` ~ `B-007` in parallel
3. `B-008`, `B-009`
4. `A-008` ~ `A-012`
5. `B-010` ~ `B-015`
6. `A-013` ~ `A-016`

## Not allowed during MVP

- P0 완료 전에 auth 추가
- P0 완료 전에 billing 추가
- contract 문서 없이 API 응답 shape 변경
- frontend에서 source별 raw payload 직접 파싱
- 특정 도시 CCTV/교통 source를 MVP 범위에 끌고 들어오기
