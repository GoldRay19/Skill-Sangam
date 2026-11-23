import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../api/auth";
import { getReports } from "../../api/reports";
import { getInternships } from "../../api/internships";
import Skeleton from "../../components/Skeleton";
export default function Dashboard() {
  const [counts, setCounts] = useState(null);
  useEffect(() => {
    Promise.all([getUsers(), getReports(), getInternships()]).then(
      ([u, r, i]) =>
        setCounts({
          pending: u.data.filter(
            (x) => x.role === "employer" && x.verificationStatus === "pending",
          ).length,
          active: u.data.filter(
            (x) => x.role === "employer" && x.verificationStatus === "approved",
          ).length,
          reports: r.data.filter((x) => x.status === "Open").length,
          internships: i.data.filter((x) => x.status === "open").length,
        }),
    );
  }, []);
  if (!counts) return <Skeleton rows={4} />;
  const cards = [
    ["Pending employers", counts.pending, "/admin/verifications"],
    ["Open reports", counts.reports, "/admin/reports"],
    ["Active employers", counts.active, "/admin/employers"],
    ["Open internships", counts.internships, "/admin"],
  ];
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">ADMIN WORKSPACE</div>
          <h1>Platform dashboard</h1>
          <p>A focused view of trust and marketplace activity.</p>
        </div>
        <Link className="button" to="/admin/verifications">
          Review employers
        </Link>
      </div>
      <div className="stats-grid admin-stats">
        {cards.map(([label, value, to]) => (
          <Link className="stat-card" to={to} key={label}>
            <b>{value}</b>
            <span>{label} →</span>
          </Link>
        ))}
      </div>
    </>
  );
}
