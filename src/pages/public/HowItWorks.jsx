import { useState } from "react";
export default function HowItWorks() {
  const [tab, setTab] = useState("student");
  const student = [
    "Create a focused profile",
    "Find a paid project that fits",
    "Build for two weeks and grow your proof",
  ];
  const employer = [
    "Describe a real project",
    "Review emerging talent",
    "Ship outcomes with milestone clarity",
  ];
  const steps = tab === "student" ? student : employer;
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">HOW IT WORKS</div>
          <h1>Small projects, clear outcomes.</h1>
          <p>
            Every SkillSangam opportunity is paid, scoped to two weeks, and
            based on real startup work.
          </p>
        </div>
      </div>
      <div className="toggle">
        <button
          className={tab === "student" ? "active" : ""}
          onClick={() => setTab("student")}
        >
          For students
        </button>
        <button
          className={tab === "employer" ? "active" : ""}
          onClick={() => setTab("employer")}
        >
          For startups
        </button>
      </div>
      <div className="steps large-steps">
        {steps.map((step, index) => (
          <div key={step}>
            <b>0{index + 1}</b>
            <h2>{step}</h2>
            <p>
              {tab === "student"
                ? "Use the workspace to move from interest to demonstrable experience."
                : "Use structured listings and applicant actions to keep hiring focused."}
            </p>
          </div>
        ))}
      </div>
      <div className="rule-card">
        <b>Paid · 2 weeks · Real projects</b>
        <p>The simple rule behind every micro-internship on the platform.</p>
      </div>
    </>
  );
}
