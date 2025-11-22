import React from 'react';

export const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseStyles = {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    secondary: {
      backgroundColor: '#6c757d',
      color: 'white'
    },
    success: {
      backgroundColor: '#28a745',
      color: 'white'
    }
  };

  const styles = { ...baseStyles, ...variantStyles[variant] };

  return (
    <button style={styles} onClick={onClick}>
      {children}
    </button>
  );
};

export const Card = ({ title, children, footer }) => {
  const cardStyles = {
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const titleStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333'
  };

  const footerStyles = {
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #dee2e6',
    color: '#6c757d'
  };

  return (
    <div style={cardStyles}>
      {title && <div style={titleStyles}>{title}</div>}
      <div>{children}</div>
      {footer && <div style={footerStyles}>{footer}</div>}
    </div>
  );
};

export const Header = ({ title, subtitle }) => {
  const headerStyles = {
    backgroundColor: '#282c34',
    padding: '20px',
    color: 'white',
    marginBottom: '20px'
  };

  const titleStyles = {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 10px 0'
  };

  const subtitleStyles = {
    fontSize: '16px',
    color: '#61dafb',
    margin: 0
  };

  return (
    <header style={headerStyles}>
      <h1 style={titleStyles}>{title}</h1>
      {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
    </header>
  );
};

export const Container = ({ children }) => {
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  };

  return <div style={containerStyles}>{children}</div>;
};
