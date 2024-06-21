import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import ArticlePage from "./Components/ArticlePage";
import TopicArticlesPage from "./Components/TopicArticlesPage";
import TopicsPage from "./Components/TopicsPage";
import NavBar from "./Components/NavBar";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/articles" element={<TopicArticlesPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    
  );
}

export default App;
