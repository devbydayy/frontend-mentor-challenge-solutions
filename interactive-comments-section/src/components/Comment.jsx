import React, { useState } from "react";
import CommentForm from "./CommentForm";
import ConfirmModal from "./ConfirmModal";
import Icon from "./Icon";

export default function Comment({
  comment,
  isReply = false,
  parentId = null,
  currentUser,
  onAddReply,
  onUpdate,
  onDelete,
  onVote
}) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmitReply = (text) => {
    onAddReply(parentId ?? comment.id, text, comment.user.username);
    setReplying(false);
  };

  const onSubmitEdit = (text) => {
    onUpdate(comment.id, text);
    setEditing(false);
  };

  const isOwn = comment.user.username === currentUser.username;

  return (
    <article className={isReply ? "comment reply" : "comment"}>
      <div className="vote-col" aria-hidden>
        <button
          className="vote-btn"
          aria-label="upvote"
          onClick={() => onVote(comment.id, 1)}
        >
          <Icon name="plus" alt="upvote" />
        </button>
        <div className="score">{comment.score}</div>
        <button
          className="vote-btn"
          aria-label="downvote"
          onClick={() => onVote(comment.id, -1)}
        >
          <Icon name="minus" alt="downvote" />
        </button>
      </div>

      <div className="main-col">
        <header className="comment-header">
          <img
            className="avatar"
            src={comment.user.image.png}
            alt={`${comment.user.username} avatar`}
          />
          <div className="meta">
            <span className="username">{comment.user.username}</span>
            {isOwn && <span className="you-pill">you</span>}
            <span className="time">{comment.createdAt}</span>
          </div>

          <div className="actions">
            {!isOwn && (
              <button
                className="reply-btn"
                onClick={() => setReplying(!replying)}
              >
                <Icon name="reply" alt="" /> Reply
              </button>
            )}
            {isOwn && (
              <>
                <button
                  className="delete-btn"
                  onClick={() => setShowConfirm(true)}
                >
                  <Icon name="delete" alt="" /> Delete
                </button>
                <button
                  className="edit-btn"
                  onClick={() => setEditing(!editing)}
                >
                  <Icon name="edit" alt="" /> Edit
                </button>
              </>
            )}
          </div>
        </header>

        {!editing ? (
          <div className="comment-body">
            {comment.replyingTo && (
              <span className="reply-to">@{comment.replyingTo} </span>
            )}
            {comment.content}
          </div>
        ) : (
          <CommentForm
            defaultValue={comment.content}
            btnText="UPDATE"
            onSubmit={onSubmitEdit}
            small
          />
        )}

        {replying && (
          <div className="reply-form">
            <CommentForm
              currentUser={currentUser}
              placeholder={`@${comment.user.username}`}
              btnText="REPLY"
              onSubmit={onSubmitReply}
            />
          </div>
        )}

        <div className="comment-footer">
          <div className="vote-col">
            <button
              className="vote-btn"
              aria-label="upvote"
              onClick={() => onVote(comment.id, 1)}
            >
              <Icon name="plus" alt="upvote" />
            </button>
            <div className="score">{comment.score}</div>
            <button
              className="vote-btn"
              aria-label="downvote"
              onClick={() => onVote(comment.id, -1)}
            >
              <Icon name="minus" alt="downvote" />
            </button>
          </div>

          <div className="actions">
            {!isOwn && (
              <button
                className="reply-btn"
                onClick={() => setReplying(!replying)}
              >
                <Icon name="reply" alt="" /> Reply
              </button>
            )}
            {isOwn && (
              <>
                <button
                  className="delete-btn"
                  onClick={() => setShowConfirm(true)}
                >
                  <Icon name="delete" alt="" /> Delete
                </button>
                <button
                  className="edit-btn"
                  onClick={() => setEditing(!editing)}
                >
                  <Icon name="edit" alt="" /> Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Delete comment"
          description="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            onDelete(comment.id);
            setShowConfirm(false);
          }}
        />
      )}
    </article>
  );
}
