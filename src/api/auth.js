import { ensureSeed } from "./seed";
import { apiError, read, request, uid, write } from "./store";
ensureSeed();
export async function login(email, password) {
  return request(() => {
    const user = read("users", []).find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
    if (!user) throw apiError("Invalid email or password.");
    const safe = { ...user };
    delete safe.password;
    write("session", safe);
    return { data: safe };
  });
}
export async function register({ role, name, email, password }) {
  return request(() => {
    const users = read("users", []);
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
      throw apiError("An account with this email already exists.");
    const user = {
      id: uid(),
      role,
      name,
      email,
      password,
      ...(role === "student"
        ? { college: "", bio: "", skills: [], github: "" }
        : {
            verificationStatus: "unverified",
            companyName: "",
            website: "",
            linkedin: "",
            registrationType: "",
            registrationNumber: "",
            proof: "",
          }),
    };
    write("users", [...users, user]);
    const safe = { ...user };
    delete safe.password;
    write("session", safe);
    return { data: safe };
  });
}
export async function logout() {
  return request(() => {
    localStorage.removeItem("ss_phase1_session");
    return { data: true };
  });
}
export async function getSession() {
  ensureSeed();
  return read("session", null);
}
export async function updateUser(id, patch) {
  return request(() => {
    const users = read("users", []);
    const updated = users.map((u) => (u.id === id ? { ...u, ...patch } : u));
    write("users", updated);
    const user = updated.find((u) => u.id === id);
    const safe = { ...user };
    delete safe.password;
    write("session", safe);
    return { data: safe };
  });
}
export async function getUsers() {
  return request(() => ({ data: read("users", []) }));
}
