import type { EventsResponse, SummaryResponse } from "./index";

export const mockEventsResponse: EventsResponse = {
  items: [
    {
      id: "evt_usgs_alaska_001",
      source: "usgs",
      externalId: "ak026",
      eventType: "earthquake",
      title: "M 4.1 - Alaska",
      description: "Shallow earthquake event",
      severity: 4.1,
      status: "active",
      timestamp: "2026-03-10T05:22:00Z",
      updatedAt: "2026-03-10T05:25:00Z",
      placeName: "Alaska",
      confidence: 0.98,
      sourceUrl: "https://earthquake.usgs.gov/",
      geometry: {
        type: "Point",
        coordinates: [-149.9, 61.2],
      },
      tags: ["usgs", "earthquake"],
    },
    {
      id: "evt_firms_brazil_001",
      source: "firms",
      externalId: "firms-001",
      eventType: "wildfire",
      title: "Thermal hotspot detected - Mato Grosso",
      description: "NASA FIRMS thermal anomaly hotspot",
      severity: 3.0,
      status: "active",
      timestamp: "2026-03-10T03:10:00Z",
      updatedAt: "2026-03-10T03:40:00Z",
      placeName: "Mato Grosso, Brazil",
      confidence: 0.88,
      sourceUrl: "https://firms.modaps.eosdis.nasa.gov/",
      geometry: {
        type: "Point",
        coordinates: [-56.09, -12.64],
      },
      tags: ["firms", "wildfire"],
    },
    {
      id: "evt_weather_us_001",
      source: "weather",
      externalId: "weather-001",
      eventType: "weather_alert",
      title: "Winter storm warning - Minnesota",
      description: "National weather alert impacting road conditions",
      severity: 2.0,
      status: "active",
      timestamp: "2026-03-10T01:00:00Z",
      updatedAt: "2026-03-10T04:00:00Z",
      placeName: "Minnesota, USA",
      confidence: 0.93,
      sourceUrl: "https://www.weather.gov/",
      geometry: {
        type: "Point",
        coordinates: [-94.68, 46.73],
      },
      tags: ["weather", "alert"],
    },
  ],
  nextCursor: null,
  meta: {
    count: 3,
    queryTimeMs: 18,
  },
};

export const mockSummaryResponse: SummaryResponse = {
  summary:
    "지난 24시간 기준으로 전역 데이터에서는 알래스카 지진, 브라질 열점, 미국 중서부 기상 경보가 동시에 관측되었습니다.",
  sourceCount: 3,
  eventCount: 3,
  sources: ["usgs", "firms", "weather"],
  generatedAt: "2026-03-10T06:30:00Z",
  citations: [
    {
      eventId: "evt_usgs_alaska_001",
      source: "usgs",
      title: "M 4.1 - Alaska",
    },
    {
      eventId: "evt_firms_brazil_001",
      source: "firms",
      title: "Thermal hotspot detected - Mato Grosso",
    },
    {
      eventId: "evt_weather_us_001",
      source: "weather",
      title: "Winter storm warning - Minnesota",
    },
  ],
};
