import { get } from "./http";
export function getAuditLog() { return get("/audit"); }
