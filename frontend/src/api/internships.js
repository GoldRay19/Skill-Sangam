import { get, patch, post } from "./http";

export function getInternships({ q = "", skill = "", sort = "match", studentSkills = [] } = {}) {
  const params = new URLSearchParams({ q, skill, sort, studentSkills: studentSkills.join(",") });
  return get(`/internships?${params}`);
}

export function getInternship(id) { return get(`/internships/${id}`); }
export function createInternship(payload) { return post("/internships", payload); }
export function updateInternship(id, patchData) { return patch(`/internships/${id}`, patchData); }
export function getEmployerInternships(employerId) { return get(`/employers/${employerId}/internships`); }
