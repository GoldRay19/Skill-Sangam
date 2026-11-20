import { read, request, uid, write } from "./store";
export async function getInternships({
  q = "",
  skill = "",
  sort = "match",
  studentSkills = [],
} = {}) {
  return request(() => {
    const employers = read("users", []);
    let data = read("internships", [])
      .filter((i) => i.status === "open")
      .map((i) => ({
        ...i,
        company:
          employers.find((e) => e.id === i.employerId)?.companyName ||
          "Startup",
        match: studentSkills.length
          ? Math.round(
              (i.requiredSkills.filter((s) =>
                studentSkills
                  .map((x) => x.toLowerCase())
                  .includes(s.toLowerCase()),
              ).length /
                i.requiredSkills.length) *
                100,
            )
          : null,
      }));
    const term = q.toLowerCase();
    if (term)
      data = data.filter((i) =>
        `${i.title} ${i.description} ${i.company} ${i.requiredSkills.join(" ")}`
          .toLowerCase()
          .includes(term),
      );
    if (skill) data = data.filter((i) => i.requiredSkills.includes(skill));
    data.sort((a, b) =>
      sort === "stipend" ? b.stipend - a.stipend : b.match - a.match,
    );
    return { data };
  });
}
export async function getInternship(id) {
  return request(() => {
    const i = read("internships", []).find((x) => x.id === id);
    if (!i)
      throw Object.assign(new Error("Internship not found."), {
        message: "Internship not found.",
      });
    const employer = read("users", []).find((x) => x.id === i.employerId);
    return {
      data: { ...i, company: employer?.companyName || "Startup", employer },
    };
  });
}
export async function createInternship(payload) {
  return request(() => {
    const internship = { ...payload, id: uid(), status: "open" };
    write("internships", [internship, ...read("internships", [])]);
    return { data: internship };
  });
}
export async function updateInternship(id, patch) {
  return request(() => {
    const data = read("internships", []).map((i) =>
      i.id === id ? { ...i, ...patch } : i,
    );
    write("internships", data);
    return { data: data.find((i) => i.id === id) };
  });
}
export async function getEmployerInternships(employerId) {
  return request(() => ({
    data: read("internships", []).filter((i) => i.employerId === employerId),
  }));
}
