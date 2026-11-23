import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";
export default function Account() {
  const { user, setUser, logout } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const save = async (e) => {
    e.preventDefault();
    const patch = { name };
    if (password) patch.password = password;
    const { data } = await updateUser(user.id, patch);
    setUser(data);
    setPassword("");
    toast("Account updated.");
  };
  const signOut = async () => {
    await logout();
    nav("/");
  };
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">ACCOUNT SETTINGS</div>
          <h1>Your account</h1>
          <p>Manage your identity and session.</p>
        </div>
      </div>
      <form className="form-card wide" onSubmit={save}>
        <label>
          Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email
          <input value={user.email} readOnly />
        </label>
        <label>
          New password
          <input
            type="password"
            minLength="6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
          />
        </label>
        <button className="button">Save changes</button>
        <button type="button" className="text-button" onClick={signOut}>
          Log out
        </button>
      </form>
    </>
  );
}
