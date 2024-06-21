import React, { useEffect, useState, useContext } from 'react';
import { fetchCommentsByArticleId, postCommentToArticle, deleteCommentById } from '../api';
import CommentCard from './CommentCard';
import Loading from './Loading';
import './Comments.css'; 
import { UserContext } from '../UserContext'



function Comments({ article_id }) {
  const { currentUser } = useContext(UserContext);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    fetchCommentsByArticleId(article_id)
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg || 'An error occured');
        setLoading(false);
      });
  }, [article_id]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === '') {
      setCommentError("Comment must not be empty!");
      return;
    }

    const optimisticComment = {
      comment_id: Date.now(),
      author: currentUser.username,
      body: newComment,
      created_at: new Date().toISOString(),
      deleting: false,
    };

    setComments((currentComments) => [optimisticComment, ...currentComments]);
    setNewComment('');
    setPosting(true);
    setCommentError(null);

    postCommentToArticle(article_id, { username: currentUser.username, body: newComment })
      .then((postedComment) => {
        setComments((currentComments) =>
          currentComments.map((comment) =>
            comment.comment_id === optimisticComment.comment_id ? postedComment : comment
          )
        );
        setPosting(false);
      })
      .catch((err) => {
        setComments((currentComments) =>
          currentComments.filter((comment) => comment.comment_id !== optimisticComment.comment_id)
        );
        setCommentError("Sorry! Comment failed to post. Please have another go");
        setPosting(false);
      });
  };

  const handleDeleteComment = (comment_id) => {
    setComments((currentComments) =>
      currentComments.map((comment) =>
        comment.comment_id === comment_id ? { ...comment, deleting: true } : comment
      )
    );

    deleteCommentById(comment_id)
      .then(() => {
        setComments((currentComments) =>
          currentComments.filter((comment) => comment.comment_id !== comment_id)
        );
      })
      .catch((err) => {
        setError("Failed to delete comment, please try again");
        setComments((currentComments) =>
          currentComments.map((comment) =>
            comment.comment_id === comment_id ? { ...comment, deleting: false } : comment
          )
        );
      });
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="comments-section">
      <h2 className="h2">Comments:</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="Please comment here..."
          disabled={posting}
        />
        <button type="submit" disabled={posting}>Post comment</button>
      </form>
      {commentError && <p className="error-message">{commentError}</p>}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            handleDeleteComment={handleDeleteComment}
            loggedInUser={currentUser.username}
          />
        ))
      ) : (
        <p>Be the first to comment!</p>
      )}
    </section>
  );
}

export default Comments;
