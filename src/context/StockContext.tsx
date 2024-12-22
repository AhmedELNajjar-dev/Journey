import React, { createContext, useContext, useReducer } from 'react';
import { Product, Size } from '../types';
import { products } from '../data/products';

type StockState = Record<string, Record<Size, number>>;

const initialStock: StockState = products.reduce((acc, product) => {
  acc[product.id] = product.stock;
  return acc;
}, {} as StockState);

const StockContext = createContext<{
  stock: StockState;
} | null>(null);

const stockReducer = (state: StockState): StockState => {
  return state; // No actions required for stock in this reducer
};

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stock] = useReducer(stockReducer, initialStock);

  return (
    <StockContext.Provider value={{ stock }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};
