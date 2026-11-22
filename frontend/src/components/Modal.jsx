import { X } from "lucide-react";
export default function Modal({ title, onClose, children }) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="icon-button modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <h2 id="modal-title">{title}</h2>
        {children}
      </section>
    </div>
  );
}
