import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createInternship,
  getInternship,
  updateInternship,
} from "../../api/internships";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";
import TagInput from "../../components/TagInput";
export default function New() {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    title: "",
    description: "",
    deliverables: "",
    stipend: "",
    startDate: "",
    openings: 1,
    requiredSkills: [],
  });
  const [error, setError] = useState("");
  useEffect(() => {
    if (id)
      getInternship(id)
        .then(({ data }) =>
          setForm({
            title: data.title,
            description: data.description,
            deliverables: data.deliverables,
            stipend: data.stipend,
            startDate: data.startDate,
            openings: data.openings,
            requiredSkills: data.requiredSkills,
          }),
        )
        .catch((e) => setError(e.message));
  }, [id]);
  const submit = async (e) => {
    e.preventDefault();
    if (user.verificationStatus !== "approved")
      return setError("Only approved employers can post internships.");
    if (Number(form.stipend) < 2000)
      return setError("Stipend must be at least ₹2,000.");
    if (new Date(form.startDate) <= new Date())
      return setError("Start date must be in the future.");
    if (!form.requiredSkills.length)
      return setError("Add at least one required skill.");
    if (id)
      await updateInternship(id, {
        ...form,
        stipend: Number(form.stipend),
        openings: Number(form.openings),
      });
    else
      await createInternship({
        ...form,
        employerId: user.id,
        stipend: Number(form.stipend),
        openings: Number(form.openings),
      });
    toast(id ? "Internship updated." : "Internship posted.");
    nav("/employer");
  };
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">EMPLOYER WORKSPACE</div>
          <h1>{id ? "Edit internship" : "Post an internship"}</h1>
          <p>Keep the project clear, scoped, and achievable.</p>
        </div>
      </div>
      <form className="form-card wide" onSubmit={submit}>
        <label>
          Title
          <input
            required
            minLength="8"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>
        <label>
          Description
          <textarea
            required
            minLength="20"
            rows="5"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <label>
          Deliverables
          <textarea
            required
            rows="4"
            value={form.deliverables}
            onChange={(e) => setForm({ ...form, deliverables: e.target.value })}
          />
        </label>
        <label>
          Required skills
          <TagInput
            value={form.requiredSkills}
            onChange={(requiredSkills) => setForm({ ...form, requiredSkills })}
            max={8}
          />
        </label>
        <div className="two-col">
          <label>
            Stipend in INR
            <input
              type="number"
              min="2000"
              required
              value={form.stipend}
              onChange={(e) => setForm({ ...form, stipend: e.target.value })}
            />
          </label>
          <label>
            Start date
            <input
              type="date"
              required
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </label>
        </div>
        <div className="two-col">
          <label>
            Openings
            <input
              type="number"
              min="1"
              max="10"
              required
              value={form.openings}
              onChange={(e) => setForm({ ...form, openings: e.target.value })}
            />
          </label>
          <label>
            Duration
            <input value="2 weeks" disabled />
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="button">
          {id ? "Save changes" : "Publish internship"}
        </button>
      </form>
    </>
  );
}
