import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchArticles } from "../api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import './TopicArticlesPage.css';
import NavBar from "./NavBar";

function TopicArticlesPage() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const topic = queryParams.get("topic");

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles(topic)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [topic]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="articles-page">
      <NavBar />
      <header>
        <h1 className="h1">{topic ? `Articles about ${topic}` : "All Articles"}</h1>
      </header>
      <section>
        <ul className="articles-list">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        ) : (
          <p>No articles found{topic && ` for topic: ${topic}`}</p>
        )}
      </ul>
      </section>
    </div>
  );
}

export default TopicArticlesPage;
