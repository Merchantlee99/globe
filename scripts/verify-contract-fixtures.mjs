import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const fixturesDir = path.join(rootDir, "packages", "contracts", "fixtures");

const eventTypes = new Set([
  "earthquake",
  "wildfire",
  "weather_alert",
  "flight",
  "cctv_signal",
  "custom",
]);

const statuses = new Set(["active", "resolved", "unknown"]);
const geometryTypes = new Set(["Point", "LineString", "Polygon"]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isIsoString(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isNumberPairList(value) {
  return (
    Array.isArray(value) &&
    value.every(
      (point) =>
        Array.isArray(point) &&
        point.length === 2 &&
        point.every((coord) => typeof coord === "number"),
    )
  );
}

function validateGeometry(geometry, label) {
  assert(geometry && typeof geometry === "object", `${label}: geometry is required`);
  assert(
    geometryTypes.has(geometry.type),
    `${label}: geometry.type must be Point, LineString, or Polygon`,
  );

  if (geometry.type === "Point") {
    assert(
      Array.isArray(geometry.coordinates) &&
        geometry.coordinates.length === 2 &&
        geometry.coordinates.every((coord) => typeof coord === "number"),
      `${label}: Point coordinates must be [lng, lat]`,
    );
    return;
  }

  if (geometry.type === "LineString") {
    assert(
      isNumberPairList(geometry.coordinates),
      `${label}: LineString coordinates must be [lng, lat][]`,
    );
    return;
  }

  assert(
    Array.isArray(geometry.coordinates) &&
      geometry.coordinates.every((ring) => isNumberPairList(ring)),
    `${label}: Polygon coordinates must be [lng, lat][][]`,
  );
}

function validateEvent(event, index) {
  const label = `events.items[${index}]`;
  assert(typeof event.id === "string" && event.id.length > 0, `${label}: id is required`);
  assert(typeof event.source === "string" && event.source.length > 0, `${label}: source is required`);
  assert(eventTypes.has(event.eventType), `${label}: unknown eventType ${event.eventType}`);
  assert(typeof event.title === "string" && event.title.length > 0, `${label}: title is required`);
  assert(isIsoString(event.timestamp), `${label}: timestamp must be ISO-8601`);
  if (event.updatedAt !== undefined) {
    assert(isIsoString(event.updatedAt), `${label}: updatedAt must be ISO-8601`);
  }
  if (event.status !== undefined) {
    assert(statuses.has(event.status), `${label}: invalid status`);
  }
  if (event.severity !== undefined) {
    assert(typeof event.severity === "number", `${label}: severity must be a number`);
  }
  if (event.confidence !== undefined) {
    assert(typeof event.confidence === "number", `${label}: confidence must be a number`);
  }
  validateGeometry(event.geometry, label);
}

function validateEventsResponse(payload) {
  assert(payload && typeof payload === "object", "events fixture must be an object");
  assert(Array.isArray(payload.items), "events.items must be an array");
  payload.items.forEach(validateEvent);
  assert(payload.nextCursor === null || typeof payload.nextCursor === "string", "events.nextCursor must be null or string");
  assert(payload.meta && typeof payload.meta === "object", "events.meta is required");
  assert(typeof payload.meta.count === "number", "events.meta.count must be a number");
  assert(typeof payload.meta.queryTimeMs === "number", "events.meta.queryTimeMs must be a number");
}

function validateSummaryResponse(payload, eventIds) {
  assert(payload && typeof payload === "object", "summary fixture must be an object");
  assert(typeof payload.summary === "string", "summary.summary must be a string");
  assert(typeof payload.sourceCount === "number", "summary.sourceCount must be a number");
  assert(typeof payload.eventCount === "number", "summary.eventCount must be a number");
  assert(Array.isArray(payload.sources), "summary.sources must be an array");
  assert(isIsoString(payload.generatedAt), "summary.generatedAt must be ISO-8601");
  assert(Array.isArray(payload.citations), "summary.citations must be an array");

  payload.citations.forEach((citation, index) => {
    const label = `summary.citations[${index}]`;
    assert(typeof citation.eventId === "string", `${label}: eventId is required`);
    assert(typeof citation.source === "string", `${label}: source is required`);
    assert(typeof citation.title === "string", `${label}: title is required`);
    assert(eventIds.has(citation.eventId), `${label}: eventId must exist in events fixture`);
  });
}

async function readJson(fileName) {
  const filePath = path.join(fixturesDir, fileName);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function main() {
  const events = await readJson("events.json");
  const summary = await readJson("summary.json");
  validateEventsResponse(events);
  const eventIds = new Set(events.items.map((item) => item.id));
  validateSummaryResponse(summary, eventIds);
  console.log("contracts fixtures verified");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
