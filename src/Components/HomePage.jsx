import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { fetchArticles } from "../api";
import './HomePage.css'
import NavBar from "./NavBar";
import ArticleCard from "./ArticleCard";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(articles, "homepage");
  useEffect(() => {
    fetchArticles()
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
        setLoading(false);
        console.log("Use Effect!");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <header className="home-page-header">
        <h1 className="homepage-title">Welcome to NC-News</h1>
        <NavBar />
      </header>
      <main>
        <ul className="articles-container">
          {articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </ul>
      </main>
    </>
  );
}

export default HomePage;
