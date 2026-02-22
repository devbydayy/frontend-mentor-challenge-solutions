import React, { useState } from "react";


export default function CommentForm({
  currentUser,
  placeholder = "Add a comment...",
  btnText = "SEND",
  onAddComment,
  defaultValue = "",
  small = false
}) {
  const [text, setText] = useState(defaultValue);

  const submit = (e) => {
    e && e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddComment(trimmed);
    setText("");
  };

  return (
    <form className={`comment-form ${small ? "small" : ""}`} onSubmit={submit}>
      {currentUser && (
        <img className="form-avatar" src={currentUser.image.png} alt={`${currentUser.username} avatar`} />
      )}
      <textarea
        className="comment-input"
        placeholder={placeholder}
        value={text}
        onChange={e => setText(e.target.value)}
        rows={small ? 2 : 3}
        aria-label={placeholder}
      />
      <button type="submit" className="primary-btn">{btnText}</button>
    </form>
  );
}

