import React from "react";
import "./CommentCard.css";

function CommentCard({ comment, handleDeleteComment, loggedInUser }) {
  return (
    <section className="comment-card">
      <p className="comment-author">
        <strong>{comment.author}</strong>
      </p>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-date">
        {new Date(comment.created_at).toLocaleDateString()}
      </p>
      {comment.author === loggedInUser && (
        <button
          onClick={() => handleDeleteComment(comment.comment_id)}
          disabled={comment.deleting}
        >
          {comment.deleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </section>
  );
}

export default CommentCard;
