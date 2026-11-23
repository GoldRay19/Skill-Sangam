import { useState } from "react";
import { updateUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";
import Verification from "./Verification";

export default function CompanyProfile() {
  const { user, setUser } = useAuth();
  const toast = useToast();
  const [section, setSection] = useState("details");
  const [form, setForm] = useState({
    companyName: user.companyName || "",
    website: user.website || "",
    linkedin: user.linkedin || "",
    registrationType: user.registrationType || "CIN",
    registrationNumber: user.registrationNumber || "",
  });
  const save = async (e) => {
    e.preventDefault();
    const { data } = await updateUser(user.id, {
      ...form,
      ...(user.verificationStatus === "rejected"
        ? { verificationStatus: "pending", rejectionReason: "" }
        : {}),
    });
    setUser(data);
    toast(
      user.verificationStatus === "rejected"
        ? "Details resubmitted for review."
        : "Company profile updated.",
    );
  };
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">EMPLOYER WORKSPACE</div>
          <h1>Company profile</h1>
          <p>Review the details submitted for verification.</p>
        </div>
      </div>
      <div className="toggle" role="tablist" aria-label="Employer profile sections">
        <button
          type="button"
          className={section === "details" ? "active" : ""}
          onClick={() => setSection("details")}
        >
          Company details
        </button>
        <button
          type="button"
          className={section === "verification" ? "active" : ""}
          onClick={() => setSection("verification")}
        >
          Verification
        </button>
      </div>
      {section === "verification" ? (
        <Verification embedded />
      ) : (
        <>
      {user.verificationStatus === "rejected" && (
        <div className="banner error-box">
          Rejected: {user.rejectionReason || "Please update your details."}
        </div>
      )}
      <form className="form-card wide" onSubmit={save}>
        <label>
          Company name
          <input
            required
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          />
        </label>
        <label>
          Website
          <input
            type="url"
            required
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </label>
        <label>
          LinkedIn URL
          <input
            type="url"
            required
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          />
        </label>
        <div className="two-col">
          <label>
            Registration type
            <select
              value={form.registrationType}
              onChange={(e) =>
                setForm({ ...form, registrationType: e.target.value })
              }
            >
              <option>CIN</option>
              <option>GSTIN</option>
              <option>Udyam</option>
            </select>
          </label>
          <label>
            Registration number
            <input
              value={form.registrationNumber}
              onChange={(e) =>
                setForm({ ...form, registrationNumber: e.target.value })
              }
            />
          </label>
        </div>
        <button className="button">
          {user.verificationStatus === "rejected"
            ? "Resubmit details"
            : "Save company profile"}
        </button>
      </form>
        </>
      )}
    </>
  );
}
