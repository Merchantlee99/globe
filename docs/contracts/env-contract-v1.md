# Globe Env Contract v1

작성일: 2026-03-10  
상태: MVP initial env contract  
목적: frontend, backend, integration 에이전트가 같은 환경 변수 기준으로 병렬 개발할 수 있게 한다.

## 1. 원칙

- `.env.example`이 로컬 개발의 source of truth다.
- 새 env var를 추가하면 이 문서와 `.env.example`를 동시에 갱신한다.
- 비밀값은 절대 커밋하지 않는다.
- MVP 범위는 `global only`이며 특정 도시 전용 key는 추가하지 않는다.

## 2. Core runtime

| key | required | default/example | owner | 설명 |
|---|---|---|---|---|
| `APP_ENV` | yes | `development` | integration | 런타임 환경 |
| `WEB_PORT` | yes | `3000` | frontend | web dev server 포트 |
| `API_PORT` | yes | `8000` | backend | api dev server 포트 |

## 3. Data infrastructure

| key | required | default/example | owner | 설명 |
|---|---|---|---|---|
| `POSTGRES_USER` | yes | `globe` | backend | Postgres 사용자 |
| `POSTGRES_PASSWORD` | yes | `globe` | backend | Postgres 비밀번호 |
| `POSTGRES_DB` | yes | `globe` | backend | DB 이름 |
| `POSTGRES_PORT` | yes | `5432` | backend | 로컬 DB 포트 |
| `DATABASE_URL` | yes | `postgresql://globe:globe@localhost:5432/globe` | backend | API/worker 연결 문자열 |
| `REDIS_PORT` | yes | `6379` | backend | Redis 포트 |
| `REDIS_URL` | yes | `redis://localhost:6379/0` | backend | background job/cache 연결 문자열 |

## 4. Providers

| key | required | default/example | owner | 설명 |
|---|---|---|---|---|
| `MAP_PROVIDER` | yes | `maptiler` | frontend | 베이스맵 제공자 |
| `MAPTILER_API_KEY` | no | empty | frontend | 공개 MVP 배포 시 필요 |
| `AI_PROVIDER` | yes | `openai` | integration | 현재 기본 AI provider |
| `OPENAI_API_KEY` | no | empty | integration | summary endpoint 연결 시 사용 |
| `GEMINI_API_KEY` | no | empty | integration | 대체 provider 검토용 |
| `ANTHROPIC_API_KEY` | no | empty | integration | 대체 provider 검토용 |
| `NASA_FIRMS_MAP_KEY` | no | empty | backend | FIRMS 연동 시 필요 |

## 5. Scope flags

| key | required | default/example | owner | 설명 |
|---|---|---|---|---|
| `P2_DATA_MODE` | yes | `flight` | integration | Post-MVP 실험용 플래그. MVP에서는 기능 비활성화가 기본 |
| `DEMO_REGION` | yes | `global` | integration | MVP는 항상 `global` |

## 6. Change policy

- frontend는 `MAP_*`, `WEB_PORT` 외 env 추가를 제안만 하고 직접 확정하지 않는다.
- backend는 DB/source 연결 env를 추가할 수 있지만 contract 문서 갱신이 선행되어야 한다.
- AI provider 변경은 integration에서만 최종 확정한다.
- `DEMO_REGION`이 `global`이 아닌 값으로 바뀌는 변경은 MVP 브랜치에서 금지한다.
