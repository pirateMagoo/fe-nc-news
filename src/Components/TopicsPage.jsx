import { React, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../api";
import Loading from "./Loading";
import './TopicsPage.css';
import NavBar from "./NavBar";


function TopicsPage() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Use effect topics page firing!!!");
        fetchTopics()
        .then((topicsFromApi) => {
            setTopics(topicsFromApi)
            setLoading(false)
            
        })
        .catch((err) => {
            setError(err.response.data.msg)
            setLoading(false)
        })
    }, []);

    if(loading) return <Loading />
    if(error) return <p>Error: {error}</p>

    return(
        <div className="topics-page">
          <NavBar />
        <h1 className="h1">Topics</h1> 
        <ul className="topics-list">
          {topics.map((topic) => (
            <li className="topic" key={topic.slug}>
              <Link to={`/articles?topic=${topic.slug}`}>{topic.slug}</Link> 
            </li>
          ))}
        </ul>
      </div>
    );
    

}

export default TopicsPage;