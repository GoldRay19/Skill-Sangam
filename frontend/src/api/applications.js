import { get, patch, post } from "./http";

export function getApplications({ studentId, internshipId, employerId } = {}) {
  const params = new URLSearchParams();
  if (studentId) params.set("studentId", studentId);
  if (internshipId) params.set("internshipId", internshipId);
  if (employerId) params.set("employerId", employerId);
  return get(`/applications?${params}`);
}

export function createApplication(payload) { return post("/applications", payload); }
export function updateApplication(id, status) { return patch(`/applications/${id}`, { status }); }
