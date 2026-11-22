const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("ss_token");
  const headers = { ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || "Request failed.");
  return payload;
}

export const get = (path) => request(path);
export const post = (path, body) => request(path, { method: "POST", body: JSON.stringify(body) });
export const patch = (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) });
export default request;
