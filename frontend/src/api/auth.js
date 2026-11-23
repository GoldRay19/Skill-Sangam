import request, { get, patch, post } from "./http";

export async function login(email, password, expectedRole) {
  const response = await post("/auth/login", { email, password, expectedRole });
  localStorage.setItem("ss_token", response.data.token);
  return { data: response.data.user };
}

export async function register(payload) {
  const response = await post("/auth/register", payload);
  localStorage.setItem("ss_token", response.data.token);
  return { data: response.data.user };
}

export async function logout() {
  localStorage.removeItem("ss_token");
  return post("/auth/logout", {});
}

export async function getSession() {
  if (!localStorage.getItem("ss_token")) return null;
  const response = await get("/auth/session");
  return response.data;
}

export async function updateUser(id, updates) {
  const response = await patch(`/users/${id}`, updates);
  return { data: response.data };
}

export async function getUsers() {
  return get("/users");
}

export { request };
