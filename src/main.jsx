import React from 'react';
import ReactDOM from 'react-dom/client';
import InsuranceQuoteComparator from './InsuranceQuoteComparator';

// Basic CSS reset and global styles
const GlobalStyles = () => (
  <style>
    {`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f0f2f5;
        color: #333;
      }
      
      .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      
      .header {
        background-color: #2c3e50;
        color: white;
        padding: 20px 0;
        text-align: center;
        margin-bottom: 30px;
      }
      
      .footer {
        background-color: #2c3e50;
        color: white;
        text-align: center;
        padding: 20px 0;
        margin-top: 30px;
      }
    `}
  </style>
);

const App = () => {
  return (
    <>
      <GlobalStyles />
      <div className="header">
        <h1>Insurance Quote Comparator Tool</h1>
        <p>Compare insurance quotes from multiple providers</p>
      </div>
      
      <div className="container">
        <InsuranceQuoteComparator />
      </div>
      
      <div className="footer">
        <p>&copy; 2025 Insurance Quote Comparator | All Rights Reserved</p>
      </div>
    </>
  );
};

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// For a production-ready application, this file would be used as index.js
// and you would create a public/index.html file with a div#root element