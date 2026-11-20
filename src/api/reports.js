import { read, request, uid, write } from "./store";
export async function createReport(payload) {
  return request(() => {
    const report = {
      ...payload,
      id: uid(),
      status: "Open",
      createdAt: new Date().toISOString(),
    };
    write("reports", [report, ...read("reports", [])]);
    return { data: report };
  });
}
export async function getReports() {
  return request(() => ({ data: read("reports", []) }));
}
export async function updateReport(id, status) {
  return request(() => {
    const data = read("reports", []).map((r) =>
      r.id === id ? { ...r, status } : r,
    );
    write("reports", data);
    return { data: data.find((r) => r.id === id) };
  });
}
