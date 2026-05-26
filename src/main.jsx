// _globals MUST be imported first — it attaches React/ReactDOM to window
// so the legacy .jsx files (which read window.React) work.
import './_globals.js';
import '../data.jsx';
import '../components.jsx';
import '../screens/home.jsx';
import '../screens/properties.jsx';
import '../screens/details.jsx';
import '../screens/buy-rent.jsx';
import '../screens/sell.jsx';
import '../screens/agents.jsx';
import '../screens/about.jsx';
import '../screens/blog.jsx';
import '../screens/contact.jsx';
import '../app.jsx';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import ErrorBoundary from './ErrorBoundary.jsx';

const { App } = window;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
