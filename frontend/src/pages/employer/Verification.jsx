import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/auth";
import { submitVerification } from "../../api/employers";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";
import { registrationValid } from "../../utils/validators";
export default function Verification({ embedded = false }) {
  const { user, setUser } = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [verified, setVerified] = useState(user.emailVerified);
  const [form, setForm] = useState({
    companyName: user.companyName || "",
    website: user.website || "",
    linkedin: user.linkedin || "",
    registrationType: user.registrationType || "CIN",
    registrationNumber: user.registrationNumber || "",
    proof: "",
    proofName: "",
    proofType: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    if (!cooldown) return undefined;
    const timer = setInterval(
      () => setCooldown((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [cooldown]);
  const sendOtp = async () => {
    if (cooldown) return;
    const value = String(Math.floor(100000 + Math.random() * 900000));
    console.log("SkillSangam mock employer OTP:", value);
    localStorage.setItem("ss_phase1_otp", value);
    setSent(true);
    setCooldown(30);
    toast(`Dev mode OTP: ${value}`);
  };
  const checkOtp = async () => {
    if (otp !== localStorage.getItem("ss_phase1_otp"))
      return setError("Incorrect OTP.");
    const { data } = await updateUser(user.id, { emailVerified: true });
    setUser(data);
    setVerified(true);
    setError("");
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!verified) return setError("Verify your work email first.");
    if (!registrationValid(form.registrationType, form.registrationNumber))
      return setError(`Enter a valid ${form.registrationType}.`);
    if (!form.proof) return setError("Upload a proof document.");
    await submitVerification(user.id, form);
    setUser({ ...user, ...form, verificationStatus: "pending" });
    toast("Details submitted for review.");
    nav("/employer");
  };
  return (
    <>
      {!embedded && <div className="page-head">
        <div>
          <div className="eyebrow">EMPLOYER VERIFICATION</div>
          <h1>Verify your company</h1>
          <p>Complete these steps before posting an internship.</p>
        </div>
      </div>}
      {user.verificationStatus === "rejected" && (
        <div className="banner error-box">
          Rejected: {user.rejectionReason || "Please resubmit your details."}
        </div>
      )}
      <section className="form-card wide">
        <h2>1. Verify work email</h2>
        <p className="muted">Personal email domains are not accepted.</p>
        <div className="inline-form">
          <input value={user.email} disabled />
          <button
            type="button"
            className="button secondary"
            onClick={sendOtp}
            disabled={cooldown > 0}
            title={
              cooldown
                ? `Resend available in ${cooldown}s`
                : "Send a verification OTP"
            }
          >
            {cooldown
              ? `Resend in ${cooldown}s`
              : sent
                ? "Resend OTP"
                : "Send OTP"}
          </button>
        </div>
        {sent && (
          <div className="dev-banner">
            Dev mode: OTP was printed to the console and shown here.{" "}
            <button onClick={() => setSent(false)}>Dismiss</button>
          </div>
        )}
        <div className="inline-form">
          <input
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="button" className="button secondary" onClick={checkOtp}>
            Verify
          </button>
        </div>
        {verified && <p className="success">Work email verified.</p>}
        <hr />
        <h2>2. Company details</h2>
        <form onSubmit={submit}>
          <label>
            Company name
            <input
              required
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
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
                required
                value={form.registrationNumber}
                onChange={(e) =>
                  setForm({ ...form, registrationNumber: e.target.value })
                }
              />
            </label>
          </div>
          <label>
            Proof document
            <input
              type="file"
              required
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f && f.size <= 2 * 1024 * 1024) {
                  const reader = new FileReader();
                  reader.onload = () =>
                    setForm({
                      ...form,
                      proof: reader.result,
                      proofName: f.name,
                      proofType: f.type,
                    });
                  reader.readAsDataURL(f);
                } else if (f)
                  setError("Proof must be a PDF, JPG, or PNG under 2MB.");
              }}
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="button">Submit for review</button>
        </form>
      </section>
    </>
  );
}
