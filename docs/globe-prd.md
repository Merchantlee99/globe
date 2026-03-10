# Globe PRD v1.0

작성일: 2026-03-10  
문서 상태: Draft for execution  
제품 형태: Web-based geo intelligence dashboard and future SaaS platform

## 1. 제품 한 줄 정의

Globe는 공개된 시공간 데이터를 하나의 지도 인터페이스로 통합하고, 이후 온톨로지와 AI 질의 계층을 통해 사용자가 원하는 상황 정보를 빠르게 탐색하고 해석할 수 있게 하는 `ontology-backed geo intelligence platform`이다.

## 2. 서비스의 본질

이 서비스의 본질은 "멋있는 지도 UI"가 아니다. 본질은 다음 4가지다.

- 서로 다른 공개 데이터를 공통 구조로 정규화한다.
- 정규화된 데이터를 지도, 타임라인, 상세 패널에서 동시에 해석할 수 있게 한다.
- 사용자가 특정 지역, 시간 범위, 이벤트 유형을 빠르게 탐색할 수 있게 한다.
- 장기적으로는 AI가 자연어를 구조화된 질의로 바꾸고, 근거 기반 응답을 생성하게 한다.

즉, 이 서비스는 단순한 지도 앱도 아니고 단순한 AI 챗봇도 아니다.  
핵심은 `시공간 데이터 운영체계 + 분석 인터페이스 + AI 질의 계층`이다.

## 3. 문제 정의

현재 공개 데이터는 많지만 사용자는 다음 문제를 겪는다.

- 데이터 소스가 분산되어 있다.
- 데이터 형식이 제각각이다.
- 지도, 시간, 출처, 신뢰도 기준으로 한 번에 보기 어렵다.
- 데이터 해석에 시간이 많이 든다.
- 의미 있는 질문을 하려면 사용자가 먼저 데이터 구조를 알아야 한다.

Globe는 이 문제를 해결하기 위해 공개 데이터를 하나의 운영형 콘솔로 통합하고, 이후 AI를 자연어 인터페이스로 추가한다.

## 4. 목표 사용자

### Primary

- OSINT 기반 분석 실험을 하는 개인 개발자
- 위기 모니터링, 재난 대응, 이벤트 탐지 프로토타입을 검토하는 팀
- 지도 기반 분석 도구를 빠르게 검증하려는 스타트업 창업자

### Secondary

- 물류/공급망 모니터링 팀
- 보험/재난 리스크 분석 팀
- 도시 안전/교통 상황 분석 팀

## 5. 비즈니스 가설

- 사용자는 "데이터 자체"보다 "해석 가능한 상황판"에 비용을 지불한다.
- 장기적으로는 데이터 커넥터 수, 워크스페이스 수, 질의 수, 저장 기간, AI 분석 기능이 과금 포인트가 된다.
- 차별화 포인트는 지도 UI가 아니라 `정규화 계층`, `온톨로지`, `근거 추적 가능한 AI 응답`이다.

## 6. 제품 원칙

- MVP에서는 범위를 좁힌다.
- MVP는 `global only` 범위로 고정하고, 특정 도시 고해상도 데이터는 Post-MVP로 미룬다.
- 실시간처럼 보이는 것보다 실제로 검증 가능한 데이터 흐름을 우선한다.
- LLM은 데이터 파이프라인의 중심이 아니라 인터페이스 계층으로 사용한다.
- 데이터 원본, 출처, 시간, 신뢰도는 항상 노출 가능해야 한다.
- 코드 스택은 빠른 반복 개발과 SaaS 확장성을 우선한다.
- 데이터 라이선스는 기능 설계 초기에 추적한다.

## 7. 범위 밖

초기에는 다음을 하지 않는다.

- 글로벌 CCTV 네트워크 수집
- 완전한 실시간 위성 영상 서비스
- 범용 "무엇이든 물어보세요" AI 챗봇
- 엔터프라이즈급 권한관리
- 결제/과금 시스템
- 복잡한 객체 추적 및 다중 카메라 re-identification

## 8. 최종 제품 비전

최종적으로 Globe는 아래의 흐름을 제공해야 한다.

1. 데이터 수집
2. 정규화
3. 온톨로지 매핑
4. 지도/타임라인/이벤트 피드 제공
5. 자연어 질의
6. 근거 기반 응답과 시각적 결과 동시 출력

사용자는 이렇게 질문할 수 있어야 한다.

- 지난 24시간 동안 동남아 지역에서 의미 있는 이상 이벤트가 있었나?
- 현재 내 워치리스트 지역 근처의 항공, 재난, 화재 신호를 묶어서 보여줘.
- 이 이벤트와 가장 인접한 센서/관측/유사 사례는 무엇인가?

그리고 시스템은 다음 형태로 답해야 한다.

- 자연어 요약
- 지도 결과
- 시간 범위
- 관련 이벤트 목록
- 사용한 근거 소스
- 신뢰도 또는 불확실성

## 9. Phase별 계획

## Phase 0. Foundation

### 목표

- 개발 속도와 병렬 작업을 위한 뼈대 마련

### 산출물

- Monorepo 구조
- 기본 프론트엔드와 API 서버 부트스트랩
- Postgres/PostGIS 개발 환경
- 공통 환경 변수 구조
- API 계약 초안
- 샘플 데이터 주입 스크립트

### 완료 조건

- `apps/web`와 `apps/api`가 로컬에서 함께 실행된다.
- `docker compose up`으로 DB 포함 개발환경이 올라온다.
- 공통 타입 또는 OpenAPI 초안이 존재한다.

## Phase 1. MVP

### 목표

- `global only` 공개 데이터 3~4개를 지도 중심 운영 콘솔로 통합한다.

### 꼭 들어가야 할 기능

- 메인 지도 화면
- 레이어 토글
- 이벤트 리스트 패널
- 상세 패널
- 시간 필터
- 실시간 또는 준실시간 갱신
- 원본 출처 링크
- 기본 AI 요약

### 데이터 소스 추천

- USGS Earthquakes
- NASA FIRMS fire hotspots
- Weather alerts
- Optional global flight data

### 완료 조건

- 사용자가 지도에서 이벤트를 클릭하면 상세 패널과 원본 출처를 확인할 수 있다.
- 사용자가 시간 범위를 바꾸면 지도와 리스트가 함께 갱신된다.
- AI 요약이 현재 뷰포트 또는 선택 이벤트 기준으로 동작한다.
- 특정 도시 전용 데이터 없이도 데모 시나리오가 완결된다.

## Phase 2. Analyst Workflow

### 목표

- 분석가가 실제로 반복 사용하는 워크플로를 추가한다.

### 기능

- 저장된 필터셋
- 워치리스트 지역
- 간단한 알림 룰
- 이벤트 비교
- 히스토리 및 스냅샷
- 사건별 코멘트/태깅
- `global + 특정 도시` 확장
- 특정 도시 CCTV/교통/incident feed 통합

### 완료 조건

- 사용자가 특정 지역과 조건을 저장하고 재호출할 수 있다.
- 이벤트 스냅샷을 저장해 다시 불러올 수 있다.
- 글로벌 데이터와 특정 도시 데이터가 같은 UI와 공통 스키마 위에서 함께 동작한다.

## Phase 3. Ontology + AI Query Layer

### 목표

- AI 채팅을 붙이기 전에 공통 의미 계층을 만든다.

### 핵심 모델

- Source
- Observation
- Entity
- Event
- Location
- Relationship

### 기능

- Canonical schema 정교화
- 엔티티 링크
- 이벤트 상관관계
- 자연어를 구조화된 질의로 변환
- 근거 기반 답변 생성

### 완료 조건

- AI 응답이 raw 데이터가 아니라 ontology-backed query 결과를 기반으로 생성된다.
- 답변마다 source lineage가 추적된다.

## Phase 4. SaaS Productization

### 목표

- 팀 단위 사용과 과금 가능한 구조로 확장한다.

### 기능

- 멀티 워크스페이스
- 사용자/역할 관리
- 사용량 측정
- AI query quota
- 데이터 커넥터 관리
- 결제 및 플랜 구조
- 감사를 위한 로그

### 완료 조건

- 테넌트 간 데이터 분리가 보장된다.
- 플랜별 제한을 적용할 수 있다.

## 10. MVP 요구사항

## Functional Requirements

### FR-1 지도 중심 UI

- 사용자는 지도를 이동하고 확대/축소할 수 있어야 한다.
- 사용자는 이벤트 유형별 레이어를 켜고 끌 수 있어야 한다.

### FR-2 이벤트 리스트

- 현재 뷰포트 및 시간 범위에 해당하는 이벤트 목록이 표시되어야 한다.
- 지도와 리스트는 동일한 데이터를 가리켜야 한다.

### FR-3 이벤트 상세

- 이벤트 상세에는 다음 정보가 표시되어야 한다.
- 제목
- 이벤트 유형
- 발생 시간
- 위치
- 원본 출처
- 좌표
- 메타데이터

### FR-4 시간 필터

- 최근 1시간, 24시간, 7일, 사용자 지정 범위를 지원해야 한다.

### FR-5 데이터 정규화

- 모든 데이터는 최소한 아래 필드로 정규화되어야 한다.
- `id`
- `source`
- `event_type`
- `title`
- `timestamp`
- `geometry`
- `severity`
- `raw_payload`

### FR-6 실시간 갱신

- 이벤트는 polling 또는 stream 방식으로 갱신되어야 한다.
- 프런트는 자동 갱신 또는 수동 새로고침을 지원해야 한다.

### FR-7 AI 요약

- 사용자는 현재 화면의 이벤트를 요약 요청할 수 있어야 한다.
- 응답에는 근거 데이터가 포함되어야 한다.

## Non-Functional Requirements

- 지도 상호작용은 일반적인 개발용 노트북에서 부드럽게 동작해야 한다.
- 데이터 소스 장애 시 전체 앱이 죽지 않아야 한다.
- 모든 외부 데이터는 원본 payload와 함께 저장되어야 한다.
- 라이선스 및 출처 추적이 가능해야 한다.
- 프론트와 백엔드는 계약 기반으로 분리 가능해야 한다.

## 11. 권장 기술 스택

## Core

- Frontend: React, TypeScript, Vite
- Map: MapLibre GL JS
- Overlay visualization: deck.gl
- Backend: Python, FastAPI
- Database: PostgreSQL + PostGIS
- Realtime: WebSocket or Server-Sent Events
- Queue/cache: Redis

## AI / Analytics

- LLM orchestration: lightweight service layer in FastAPI
- Basic summary model: OpenAI or Gemini
- Local inference option: ONNX Runtime

## Dev / Infra

- Monorepo: pnpm workspace
- Containers: Docker Compose
- API contract: OpenAPI + generated types
- Background jobs: Celery, RQ, or lightweight cron workers
- Auth later: Clerk, Auth0, or self-hosted alternative

## Why this stack

- 웹 기반 데모와 SaaS 확장에 적합하다.
- 지도 및 대량 오버레이 처리에 강하다.
- 병렬 개발이 쉽다.
- QML보다 라이선스와 배포 측면에서 유리하다.

## 12. 시스템 아키텍처 개요

### Ingestion Layer

- 외부 API polling
- raw payload 저장
- source별 rate limit 및 retry 관리

### Normalization Layer

- 공통 이벤트 모델로 변환
- geometry 정규화
- source metadata 부여

### Serving Layer

- 이벤트 API
- 지도용 vector/grid feed
- WebSocket/SSE live updates

### AI Layer

- 사용자 질문 또는 요약 요청 수신
- 구조화된 query plan 생성
- DB에서 evidence retrieval
- grounded response 생성

## 13. 데이터 모델 초안

### Minimal canonical event schema

```ts
type CanonicalEvent = {
  id: string;
  source: string;
  eventType: string;
  title: string;
  description?: string;
  severity?: number;
  status?: string;
  timestamp: string;
  updatedAt?: string;
  geometry: {
    type: "Point" | "Polygon" | "LineString";
    coordinates: unknown;
  };
  placeName?: string;
  confidence?: number;
  rawPayload: unknown;
  sourceUrl?: string;
};
```

## 14. AI 전략

초기에는 AI를 다음 범위로 제한한다.

- 현재 뷰포트 이벤트 요약
- 선택 이벤트 설명
- 필터 추천

초기에는 하지 않는다.

- 자유형 글로벌 채팅
- 자동 의사결정
- raw data에 대한 직접 hallucination 기반 답변

장기적으로는 다음 구조로 확장한다.

- NL query
- query planner
- ontology-backed retrieval
- grounded answer + evidence

## 15. 데이터 라이선스 원칙

- 코드 라이선스와 데이터 라이선스는 별도로 관리한다.
- 각 데이터 소스는 다음 메타데이터를 남긴다.
- source name
- license type
- attribution text
- redistribution restriction
- commercial use status

이 항목은 SaaS 전환 전에 반드시 정리해야 한다.

## 16. KPI

## MVP Success Metrics

- 데이터 소스 3개 이상 안정 통합
- 지도와 이벤트 리스트 일관성 유지
- 사용자 클릭에서 상세 확인까지 2초 내 응답
- AI 요약 응답이 근거 source를 포함

## Post-MVP Metrics

- 저장된 워치리스트 수
- 일간 active workspace
- AI 질의당 만족도
- 이벤트 탐색에서 결과 발견까지 걸리는 시간

## 17. 개발 에이전트 분업안

### Agent A: Frontend / Map / UX

- `apps/web`
- 지도 UI
- 레이어 토글
- 타임라인
- 상세 패널

### Agent B: Backend / Ingestion / Data

- `apps/api`
- `workers`
- source adapters
- normalization
- database integration

### Agent C: Integration / AI / Contracts

- OpenAPI
- shared types
- AI summary flow
- infra glue
- merge governance

## 18. 초기 개발 순서

1. Monorepo와 Docker 기반 개발환경 생성
2. Postgres/PostGIS 연결
3. Canonical event schema 확정
4. USGS와 FIRMS 수집기 작성
5. FastAPI 이벤트 조회 API 작성
6. 지도 UI에서 이벤트 표시
7. 시간 필터와 상세 패널 추가
8. AI 요약 연결
9. 세 번째/네 번째 데이터 소스 추가

## 19. 당신이 준비해야 하는 것

개발을 시작하기 전에 사용자 측에서 준비해야 하는 항목이다.

### 필수

- Node.js 22
- pnpm
- Python 3.11 이상
- Docker Desktop

### 외부 계정 / 키

- Map tile provider key
- AI API key 1개
- NASA FIRMS key 사용 여부 결정

### 정책 결정

- MVP 범위는 `global only`로 고정
- AI 범위: 요약만 vs 질의응답 일부 포함
- 초기 데이터 소스 우선순위 확정

## 20. 앞으로 해야 할 것

### Immediate

- 스택 확정
- MVP 데이터 소스 3~4개 확정
- 공통 스키마 확정
- 개발환경 부트스트랩

### Near Term

- 지도 중심 MVP 구현
- AI 요약 기능 연결
- 이벤트 정규화 안정화

### Mid Term

- 워치리스트
- 저장된 필터
- 이벤트 관계 해석
- ontology 초안 반영
- `global + 특정 도시` 확장
- 특정 도시 데이터 커넥터 추가

### Long Term

- SaaS 멀티테넌시
- AI query platform
- usage-based billing
- enterprise features

## 21. 최종 판단

Globe의 성공 여부는 3D 글로브나 AI 채팅의 화려함이 아니라, 다음 세 가지를 얼마나 빠르게 붙이는지에 달려 있다.

- 공개 데이터를 공통 구조로 통합하는 능력
- 지도 기반 분석 경험을 빠르게 제공하는 능력
- 이후 이를 ontology와 grounded AI 계층으로 확장하는 능력

따라서 현재 시점에서의 가장 좋은 전략은 다음이다.

- 웹 기반으로 시작한다.
- MVP는 운영 콘솔에 집중한다.
- AI는 요약과 근거 제시에만 제한한다.
- 온톨로지는 Post-MVP부터 얇게 도입한다.
- SaaS는 멀티테넌트와 과금보다 먼저 반복 사용 워크플로를 증명한 뒤 확장한다.
