import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import ArticlePage from "./Components/ArticlePage";

function App() {
  return (
    
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
        </Routes>
      </main>
    
  );
}

export default App;
