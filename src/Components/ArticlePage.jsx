import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId, postCommentToArticle, updateArticleVotes, deleteCommentById } from "../api";
import './ArticlePage.css'
import CommentCard from "./CommentCard";
import Loading from "./Loading";

const loggedInUser = 'tickle122'

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [voteChange, setVoteChange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
      console.log("Use Effect article page!");
    Promise.all([fetchArticleById(article_id), fetchCommentsByArticleId(article_id)])
      .then(([articleFromApi, commentsFromApi]) => {
        
        setArticle(articleFromApi);
        setComments(commentsFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [article_id]);

  const handleVote = (inc_votes) => {
    if(hasVoted) return;
    setVoteChange((currentVoteChange) => currentVoteChange + inc_votes);
    setHasVoted(true);
    updateArticleVotes(article_id, inc_votes)
    .catch((err) =>{
        setVoteChange((currentVoteChange) => currentVoteChange - inc_votes);
        setError("Failed to update vote, please try again")
        setHasVoted(false);
    })
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if(newComment.trim() === '') {
        setCommentError("Comment must not be empty!")
        return;
    }

    const optimisticComment = {
        comment_id: Date.now(),
        author: loggedInUser,
        body: newComment,
        created_at: new Date().toISOString(),
        deleting: false,
    }

   setComments((currentComments) => [optimisticComment, ...currentComments]);
   setNewComment('');
   setPosting(true);
   setCommentError(null);

   postCommentToArticle(article_id, {username: loggedInUser, body: newComment})
   .then((postedComment) => {
    setComments((currentComments) =>
    currentComments.map((comment) =>
    comment.comment_id === optimisticComment.comment_id ? postedComment : comment))

    setPosting(false);
   })
   .catch((err) => {
    setComments((currentComments) =>
    currentComments.filter((comment) => comment.comment_id !== optimisticComment.comment_id));
    setCommentError("Sorry! Comment failed to post. Please have another go");
    setPosting(false);
   })
  }

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
    <div className="article-page">
      <header className="article-page-header">
        <h1>{article.title}</h1>
        <p>By {article.author}</p>
        <p>{new Date(article.created_at).toLocaleDateString()}</p>
      </header>
      <img
        src={article.article_img_url}
        alt={article.title}
        className="article-page-img"
      />
      <section className="article-page-content">
        <p>{article.body}</p>
      </section>
      <section className="article-votes">
        <h2 className="h2">Votes: {article.votes + voteChange}</h2>
        <button onClick={() => handleVote(1)} disabled={hasVoted}>Like</button>
        <button onClick={() => handleVote(-1)} disabled={hasVoted}>Dislike</button>
      </section>
      {error && <p className="error-message">{error}</p>}
      <section className="comments-section">
        <h2 className="h2">Comments:</h2>
        <form onSubmit={handleCommentSubmit}>
            <textarea  
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            placeholder="Please comment here..."
            disabled={ posting } 
            />
            <button type="submit" disabled={posting}>Post comment</button>
        </form>
        {comments.length > 0 ? (
            comments.map((comment) => (
                <CommentCard key={comment.comment_id} comment={comment} handleDeleteComment={handleDeleteComment} loggedInUser={loggedInUser} />
            ))
        ) :(
            <p>Be the first to comment!</p>
        )}

      </section>
    </div>
  );
}

export default ArticlePage;
