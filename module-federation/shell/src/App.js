import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Lazy load remote modules
const Module1 = lazy(() => import('module1/App'));
const Module2 = lazy(() => import('module2/App'));
const Module3 = lazy(() => import('module3/App'));

const Navigation = () => {
  const navStyles = {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#282c34',
    marginBottom: '20px',
  };

  const linkStyles = {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    borderRadius: '4px',
    fontWeight: 'bold',
  };

  return (
    <nav style={navStyles}>
      <Link to="/" style={linkStyles}>Home</Link>
      <Link to="/module1" style={linkStyles}>Product Catalog</Link>
      <Link to="/module2" style={linkStyles}>Shopping Cart</Link>
      <Link to="/module3" style={linkStyles}>User Profile</Link>
    </nav>
  );
};

const Home = () => {
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  };

  const titleStyles = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  };

  const cardStyles = {
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Welcome to Native Federation Micro-Frontend</h1>
      <div style={cardStyles}>
        <h2>Shell Application (Host)</h2>
        <p>
          This is the shell application that orchestrates multiple micro-frontend modules
          using Module Federation. Each module is independently developed and deployed.
        </p>
        <ul>
          <li><strong>Module 1 (Product Catalog):</strong> Runs on port 3001</li>
          <li><strong>Module 2 (Shopping Cart):</strong> Runs on port 3002</li>
          <li><strong>Module 3 (User Profile):</strong> Runs on port 3003</li>
        </ul>
        <p>
          All modules share a common design system for consistent UI/UX across the application.
        </p>
      </div>
    </div>
  );
};

const ErrorBoundary = ({ children }) => {
  return (
    <Suspense fallback={
      <div style={{ 
        padding: '40px', 
        textAlign: 'center', 
        fontSize: '18px',
        color: '#666'
      }}>
        Loading module...
      </div>
    }>
      {children}
    </Suspense>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/module1" element={<Module1 />} />
            <Route path="/module2" element={<Module2 />} />
            <Route path="/module3" element={<Module3 />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}

export default App;
