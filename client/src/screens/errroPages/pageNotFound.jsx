import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const containerStyle = {
    backgroundColor: '#eef3fd',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  return (
    <div style={containerStyle}>
      <h1>404 - Page Not Found</h1>
      <p>We're sorry, but the page you're looking for doesn't exist.</p>

    </div>
  );
};

export default NotFoundPage;
