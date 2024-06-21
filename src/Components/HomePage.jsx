
import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from './NavBar';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import SortControls from './SortControls';  
import { fetchArticles } from '../api';
import './HomePage.css';
import SwitchUser from './SwitchUser';
import { UserContext } from '../UserContext';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const { currentUser } = useContext(UserContext);

  const sort_by = searchParams.get('sort_by') || 'created_at';
  const order = searchParams.get('order') || 'desc';

  useEffect(() => {
    fetchArticles(null, sort_by, order)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg || "An error occured");
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
        <SwitchUser />
        {currentUser && (
          <div className='current-user'>
            <img src={currentUser.avatar_url} alt={currentUser.name} className="user-avatar" />
            <p>{currentUser.name}</p>
          </div>
        )}
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

