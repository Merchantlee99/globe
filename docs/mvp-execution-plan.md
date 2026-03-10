# Globe MVP Execution Plan

작성일: 2026-03-10  
범위: 에이전트 3개 체제로 2주 안에 데모 가능한 MVP를 만드는 실행 계획

## 1. MVP 목표 재정의

2주 안에 만들어야 하는 것은 "완성형 플랫폼"이 아니라 아래가 가능한 운영 콘솔이다.

- 범위는 `global only`다.
- 지도 위에서 공개 이벤트 3개 이상을 동시에 본다.
- 시간 범위를 바꾸면 지도와 리스트가 함께 갱신된다.
- 이벤트 클릭 시 상세 정보와 원본 출처를 본다.
- 현재 화면 기준으로 AI 요약을 생성한다.

## 2. 성공 기준

- 데모 흐름이 3분 안에 설명 가능하다.
- 앱이 빈 화면이 아니라 실제 공개 데이터로 동작한다.
- 데이터 2개가 아니라 최소 3개 소스를 같은 모델로 표시한다.
- API와 프런트가 mock이 아닌 실제 연결 상태다.
- 요약 결과에 근거 source count 또는 source list가 포함된다.

## 3. 범위 고정

### 포함

- 2D 지도
- 이벤트 레이어 토글
- 이벤트 리스트
- 이벤트 상세 패널
- 시간 필터
- 실시간 또는 준실시간 갱신
- AI summary action

### 제외

- 3D globe
- 멀티테넌시
- 로그인
- billing
- ontology graph full model
- 자유형 AI chat
- object detection pipeline
- 특정 도시 CCTV/교통 레이어

## 4. 데이터 소스 우선순위

### P0

- USGS Earthquakes
- NASA FIRMS

### P1

- Weather alerts

### P2

- Optional global flight feed

원칙:

- MVP는 글로벌 공통 데이터만 사용한다.
- 특정 도시 데이터는 권한과 품질 편차가 커서 Post-MVP로 미룬다.

## 5. 2주 스프린트 구조

## Phase A. Foundation and contracts

기간: Day 1-2

목표:

- 에이전트가 동시에 시작할 수 있는 최소 토대 구축

산출물:

- repo skeleton
- env example
- Docker Compose
- Postgres/PostGIS
- canonical event schema v1
- API contract v1
- mock fixture 2종 이상

담당:

- Agent C 주도
- Agent A/B 입력 반영

완료 조건:

- 프런트와 백엔드가 mock contract 기준으로 병렬 개발 시작 가능

## Phase B. Core data and map shell

기간: Day 3-5

목표:

- 실제 데이터 2개와 지도 UI 1차 연결

산출물:

- USGS adapter
- FIRMS adapter
- `GET /api/v1/events`
- map shell
- event markers/layers
- list panel

담당:

- Agent B: source adapters and API
- Agent A: map shell and list UI
- Agent C: contract enforcement and fixtures update

완료 조건:

- 실제 데이터가 지도와 리스트에 표시된다.

## Phase C. Analyst console basics

기간: Day 6-8

목표:

- 운영 콘솔로서의 사용성을 확보

산출물:

- detail panel
- time range filter
- source filters
- empty / loading / error states
- weather alerts integration

완료 조건:

- 사용자가 이벤트를 클릭하고 상세를 탐색할 수 있다.
- 데이터 source 장애 시도 UI가 깨지지 않는다.

## Phase D. AI summary and demo polish

기간: Day 9-10

목표:

- AI를 MVP 범위 내에서 유용하게 연결

산출물:

- `POST /api/v1/summary`
- current viewport summary action
- source citation rendering
- sample demo script
- seed data fallback

완료 조건:

- 현재 화면 기준 요약이 생성된다.
- 요약 화면에 출처 정보가 있다.

## Phase E. Buffer and integration hardening

기간: Day 11-14

목표:

- 충돌 정리
- 버그 수정
- 데모 안정화

산출물:

- integration fixes
- API/frontend alignment
- performance pass
- basic README and runbook

완료 조건:

- 새 환경에서 실행 경로가 문서화된다.
- 주요 데모 시나리오가 끊기지 않는다.

## 6. 에이전트별 우선순위

## Agent A

### First

- layout shell
- map container
- left layer panel
- right detail panel placeholder

### Second

- marker/layer rendering
- list and selection sync
- time filter UI

### Third

- AI summary UI
- empty/loading/error polish

## Agent B

### First

- DB connection
- source table/event table
- adapter framework

### Second

- USGS
- FIRMS
- event query API

### Third

- weather alerts
- summary request preparation
- stream/poll updates

## Agent C

### First

- contracts
- root tooling
- env policy
- worktree setup guide

### Second

- mock fixtures
- shared types
- summary endpoint contract

### Third

- integration tests
- merge coordination
- AI grounding safeguards

## 7. 중요 의존성

- Agent A는 실제 API가 없어도 mock contract로 시작해야 한다.
- Agent B는 UI와 무관하게 canonical event schema를 먼저 맞춰야 한다.
- Agent C가 늦으면 둘 다 흔들리므로 계약 문서를 가장 먼저 끝내야 한다.

## 8. 리스크와 대응

### 리스크: 데이터 소스 응답 형식 변화

대응:

- raw payload 저장
- adapter isolation
- source health status 노출

### 리스크: CCTV/항공 데이터 권한 문제

대응:

- 특정 도시 CCTV는 MVP 범위에서 제외
- 글로벌 flight는 optional source로만 취급

### 리스크: AI 응답 품질 불안정

대응:

- summary only
- retrieval-limited prompt
- source count 및 source link 포함

### 리스크: agent 간 충돌

대응:

- worktree 분리
- ownership 강제
- contract-first

## 9. 지금 바로 필요한 사용자 결정

현재 아래 결정은 고정되었다.

- AI provider: OpenAI GPT-5 nano
- map tile provider: MapTiler
- MVP scope: global only

MVP 이후 다시 결정할 항목:

- 특정 도시 확장 대상 도시 1곳
- 해당 도시의 CCTV/교통/incident source

## 10. 초기 백로그 우선순위

### Must

- canonical event schema
- repo skeleton
- PostGIS
- USGS adapter
- FIRMS adapter
- events API
- map UI
- detail panel
- time filter
- summary API

### Should

- weather alerts
- source health
- retry policy
- saved demo presets

### Could

- SSE live updates
- basic flight layer

## 13. Post-MVP city expansion note

MVP 이후에는 아래 순서로 `global + 특정 도시`로 확장한다.

1. 대상 도시 1곳 선정
2. 해당 도시의 CCTV/교통/incident feed 확보
3. canonical schema에 city-specific source mapping 추가
4. 글로벌 레이어와 특정 도시 레이어를 동일한 필터/상세 패널에서 처리

## 11. Definition of done

작업이 완료로 간주되려면 아래를 만족해야 한다.

- 코드가 소유 디렉토리 안에 있다.
- contract 변경이 있으면 문서가 먼저 갱신되었다.
- 최소 1개 검증 경로가 있다.
- 다음 에이전트가 사용할 수 있는 상태다.

## 12. 다음 단계

이 문서 다음으로 바로 해야 할 일은 아래다.

1. root tooling 파일 생성
2. contract package 생성
3. env.example 작성
4. compose로 PostGIS 띄우기
5. mock fixtures 추가
