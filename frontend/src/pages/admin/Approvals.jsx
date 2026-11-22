import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { getUsers } from "../../api/auth";
import { suspendEmployer, verifyEmployer } from "../../api/employers";
import { useToast } from "../../components/Toast";
import Badge from "../../components/Badge";
import Skeleton from "../../components/Skeleton";
export default function Approvals() {
  const [users, setUsers] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const toast = useToast();
  const load = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.filter((u) => u.role === "employer"));
      setError("");
    } catch (err) {
      setError(err.message || "Unable to load employer data.");
    }
  };
  useEffect(() => {
    load();
    const syncUsers = (event) => {
      if (event.key === "ss_phase1_users") load();
    };
    window.addEventListener("storage", syncUsers);
    return () => window.removeEventListener("storage", syncUsers);
  }, []);
  const action = async (u, status) => {
    let reason = "";
    if (status === "rejected") {
      reason = window.prompt("Reason for rejection:") || "";
      if (!reason) return;
    }
    await verifyEmployer(u.id, status, reason);
    toast(`Employer ${status}.`);
    setSelected(null);
    load();
  };
  const suspend = async (u) => {
    await suspendEmployer(
      u.id,
      u.verificationStatus === "suspended" ? "approved" : "suspended",
    );
    toast(
      u.verificationStatus === "suspended"
        ? "Employer reinstated."
        : "Employer suspended.",
    );
    load();
  };
  if (!users) {
    return error ? (
      <div className="error-box">
        <p>{error}</p>
        <button className="button small" onClick={load}>
          Try again
        </button>
      </div>
    ) : (
      <Skeleton rows={4} />
    );
  }
  const reviewQueue = users.filter((u) =>
    ["unverified", "pending"].includes(u.verificationStatus),
  );
  const proofIsImage =
    selected?.proofType?.startsWith("image/") ||
    selected?.proof?.startsWith("data:image/");
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">ADMIN WORKSPACE</div>
          <h1>Employer approvals</h1>
          <p>Review verification submissions and maintain marketplace trust.</p>
        </div>
        <button className="button secondary" onClick={load}>
          Refresh employers
        </button>
      </div>
      <section>
        <h2>Verification queue</h2>
        {!reviewQueue.length ? (
          <div className="empty">No employers are waiting for review.</div>
        ) : (
          <div className="list-card">
            {reviewQueue.map((u) => (
              <div className="list-row" key={u.id}>
                <div>
                  <h3>{u.companyName || u.name}</h3>
                  <p className="muted">{u.email}</p>
                </div>
                <Badge>{u.verificationStatus}</Badge>
                <button className="button small" onClick={() => setSelected(u)}>
                  Review
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="admin-list">
        <h2>All employers</h2>
        <div className="list-card">
          {users.map((u) => (
            <div className="list-row" key={u.id}>
              <div>
                <h3>{u.companyName || u.name}</h3>
                <p className="muted">{u.email}</p>
              </div>
              <Badge>{u.verificationStatus}</Badge>
              {["unverified", "pending"].includes(u.verificationStatus) ? (
                <button className="button small" onClick={() => setSelected(u)}>
                  Review
                </button>
              ) : (
                <button className="text-button" onClick={() => suspend(u)}>
                  {u.verificationStatus === "suspended"
                    ? "Reinstate"
                    : "Suspend"}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
      {selected && (
        <div className="drawer">
          <button className="text-button" onClick={() => setSelected(null)}>
            Close
          </button>
          <h2>{selected.companyName}</h2>
          <p>{selected.email}</p>
          <p>
            <Badge>{selected.verificationStatus}</Badge>{" "}
            {selected.emailVerified
              ? "Work email verified"
              : "Work email not verified"}
          </p>
          <p>Company: {selected.companyName || "Not provided"}</p>
          <p>Website: {selected.website || "Not provided"}</p>
          <p>LinkedIn: {selected.linkedin || "Not provided"}</p>
          <p>
            Registration: {selected.registrationType} ·{" "}
            {selected.registrationNumber}
          </p>
          <p>
            {selected.website ? (
              <a
                className="button secondary small"
                href={selected.website}
                target="_blank"
                rel="noreferrer"
              >
                Open website <ExternalLink size={13} />
              </a>
            ) : (
              <span className="muted">Website not provided</span>
            )}
          </p>
          <p>
            {selected.linkedin ? (
              <a
                className="button secondary small"
                href={selected.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                Open LinkedIn <ExternalLink size={13} />
              </a>
            ) : (
              <span className="muted">LinkedIn not provided</span>
            )}
          </p>
          <h3>Proof document</h3>
          {selected.proof ? (
            <>
              {proofIsImage && (
                <img
                  className="proof-preview"
                  src={selected.proof}
                  alt={selected.proofName || "Submitted proof"}
                />
              )}
              {!proofIsImage && (
                <p className="proof-file">
                  {selected.proofName || "Submitted document"}
                </p>
              )}
              <a
                className="button secondary small"
                href={selected.proof}
                target="_blank"
                rel="noreferrer"
              >
                Open proof document <ExternalLink size={13} />
              </a>
            </>
          ) : (
            <p className="muted">No proof document was submitted.</p>
          )}
          <div className="drawer-actions">
            <button
              className="button"
              onClick={() => action(selected, "approved")}
            >
              Approve
            </button>
            <button
              className="button danger"
              onClick={() => action(selected, "rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </>
  );
}
