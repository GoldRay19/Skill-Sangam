import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";
import { isBusinessEmail } from "../../utils/validators";
export default function Register() {
  const [params] = useSearchParams();
  const role = params.get("role") === "employer" ? "employer" : "student";
  const { register } = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({ role, name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (form.role === "employer" && !isBusinessEmail(form.email))
      return setError(
        "Use a work email; Gmail, Yahoo, Outlook, and Hotmail are not accepted.",
      );
    try {
      await register(form);
      nav(form.role === "employer" ? "/employer/verify" : "/student");
    } catch (err) {
      setError(err.message);
      toast(err.message, "error");
    }
  };
  return (
    <div className="auth-page">
      <form className="form-card" onSubmit={submit}>
        <h1>Create your account</h1>
        <div className="toggle">
          <button
            type="button"
            className={form.role === "student" ? "active" : ""}
            onClick={() => setForm({ ...form, role: "student" })}
          >
            Student
          </button>
          <button
            type="button"
            className={form.role === "employer" ? "active" : ""}
            onClick={() => setForm({ ...form, role: "employer" })}
          >
            Employer
          </button>
        </div>
        <label>
          Full name
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          {form.role === "employer" ? "Work email" : "Email"}
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            minLength="6"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="button full">Create account</button>
        <p>
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
