import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { WebSocketProvider } from './services/WebSocketProvider';
import { AuthProvider } from './services/authProvider';
import { ProductListProvider } from './services/ProductListProvider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <WebSocketProvider>
      <ProductListProvider>
        <App />
      </ProductListProvider>
    </WebSocketProvider>
  </AuthProvider>
  // </React.StrictMode>
);