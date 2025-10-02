import React from "react";
import Comment from "./Comment";

export default function CommentList({ comments, currentUser, onAddReply, onUpdate, onDelete, onVote }) {
  return (
    <section aria-label="Comments" className="comment-list">
      {comments.map(comment => (
        <div key={comment.id} className="comment-block">
          <Comment
            comment={comment}
            currentUser={currentUser}
            onAddReply={onAddReply}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onVote={onVote}
          />
          { }
          {comment.replies && comment.replies.length > 0 && (
            <div className="replies">
              {comment.replies.map(reply => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  parentId={comment.id}
                  isReply
                  currentUser={currentUser}
                  onAddReply={onAddReply}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onVote={onVote}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
