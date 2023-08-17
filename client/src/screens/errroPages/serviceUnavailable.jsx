import React from 'react';

const ServiceUnavailable = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#eef3fd',
    fontFamily: 'Arial, sans-serif',
  };

  const contentStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  const titleStyle = {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#333',
  };

  const messageStyle = {
    fontSize: '1.2rem',
    color: '#555',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>503 Service Unavailable</h1>
        <p style={messageStyle}>Our service is currently undergoing maintenance. Please try again later.</p>
      </div>
    </div>
  );
};

export default ServiceUnavailable;
