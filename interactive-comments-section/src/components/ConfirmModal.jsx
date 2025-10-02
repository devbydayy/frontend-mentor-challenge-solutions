import React from "react";

export default function ConfirmModal({ title, description, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal">
        <h3 id="modal-title">{title}</h3>
        <p className="modal-desc">{description}</p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>NO, CANCEL</button>
          <button className="btn-delete" onClick={onConfirm}>YES, DELETE</button>
        </div>
      </div>
    </div>
  );
}
