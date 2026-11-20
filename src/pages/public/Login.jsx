import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";
export default function Login() {
  const { user, login } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const loggedIn = await login(form.email, form.password);
      nav(location.state?.from?.pathname || `/${loggedIn.role}`);
    } catch (err) {
      setError(err.message);
      toast(err.message, "error");
    }
  };
  if (user) return <Navigate to={`/${user.role}`} replace />;
  return (
    <div className="auth-page">
      <form className="form-card" onSubmit={submit}>
        <h1>Welcome back</h1>
        <p>Use a demo account or your registered credentials.</p>
        <label>
          Email
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
        <small>Demo: admin@skillsangam.dev / admin123</small>
        <p>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
