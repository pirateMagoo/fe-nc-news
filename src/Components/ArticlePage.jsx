import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api";
import './ArticlePage.css'


function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      console.log("Use Effect article page!");
    fetchArticleById(article_id)
      .then((articleFromApi) => {
        console.log(articleFromApi, "<---- article from api in use effect")
        setArticle(articleFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [article_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>No article found</p>;

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
    </div>
  );
}

export default ArticlePage;
