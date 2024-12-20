import React, { createContext, useContext, useReducer } from 'react';
import { Product, Size } from '../types';
import { products } from '../data/products';

type StockState = Record<string, Record<Size, number>>;

type StockAction = {
  type: 'DECREMENT_STOCK';
  payload: {
    productId: string;
    size: Size;
    quantity: number;
  };
};

const initialStock: StockState = products.reduce((acc, product) => {
  acc[product.id] = product.stock;
  return acc;
}, {} as StockState);

const StockContext = createContext<{
  stock: StockState;
  dispatch: React.Dispatch<StockAction>;
} | null>(null);

const stockReducer = (state: StockState, action: StockAction): StockState => {
  switch (action.type) {
    case 'DECREMENT_STOCK': {
      const { productId, size, quantity } = action.payload;
      const currentStock = state[productId][size];
      
      if (currentStock < quantity) {
        throw new Error(`Insufficient stock. Only ${currentStock} items available.`);
      }

      return {
        ...state,
        [productId]: {
          ...state[productId],
          [size]: currentStock - quantity
        }
      };
    }
    default:
      return state;
  }
};

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stock, dispatch] = useReducer(stockReducer, initialStock);

  return (
    <StockContext.Provider value={{ stock, dispatch }}>
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