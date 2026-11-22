import { useState } from "react";
import { X } from "lucide-react";
export default function TagInput({ value, onChange, max = 20 }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const text = draft.trim();
    if (
      text &&
      value.length < max &&
      !value.some((v) => v.toLowerCase() === text.toLowerCase())
    )
      onChange([...value, text]);
    setDraft("");
  };
  return (
    <div className="tag-input">
      <div className="chips">
        {value.map((v) => (
          <span className="chip" key={v}>
            {v}
            <button
              type="button"
              onClick={() => onChange(value.filter((x) => x !== v))}
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          }
        }}
        onBlur={add}
        placeholder={
          value.length >= max ? `Maximum ${max}` : "Type and press Enter"
        }
        disabled={value.length >= max}
      />
    </div>
  );
}
