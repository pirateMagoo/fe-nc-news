import React from "react";
import './CommentCard.css';

function CommentCard({ comment }) {
    return (
        <section className="comment-card">
            <p className="comment-author">{comment.author}</p>
            <p className="comment-body">{comment.body}</p>
            <p className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</p>
        </section>
    )
}

export default CommentCard;