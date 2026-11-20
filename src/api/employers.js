import { read, request, uid, write } from "./store";
import { updateUser } from "./auth";
export async function submitVerification(userId, details) {
  return request(async () => {
    await updateUser(userId, {
      ...details,
      verificationStatus: "pending",
      rejectionReason: "",
    });
    return { data: true };
  });
}
export async function verifyEmployer(userId, status, rejectionReason = "") {
  return request(async () => {
    await updateUser(userId, { verificationStatus: status, rejectionReason });
    write("audit", [
      {
        id: uid(),
        action:
          status === "approved" ? "Approved employer" : "Rejected employer",
        target: userId,
        actor: "admin",
        createdAt: new Date().toISOString(),
        reason: rejectionReason,
      },
      ...read("audit", []),
    ]);
    return { data: true };
  });
}
export async function suspendEmployer(userId, status = "suspended") {
  return request(() => {
    const users = read("users", []).map((u) =>
      u.id === userId ? { ...u, verificationStatus: status } : u,
    );
    write("users", users);
    if (status === "suspended")
      write(
        "internships",
        read("internships", []).map((i) =>
          i.employerId === userId ? { ...i, status: "closed" } : i,
        ),
      );
    write("audit", [
      {
        id: uid(),
        action:
          status === "suspended" ? "Suspended employer" : "Reinstated employer",
        target: userId,
        actor: "admin",
        createdAt: new Date().toISOString(),
      },
      ...read("audit", []),
    ]);
    return { data: true };
  });
}
