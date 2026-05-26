// Runs before any legacy .jsx module — exposes React + ReactDOM on window so
// files using the legacy `const { useState } = window.React` pattern work.
import React from 'react';
import ReactDOM from 'react-dom/client';
window.React = React;
window.ReactDOM = ReactDOM;
