import { read, request } from "./store";
export async function getAuditLog() {
  return request(() => ({ data: read("audit", []) }));
}
