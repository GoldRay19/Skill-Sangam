import { read, request, uid, write } from "./store";
export async function getApplications({
  studentId,
  internshipId,
  employerId,
} = {}) {
  return request(() => {
    let data = read("applications", []);
    if (studentId) data = data.filter((a) => a.studentId === studentId);
    if (internshipId)
      data = data.filter((a) => a.internshipId === internshipId);
    if (employerId) {
      const ids = read("internships", [])
        .filter((i) => i.employerId === employerId)
        .map((i) => i.id);
      data = data.filter((a) => ids.includes(a.internshipId));
    }
    return {
      data: data.map((a) => ({
        ...a,
        student: read("users", []).find((u) => u.id === a.studentId),
        internship: read("internships", []).find(
          (i) => i.id === a.internshipId,
        ),
      })),
    };
  });
}
export async function createApplication(payload) {
  return request(() => {
    const all = read("applications", []);
    if (
      all.some(
        (a) =>
          a.studentId === payload.studentId &&
          a.internshipId === payload.internshipId,
      )
    )
      throw Object.assign(new Error("You have already applied."), {
        message: "You have already applied.",
      });
    const app = {
      ...payload,
      id: uid(),
      status: "Applied",
      createdAt: new Date().toISOString(),
    };
    write("applications", [app, ...all]);
    return { data: app };
  });
}
export async function updateApplication(id, status) {
  return request(() => {
    const data = read("applications", []).map((a) =>
      a.id === id ? { ...a, status } : a,
    );
    write("applications", data);
    if (status === "Accepted") {
      const app = data.find((a) => a.id === id);
      const internships = read("internships", []).map((i) =>
        i.id === app.internshipId
          ? {
              ...i,
              openings: Math.max(0, i.openings - 1),
              status: i.openings <= 1 ? "closed" : i.status,
            }
          : i,
      );
      write("internships", internships);
    }
    return { data: data.find((a) => a.id === id) };
  });
}
