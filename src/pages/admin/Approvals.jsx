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
  const toast = useToast();
  const load = () =>
    getUsers().then((r) =>
      setUsers(r.data.filter((u) => u.role === "employer")),
    );
  useEffect(() => {
    load();
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
  if (!users) return <Skeleton rows={4} />;
  const pending = users.filter((u) => u.verificationStatus === "pending");
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">ADMIN WORKSPACE</div>
          <h1>Employer approvals</h1>
          <p>Review verification submissions and maintain marketplace trust.</p>
        </div>
      </div>
      <section>
        <h2>Pending queue</h2>
        {!pending.length ? (
          <div className="empty">No employers are waiting for review.</div>
        ) : (
          <div className="list-card">
            {pending.map((u) => (
              <div className="list-row" key={u.id}>
                <div>
                  <h3>{u.companyName || u.name}</h3>
                  <p className="muted">{u.email}</p>
                </div>
                <Badge>Pending</Badge>
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
              {u.verificationStatus !== "pending" && (
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
            Registration: {selected.registrationType} ·{" "}
            {selected.registrationNumber}
          </p>
          <p>
            <a href={selected.website} target="_blank" rel="noreferrer">
              Website <ExternalLink size={13} />
            </a>
          </p>
          <p>
            <a href={selected.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ExternalLink size={13} />
            </a>
          </p>
          {selected.proof && (
            <a href={selected.proof} download="proof">
              Open proof document
            </a>
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
