# Globe API Contract v1

작성일: 2026-03-10  
상태: MVP initial contract  
목적: 프런트엔드와 백엔드가 병렬 개발할 수 있도록 최소 API shape를 고정한다.

## 1. 설계 원칙

- 모든 source는 canonical event schema로 정규화한다.
- 프런트는 source별 raw 구조를 직접 해석하지 않는다.
- raw payload는 보존하되 API 응답은 안정된 필드를 우선 제공한다.
- AI summary는 raw prompt가 아니라 retrieved event set 기준으로 만든다.

## 2. Canonical Event

```ts
export type EventType =
  | "earthquake"
  | "wildfire"
  | "weather_alert"
  | "flight"
  | "cctv_signal"
  | "custom";

export type Geometry =
  | { type: "Point"; coordinates: [number, number] }
  | { type: "LineString"; coordinates: [number, number][] }
  | { type: "Polygon"; coordinates: [number, number][][] };

export interface CanonicalEvent {
  id: string;
  source: string;
  externalId?: string;
  eventType: EventType;
  title: string;
  description?: string;
  severity?: number;
  status?: "active" | "resolved" | "unknown";
  timestamp: string;
  updatedAt?: string;
  placeName?: string;
  confidence?: number;
  sourceUrl?: string;
  geometry: Geometry;
  tags?: string[];
  rawPayload?: unknown;
}
```

## 3. Query model

```ts
export interface EventQuery {
  bbox?: string;
  timeFrom?: string;
  timeTo?: string;
  eventTypes?: string[];
  sources?: string[];
  limit?: number;
  cursor?: string;
}
```

`bbox` format:

```txt
minLng,minLat,maxLng,maxLat
```

## 4. Endpoints

## `GET /api/v1/health`

목적:

- 서비스 상태 확인

응답:

```json
{
  "ok": true,
  "service": "globe-api",
  "version": "0.1.0"
}
```

## `GET /api/v1/sources`

목적:

- 사용 가능한 데이터 source 목록과 상태 제공

응답:

```json
{
  "items": [
    {
      "id": "usgs",
      "label": "USGS Earthquakes",
      "eventTypes": ["earthquake"],
      "status": "healthy",
      "license": "public",
      "updatedAt": "2026-03-10T06:00:00Z"
    }
  ]
}
```

## `GET /api/v1/events`

목적:

- 현재 뷰포트와 시간 범위에 맞는 이벤트 조회

쿼리:

- `bbox`
- `timeFrom`
- `timeTo`
- `eventTypes`
- `sources`
- `limit`
- `cursor`

응답:

```json
{
  "items": [
    {
      "id": "evt_123",
      "source": "usgs",
      "externalId": "ak026",
      "eventType": "earthquake",
      "title": "M 4.1 - Alaska",
      "severity": 4.1,
      "status": "active",
      "timestamp": "2026-03-10T05:22:00Z",
      "placeName": "Alaska",
      "sourceUrl": "https://example.com/event",
      "geometry": {
        "type": "Point",
        "coordinates": [-149.9, 61.2]
      },
      "tags": ["usgs", "earthquake"]
    }
  ],
  "nextCursor": null,
  "meta": {
    "count": 1,
    "queryTimeMs": 31
  }
}
```

## `GET /api/v1/events/:id`

목적:

- 단일 이벤트 상세 조회

응답:

```json
{
  "item": {
    "id": "evt_123",
    "source": "usgs",
    "eventType": "earthquake",
    "title": "M 4.1 - Alaska",
    "description": "Shallow earthquake event",
    "severity": 4.1,
    "status": "active",
    "timestamp": "2026-03-10T05:22:00Z",
    "updatedAt": "2026-03-10T05:25:00Z",
    "placeName": "Alaska",
    "sourceUrl": "https://example.com/event",
    "confidence": 0.98,
    "geometry": {
      "type": "Point",
      "coordinates": [-149.9, 61.2]
    },
    "tags": ["usgs", "earthquake"],
    "rawPayload": {}
  }
}
```

## `POST /api/v1/summary`

목적:

- 현재 뷰포트 또는 사용자 선택 이벤트 집합을 요약

요청:

```json
{
  "mode": "viewport",
  "bbox": "-125,24,-66,49",
  "timeFrom": "2026-03-09T00:00:00Z",
  "timeTo": "2026-03-10T00:00:00Z",
  "eventTypes": ["earthquake", "wildfire"],
  "maxItems": 100
}
```

응답:

```json
{
  "summary": "지난 24시간 동안 선택 영역에서는 산불 핫스팟이 다수 감지되었고, 중간 규모 지진 이벤트가 일부 보고되었습니다.",
  "sourceCount": 2,
  "eventCount": 37,
  "sources": ["usgs", "firms"],
  "generatedAt": "2026-03-10T06:30:00Z",
  "citations": [
    {
      "eventId": "evt_123",
      "source": "usgs",
      "title": "M 4.1 - Alaska"
    }
  ]
}
```

## 5. Error shape

```json
{
  "error": {
    "code": "SOURCE_UNAVAILABLE",
    "message": "Requested source is temporarily unavailable"
  }
}
```

## 6. Frontend assumptions

- 좌표는 `[lng, lat]`를 사용한다.
- timestamp는 ISO-8601 UTC 문자열이다.
- severity는 source별 값이라 의미가 완전히 같지 않을 수 있다.
- tags는 화면 표시와 필터에 사용 가능하다.
- `rawPayload`는 상세 화면에서만 사용한다.

## 7. Change policy

- 필드 제거는 금지
- 새 필드 추가는 허용
- 타입 변경은 문서 갱신 후에만 허용
- 응답 shape 변경 시 `packages/contracts`와 문서를 함께 갱신

