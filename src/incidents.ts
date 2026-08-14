export type Severity = "LOW" | "MEDIUM" | "HIGH";
export type Status = "OPEN" | "INVESTIGATING" | "CLOSED";

export interface Incident {
  id: number;
  title: string;
  severity: Severity;
  status: Status;
}

const incidents: Incident[] = [
  { id: 1, title: "API returning 500s", severity: "HIGH", status: "OPEN" },
  { id: 2, title: "Slow dashboard load", severity: "MEDIUM", status: "INVESTIGATING" },
  { id: 3, title: "Typo in email template", severity: "LOW", status: "CLOSED" },
];

let nextId = incidents.length + 1;

export function listIncidents(): Incident[] {
  return incidents;
}

export function getIncident(id: number): Incident | undefined {
  return incidents.find((incident) => incident.id === id);
}

export function getHighSeverityIncidents(): Incident[] {
  return incidents.filter((incident) => incident.severity === "HIGH");
}

export function createIncident(title: string, severity: Severity): Incident {
  const incident: Incident = { id: nextId++, title, severity, status: "OPEN" };
  incidents.push(incident);
  return incident;
}

export function setIncidentStatus(id: number, status: Status): Incident | undefined {
  const incident = getIncident(id);
  if (!incident) return undefined;
  incident.status = status;
  return incident;
}

export function deleteIncident(id: number): boolean {
  const index = incidents.findIndex((incident) => incident.id === id);
  if (index === -1) return false;
  incidents.splice(index, 1);
  return true;
}
