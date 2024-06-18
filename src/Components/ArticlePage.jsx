import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId, updateArticleVotes } from "../api";
import './ArticlePage.css'
import CommentCard from "./CommentCard";
import Loading from "./Loading";


function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [voteChange, setVoteChange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setVoteChange((currentVoteChange) => currentVoteChange + inc_votes);
    updateArticleVotes(article_id, inc_votes)
    .catch((err) =>{
        setVoteChange((currentVoteChange) => currentVoteChange - inc_votes);
        setError("Failed to update vote, please try again")
    })
  }

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
        <button onClick={() => handleVote(1)}>Like</button>
        <button onClick={() => handleVote(-1)}>Dislike</button>
      </section>
      {error && <p className="error-message">{error}</p>}
      <section className="comments-section">
        <h2 className="h2">Comments:</h2>
        {comments.length > 0 ? (
            comments.map((comment) => (
                <CommentCard key={comment.comment_id} comment={comment} />
            ))
        ) :(
            <p>Be the first to comment!</p>
        )}

      </section>
    </div>
  );
}

export default ArticlePage;
