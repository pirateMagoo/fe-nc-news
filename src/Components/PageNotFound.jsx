import React from "react";
import { Link } from "react-router-dom";
import './PageNotFound.css';

function PageNotFound() {
    return (
        <div className="page-not-found">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're searching for doesn't exist.</p>
            <Link to="/">Go back to Home</Link>
        </div>
    )
}

export default PageNotFound;