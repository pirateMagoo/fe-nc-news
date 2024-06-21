
import React, { Component } from 'react';
import './ErrorBoundary.css';  

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    
  }

  render() {
    if (this.state.hasError) {
     
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <p>We're working to fix the issue. Please try again later.</p>
        </div>
      );
    }

    
    return this.props.children; 
  }
}

export default ErrorBoundary;
