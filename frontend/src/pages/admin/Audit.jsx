import { useEffect, useState } from "react";
import { getAuditLog } from "../../api/audit";
import Skeleton from "../../components/Skeleton";
import EmptyState from "../../components/EmptyState";
export default function Audit() {
  const [state, setState] = useState(null);
  useEffect(() => {
    getAuditLog().then((r) => setState(r.data));
  }, []);
  if (!state) return <Skeleton rows={4} />;
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">ADMIN WORKSPACE</div>
          <h1>Audit log</h1>
          <p>Every administrative decision is recorded here.</p>
        </div>
      </div>
      {!state.length ? (
        <EmptyState>No admin actions have been recorded yet.</EmptyState>
      ) : (
        <div className="list-card">
          {state.map((entry) => (
            <div className="list-row" key={entry.id}>
              <div>
                <h3>{entry.action}</h3>
                <p className="muted">
                  Target: {entry.target} · Actor: {entry.actor}
                </p>
              </div>
              <time>{new Date(entry.createdAt).toLocaleString()}</time>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
