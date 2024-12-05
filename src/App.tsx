import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { products } from './data/products';
import { FilterOptions } from './types';

function App() {
  const [filters, setFilters] = useState<FilterOptions>({
    gender: '',
    size: '',
    color: '',
    searchQuery: ''
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesGender = !filters.gender || product.gender === filters.gender;
      const matchesSize = !filters.size || product.sizes.includes(filters.size as any);
      const matchesColor = !filters.color || product.color === filters.color;
      const matchesSearch = !filters.searchQuery || 
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return matchesGender && matchesSize && matchesColor && matchesSearch;
    });
  }, [filters, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header filters={filters} setFilters={setFilters} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;