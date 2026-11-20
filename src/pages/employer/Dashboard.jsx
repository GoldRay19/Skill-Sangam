import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApplications } from "../../api/applications";
import { getEmployerInternships } from "../../api/internships";
import { useAuth } from "../../context/AuthContext";
import Badge from "../../components/Badge";
import Skeleton from "../../components/Skeleton";
export default function Dashboard() {
  const { user } = useAuth();
  const [state, setState] = useState(null);
  useEffect(() => {
    Promise.all([
      getEmployerInternships(user.id),
      getApplications({ employerId: user.id }),
    ]).then(([i, a]) => setState({ internships: i.data, apps: a.data }));
  }, [user.id]);
  if (!state) return <Skeleton rows={4} />;
  const blocked = user.verificationStatus !== "approved";
  const next = !user.emailVerified
    ? "Verify email"
    : !user.companyName
      ? "Submit details"
      : user.verificationStatus === "pending"
        ? "Awaiting review"
        : user.verificationStatus === "rejected"
          ? "Resubmit details"
          : "Approved";
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">EMPLOYER WORKSPACE</div>
          <h1>{user.companyName || "Your employer dashboard"}</h1>
          <p>Move real projects forward with emerging talent.</p>
        </div>
        <Link
          className={`button ${blocked ? "disabled" : ""}`}
          to={blocked ? "/employer/verify" : "/employer/internships/new"}
          title={
            blocked ? "Complete verification before posting" : "Post internship"
          }
        >
          Post internship
        </Link>
      </div>
      <div className={`status-banner ${user.verificationStatus}`}>
        <div>
          <b>Verification: {next}</b>
          <p>
            {blocked
              ? "Complete the next verification step before posting."
              : "Your employer account can publish internships."}
          </p>
        </div>
        <Link to="/employer/verify">Open verification</Link>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <b>{state.internships.filter((i) => i.status === "open").length}</b>
          <span>Open internships</span>
        </div>
        <div className="stat-card">
          <b>{state.apps.filter((a) => a.status === "Applied").length}</b>
          <span>New applicants</span>
        </div>
      </div>
      <section>
        <div className="section-title">
          <h2>Recent internships</h2>
          <Link to="/employer/internships">Manage all</Link>
        </div>
        {state.internships.length ? (
          <div className="list-card">
            {state.internships.slice(0, 3).map((i) => (
              <div className="list-row" key={i.id}>
                <div>
                  <h3>{i.title}</h3>
                  <p className="muted">
                    {i.openings} openings ·{" "}
                    {state.apps.filter((a) => a.internshipId === i.id).length}{" "}
                    applicants
                  </p>
                </div>
                <Badge>{i.status}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            No internships yet.{" "}
            <Link to="/employer/internships/new">Post your first project.</Link>
          </div>
        )}
      </section>
    </>
  );
}
