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

export interface EventQuery {
  bbox?: string;
  timeFrom?: string;
  timeTo?: string;
  eventTypes?: string[];
  sources?: string[];
  limit?: number;
  cursor?: string;
}

export interface HealthResponse {
  ok: boolean;
  service: string;
  version: string;
}

export interface SourceStatus {
  id: string;
  label: string;
  eventTypes: EventType[];
  status: "healthy" | "degraded" | "offline";
  license: string;
  updatedAt: string;
}

export interface SourcesResponse {
  items: SourceStatus[];
}

export interface EventsResponse {
  items: CanonicalEvent[];
  nextCursor: string | null;
  meta: {
    count: number;
    queryTimeMs: number;
  };
}

export interface EventDetailResponse {
  item: CanonicalEvent;
}

export interface SummaryRequest {
  mode: "viewport" | "selection";
  bbox?: string;
  timeFrom?: string;
  timeTo?: string;
  eventTypes?: EventType[];
  maxItems?: number;
  eventIds?: string[];
}

export interface SummaryCitation {
  eventId: string;
  source: string;
  title: string;
}

export interface SummaryResponse {
  summary: string;
  sourceCount: number;
  eventCount: number;
  sources: string[];
  generatedAt: string;
  citations: SummaryCitation[];
}
