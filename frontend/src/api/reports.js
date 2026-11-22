import { get, patch, post } from "./http";

export function createReport(payload) { return post("/reports", payload); }
export function getReports() { return get("/reports"); }
export function updateReport(id, status) { return patch(`/reports/${id}`, { status }); }
