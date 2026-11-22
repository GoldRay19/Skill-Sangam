import { useState } from "react";
import { updateUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";
import TagInput from "../../components/TagInput";
import { fetchGithubSkills } from "../../utils/github";
export default function Profile() {
  const { user, setUser } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({
    name: user.name,
    college: user.college || "",
    bio: user.bio || "",
    skills: user.skills || [],
    github: user.github || "",
  });
  const [consent, setConsent] = useState(false);
  const [detected, setDetected] = useState([]);
  const [loading, setLoading] = useState(false);
  const save = async (e) => {
    e.preventDefault();
    const { data } = await updateUser(user.id, form);
    setUser(data);
    toast("Profile saved.");
  };
  const fetchSkills = async () => {
    if (!consent)
      return toast("Check the consent box before connecting GitHub.", "error");
    if (!form.github.trim())
      return toast("Enter a GitHub username first.", "error");
    setLoading(true);
    try {
      setDetected(await fetchGithubSkills(form.github));
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">STUDENT WORKSPACE</div>
          <h1>Your profile</h1>
          <p>Give startups the context they need to see your potential.</p>
        </div>
      </div>
      <form className="form-card wide" onSubmit={save}>
        <label>
          Name
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          College
          <input
            value={form.college}
            onChange={(e) => setForm({ ...form, college: e.target.value })}
          />
        </label>
        <label>
          Bio
          <textarea
            rows="4"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </label>
        <label>
          Skills
          <TagInput
            value={form.skills}
            onChange={(skills) => setForm({ ...form, skills })}
          />
        </label>
        <section className="github-box">
          <h2>GitHub skills</h2>
          <p>We only call GitHub after you give consent.</p>
          <label>
            GitHub username
            <input
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              placeholder="octocat"
            />
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />{" "}
            Allow Skill-Sangam to read my public repositories to suggest
            internships
          </label>
          <button
            type="button"
            className="button secondary"
            onClick={fetchSkills}
            disabled={loading}
          >
            {loading ? "Fetching…" : "Fetch my skills"}
          </button>
          {detected.length > 0 && (
            <div className="detected">
              <p>Detected skills — click to add:</p>
              <div className="chips">
                {detected.map((s) => (
                  <button
                    type="button"
                    className="chip"
                    key={s}
                    onClick={() =>
                      !form.skills.includes(s) &&
                      setForm({ ...form, skills: [...form.skills, s] })
                    }
                  >
                    {s} +
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
        <button className="button">Save profile</button>
      </form>
    </>
  );
}
