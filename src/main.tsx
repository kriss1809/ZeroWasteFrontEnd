import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { WebSocketProvider } from './services/WebSocketProvider';
import { AuthProvider } from './services/authProvider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </AuthProvider>
  // </React.StrictMode>
);