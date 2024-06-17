import React from 'react';
import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
  return (
    <li className="article-card">
      <Link to={`/articles/${article.article_id}`}>
        <img src={article.article_img_url} alt={article.title} className="article-card-img" />
        <div className="article-card-content">
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{new Date(article.created_at).toLocaleDateString()}</p>
        </div>
      </Link>
    </li>
  );
}

export default ArticleCard;