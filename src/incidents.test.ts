import { describe, expect, it } from "vitest";
import {
  createIncident,
  deleteIncident,
  getHighSeverityIncidents,
  getIncident,
  getOpenIncidents,
  listIncidents,
  setIncidentStatus,
} from "./incidents.js";

describe("incidents", () => {
  it("lists the seeded incidents", () => {
    const incidents = listIncidents();
    expect(incidents.length).toBeGreaterThanOrEqual(3);
  });

  it("gets an incident by id", () => {
    const incident = getIncident(1);
    expect(incident?.title).toBe("API returning 500s");
  });

  it("returns undefined for an unknown id", () => {
    expect(getIncident(9999)).toBeUndefined();
  });

  it("creates a new incident with OPEN status", () => {
    const incident = createIncident("Payments queue backed up", "HIGH");
    expect(incident.status).toBe("OPEN");
    expect(getIncident(incident.id)).toEqual(incident);
  });

  it("changes an incident's status", () => {
    const incident = createIncident("Login page flaky", "MEDIUM");
    const updated = setIncidentStatus(incident.id, "INVESTIGATING");
    expect(updated?.status).toBe("INVESTIGATING");
    expect(getIncident(incident.id)?.status).toBe("INVESTIGATING");
  });

  it("deletes an incident by id", () => {
    const incident = createIncident("Duplicate alert noise", "LOW");
    expect(deleteIncident(incident.id)).toBe(true);
    expect(getIncident(incident.id)).toBeUndefined();
  });

  it("returns false when deleting an unknown id", () => {
    expect(deleteIncident(9999)).toBe(false);
  });

  it("leaves existing incidents untouched when deleting an unknown id", () => {
    const before = listIncidents().length;
    deleteIncident(9999);
    expect(listIncidents().length).toBe(before);
    expect(getIncident(1)).toBeDefined();
  });

  it("returns only HIGH severity incidents", () => {
    const highSeverity = getHighSeverityIncidents();
    expect(highSeverity.length).toBeGreaterThanOrEqual(1);
    expect(highSeverity.every((incident) => incident.severity === "HIGH")).toBe(true);
  });

  it("excludes non-HIGH severity incidents", () => {
    const highSeverity = getHighSeverityIncidents();
    expect(highSeverity.some((incident) => incident.title === "Slow dashboard load")).toBe(false);
  });

  it("returns only OPEN incidents", () => {
    const open = getOpenIncidents();
    expect(open.length).toBeGreaterThanOrEqual(1);
    expect(open.every((incident) => incident.status === "OPEN")).toBe(true);
  });

  it("excludes non-OPEN incidents", () => {
    const open = getOpenIncidents();
    expect(open.some((incident) => incident.title === "Slow dashboard load")).toBe(false);
  });
});
