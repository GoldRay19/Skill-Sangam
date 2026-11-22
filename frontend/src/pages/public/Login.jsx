import { useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";

const roleDetails = {
  student: {
    label: "Student",
    title: "Continue your learning journey",
    description: "Sign in to discover projects and turn your skills into proof.",
    emailLabel: "Email",
  },
  employer: {
    label: "Employer",
    title: "Find your next contributor",
    description: "Sign in to create focused projects and meet emerging talent.",
    emailLabel: "Work email",
  },
  admin: {
    label: "Admin",
    title: "Manage the SkillSangam platform",
    description: "Sign in to review employers, reports, and platform activity.",
    emailLabel: "Admin email",
  },
};

export default function Login() {
  const { user, login } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const requestedRole = params.get("role");
  const role = roleDetails[requestedRole] ? requestedRole : "student";
  const details = roleDetails[role];
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const selectRole = (nextRole) => {
    setError("");
    setParams({ role: nextRole });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const loggedIn = await login(form.email, form.password, role);
      nav(location.state?.from?.pathname || `/${loggedIn.role}`);
    } catch (err) {
      setError(err.message);
      toast(err.message, "error");
    }
  };
  if (user) return <Navigate to={`/${user.role}`} replace />;
  return (
    <div className={`auth-page auth-${role}`}>
      <form className="form-card" onSubmit={submit}>
        <div className="auth-heading">
          <span className="auth-kicker">{details.label} profile</span>
          <h1>{details.title}</h1>
          <p>{details.description}</p>
        </div>
        <div className="toggle role-toggle" aria-label="Choose profile">
          {Object.entries(roleDetails).map(([key, value]) => (
            <button
              key={key}
              type="button"
              className={role === key ? "active" : ""}
              onClick={() => selectRole(key)}
            >
              {value.label}
            </button>
          ))}
        </div>
        <label>
          {details.emailLabel}
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
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="button full">Log in</button>
        <small>Use the credentials associated with your account.</small>
        <p>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
