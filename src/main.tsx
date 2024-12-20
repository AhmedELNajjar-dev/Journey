import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './context/CartContext';
import { StockProvider } from './context/StockContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StockProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </StockProvider>
  </StrictMode>
);