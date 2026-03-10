# Globe Integration Validation Checklist

작성일: 2026-03-10  
목적: frontend/backend 결과물을 integration 브랜치에 합치기 전에 최소 검증 기준을 고정한다.

## 1. Contract gate

- `docs/contracts/api-contract-v1.md`와 실제 응답 shape가 충돌하지 않는다.
- env 추가/변경이 있다면 [env-contract-v1.md](/Users/isanginn/Documents/01_Personal/04_Vibe Coding/03_Globe-integration/docs/contracts/env-contract-v1.md)와 `.env.example`가 같이 갱신돼 있다.
- shared contract 변경이 있다면 `packages/contracts`와 문서가 같이 바뀌어 있다.

## 2. Frontend merge gate

- 변경 파일이 원칙적으로 `apps/web`, `packages/ui` 범위 안에 있다.
- mock fixture 또는 실제 API 기준으로 지도/리스트/상세 패널이 렌더링된다.
- API shape를 추정해서 하드코딩하지 않았다.
- 완료 보고에 `Changed / Contract / Test / Risk`가 남아 있다.

## 3. Backend merge gate

- 변경 파일이 원칙적으로 `apps/api`, `workers` 범위 안에 있다.
- `GET /api/v1/health`, `GET /api/v1/events` 기본 shape가 contract와 맞는다.
- raw payload 보존 여부가 canonical transform에서 확인된다.
- 완료 보고에 `Changed / Contract / Test / Risk`가 남아 있다.

## 4. Integration merge gate

- `npm run verify:contracts`가 통과한다.
- fixture가 현재 contract와 일치한다.
- root config 변경은 이유가 문서에 남아 있다.
- 브랜치 머지 순서는 `integration -> backend -> frontend` 또는 `integration -> frontend -> backend`가 아니라, 항상 contract 확정 후 consumer/provider를 개별 검토한다.

## 5. Manual review questions

- 이번 변경이 MVP 범위 `global only`를 깨지는 않는가.
- 특정 도시 데이터 전제를 암묵적으로 넣지 않았는가.
- provider key 없을 때도 로컬 개발이 가능한가.
- field 추가는 허용되지만, field 제거나 타입 변경은 없는가.

## 6. Recommended commands

```bash
git status --short --branch
node scripts/verify-contract-fixtures.mjs
```
