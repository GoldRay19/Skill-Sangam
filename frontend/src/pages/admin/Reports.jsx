import { useEffect, useState } from "react";
import { getReports, updateReport } from "../../api/reports";
import { suspendEmployer } from "../../api/employers";
import { useToast } from "../../components/Toast";
import Badge from "../../components/Badge";
import Skeleton from "../../components/Skeleton";
export default function Reports() {
  const [reports, setReports] = useState(null);
  const [tab, setTab] = useState("Open");
  const toast = useToast();
  const load = () => getReports().then((r) => setReports(r.data));
  useEffect(() => {
    load();
  }, []);
  const dismiss = async (r) => {
    await updateReport(r.id, "Dismissed");
    toast("Report dismissed.");
    load();
  };
  const suspend = async (r) => {
    if (
      !window.confirm("Suspend this employer and close their open internships?")
    )
      return;
    await suspendEmployer(r.employerId);
    await updateReport(r.id, "Employer suspended");
    toast("Employer suspended and internships closed.");
    load();
  };
  if (!reports) return <Skeleton rows={4} />;
  const visible = reports.filter(
    (report) => tab === "All" || report.status === tab,
  );
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">ADMIN WORKSPACE</div>
          <h1>Reports</h1>
          <p>Review student concerns and take clear action.</p>
        </div>
      </div>
      <div className="toggle report-tabs">
        <button
          className={tab === "Open" ? "active" : ""}
          onClick={() => setTab("Open")}
        >
          Open
        </button>
        <button
          className={tab === "Dismissed" ? "active" : ""}
          onClick={() => setTab("Dismissed")}
        >
          Dismissed
        </button>
        <button
          className={tab === "All" ? "active" : ""}
          onClick={() => setTab("All")}
        >
          All
        </button>
      </div>
      {!visible.length ? (
        <div className="empty">No reports yet.</div>
      ) : (
        <div className="stack">
          {visible.map((r) => (
            <div className="card report" key={r.id}>
              <div className="card-top">
                <Badge>{r.status}</Badge>
                <span className="muted">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h2>{r.employer}</h2>
              <p className="muted">
                {r.internship} · {r.reason}
              </p>
              <p>{r.details}</p>
              {r.status === "Open" && (
                <div className="row-actions">
                  <button className="text-button" onClick={() => dismiss(r)}>
                    Dismiss
                  </button>
                  <button
                    className="button danger small"
                    onClick={() => suspend(r)}
                  >
                    Suspend employer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
