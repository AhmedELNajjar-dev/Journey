import React, { useState, useMemo } from 'react';
import Header from './components/Header/Header';
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
    const searchLower = filters.searchQuery.toLowerCase();
    
    return products.filter(product => {
      // If there's a search query, check all relevant fields
      if (searchLower) {
        const matchesName = product.name.toLowerCase().includes(searchLower);
        const matchesDescription = product.description.toLowerCase().includes(searchLower);
        const matchesGender = product.gender.toLowerCase().includes(searchLower);
        const matchesColor = product.color.toLowerCase().includes(searchLower);
        const matchesSize = product.sizes.some(size => 
          size.toLowerCase().includes(searchLower)
        );

        if (!(matchesName || matchesDescription || matchesGender || matchesColor || matchesSize)) {
          return false;
        }
      }

      // Apply filters
      const matchesGender = !filters.gender || product.gender === filters.gender;
      const matchesSize = !filters.size || product.sizes.includes(filters.size as any);
      const matchesColor = !filters.color || product.color === filters.color;

      return matchesGender && matchesSize && matchesColor;
    });
  }, [filters, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header filters={filters} setFilters={setFilters} />
      
      <main className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">No products found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;