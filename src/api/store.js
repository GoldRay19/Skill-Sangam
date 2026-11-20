const PREFIX = "ss_phase1_";
export const wait = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(PREFIX + key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};
export const write = (key, value) =>
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
export const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
export const apiError = (message) =>
  Object.assign(new Error(message), { message });
export async function request(fn) {
  await wait();
  return fn();
}
