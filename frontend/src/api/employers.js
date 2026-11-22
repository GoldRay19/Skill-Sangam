import { patch, post } from "./http";

export function submitVerification(userId, details) {
  return post(`/employers/${userId}/verification`, details);
}

export function verifyEmployer(userId, status, rejectionReason = "") {
  return patch(`/employers/${userId}/status`, { status, rejectionReason });
}

export function suspendEmployer(userId, status = "suspended") {
  return patch(`/employers/${userId}/suspension`, { status });
}
