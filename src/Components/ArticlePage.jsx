import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, updateArticleVotes } from "../api";
import './ArticlePage.css';
import Loading from "./Loading";
import Comments from "./Comments";
import NavBar from "./NavBar";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [voteChange, setVoteChange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((articleFromApi) => {
        setArticle(articleFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [article_id]);

  const handleVote = (inc_votes) => {
    if (hasVoted) return;
    setVoteChange((currentVoteChange) => currentVoteChange + inc_votes);
    setHasVoted(true);
    updateArticleVotes(article_id, inc_votes)
      .catch((err) => {
        setVoteChange((currentVoteChange) => currentVoteChange - inc_votes);
        setError("Failed to update vote, please try again");
        setHasVoted(false);
      });
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="article-page">
      <NavBar />
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
      <Comments article_id={article_id} /> 
    </div>
  );
}

export default ArticlePage;

