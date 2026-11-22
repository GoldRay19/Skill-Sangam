import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getEmployerInternships,
  updateInternship,
} from "../../api/internships";
import { getApplications } from "../../api/applications";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";
import Badge from "../../components/Badge";
import Skeleton from "../../components/Skeleton";
import EmptyState from "../../components/EmptyState";
export default function Home() {
  const { user } = useAuth();
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [counts, setCounts] = useState({});
  useEffect(() => {
    Promise.all([
      getEmployerInternships(user.id),
      getApplications({ employerId: user.id }),
    ]).then(([i, a]) => {
      setItems(i.data);
      const c = {};
      a.data.forEach((x) => {
        c[x.internshipId] = (c[x.internshipId] || 0) + 1;
      });
      setCounts(c);
    });
  }, []);
  const close = async (id) => {
    await updateInternship(id, { status: "closed" });
    setItems(items.map((i) => (i.id === id ? { ...i, status: "closed" } : i)));
    toast("Internship closed.");
  };
  const blocked = user.verificationStatus !== "approved";
  if (!items) return <Skeleton rows={4} />;
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">EMPLOYER WORKSPACE</div>
          <h1>My internships</h1>
          <p>Post focused projects and find emerging talent.</p>
        </div>
        <Link
          className={`button ${blocked ? "disabled" : ""}`}
          to={blocked ? "/employer/verify" : "/employer/internships/new"}
          title={blocked ? "Complete approval before posting" : ""}
        >
          Post internship
        </Link>
      </div>
      <div className={`status-banner ${user.verificationStatus}`}>
        Status:{" "}
        <b>
          {user.verificationStatus === "approved"
            ? "Approved"
            : user.verificationStatus === "rejected"
              ? "Rejected"
              : user.verificationStatus === "suspended"
                ? "Suspended"
                : "Pending review"}
        </b>
        {blocked && (
          <Link to="/employer/verify">
            {user.verificationStatus === "rejected"
              ? "Resubmit details"
              : "View verification"}
          </Link>
        )}
      </div>
      {!items.length ? (
        <EmptyState title="No internships yet">
          {blocked ? (
            "Complete verification before creating your first listing."
          ) : (
            <Link to="/employer/internships/new">
              Post your first internship.
            </Link>
          )}
        </EmptyState>
      ) : (
        <div className="list-card">
          {items.map((i) => (
            <div className="list-row" key={i.id}>
              <div>
                <h3>{i.title}</h3>
                <p className="muted">
                  ₹{i.stipend.toLocaleString("en-IN")} · {counts[i.id] || 0}{" "}
                  applicants · starts {i.startDate}
                </p>
              </div>
              <Badge>{i.status === "open" ? "Open" : "Closed"}</Badge>
              <div className="row-actions">
                <Link
                  className="text-button"
                  to={`/employer/internships/${i.id}/applicants`}
                >
                  Applicants
                </Link>
                {i.status === "open" && !counts[i.id] && (
                  <Link
                    className="text-button"
                    to={`/employer/internships/${i.id}/edit`}
                  >
                    Edit
                  </Link>
                )}
                {i.status === "open" && (
                  <button className="text-button" onClick={() => close(i.id)}>
                    Close
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
