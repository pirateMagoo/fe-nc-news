
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from './NavBar';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import SortControls from './SortControls';  
import { fetchArticles } from '../api';
import './HomePage.css';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const sort_by = searchParams.get('sort_by') || 'created_at';
  const order = searchParams.get('order') || 'desc';

  useEffect(() => {
    fetchArticles(null, sort_by, order)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [sort_by, order]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <header className="home-page-header">
        <h1 className="homepage-title">Welcome to NC-News</h1>
        <NavBar />
      </header>
      <main>
        <SortControls /> 
        <ul className="articles-container">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))
          ) : (
            <p>No articles found</p>
          )}
        </ul>
      </main>
    </>
  );
}

export default HomePage;

