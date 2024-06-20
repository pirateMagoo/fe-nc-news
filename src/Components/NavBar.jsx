import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchTopics } from '../api';
import Loading from './Loading';
import './NavBar.css'; 

function NavBar() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics()
      .then((topicsFromApi) => {
        setTopics(topicsFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleTopicChange = (event) => {
    const topic = event.target.value;
    setSelectedTopic(topic);
    if (topic) {
      navigate(`/articles?topic=${topic}`);
    } else {
      navigate(`/articles`);
    }
  };

  return (
    <nav>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/articles">All Articles</Link>
        <Link to="/topics">Topics</Link>
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : error ? (
          <p>Error loading topics</p>
        ) : (
          <select value={selectedTopic} onChange={handleTopicChange}>
            <option value="" disabled>Select a topic</option>
            {topics.map((topic) => (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            ))}
          </select>
        )}
      </div>
    </nav>
  );
}

export default NavBar;


