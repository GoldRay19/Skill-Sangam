import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApplications } from "../../api/applications";
import { useAuth } from "../../context/AuthContext";
import Skeleton from "../../components/Skeleton";
import EmptyState from "../../components/EmptyState";
import Badge from "../../components/Badge";
export default function Applications() {
  const { user } = useAuth();
  const [state, setState] = useState({ loading: true, data: [], error: "" });
  useEffect(() => {
    getApplications({ studentId: user.id })
      .then((r) => setState({ loading: false, data: r.data, error: "" }))
      .catch((e) => setState({ loading: false, data: [], error: e.message }));
  }, []);
  if (state.loading) return <Skeleton rows={4} />;
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">STUDENT WORKSPACE</div>
          <h1>My applications</h1>
        </div>
      </div>
      {state.error ? (
        <div className="error-box">{state.error}</div>
      ) : !state.data.length ? (
        <EmptyState title="No applications yet">
          <Link to="/student">Browse internships to get started.</Link>
        </EmptyState>
      ) : (
        <div className="list-card">
          {state.data.map((a) => (
            <div className="list-row" key={a.id}>
              <div>
                <h3>{a.internship?.title}</h3>
                <p className="muted">
                  {a.internship?.company || "Startup"} ·{" "}
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge>{a.status}</Badge>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
