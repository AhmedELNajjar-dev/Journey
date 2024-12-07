import React, { useState } from 'react';
import { Search, Menu, Ruler } from 'lucide-react';
import { FilterOptions } from '../types';
import SizeChartModal from './SizeChartModal';

interface HeaderProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}

export default function Header({ filters, setFilters }: HeaderProps) {
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-cyan-500 to-blue-500 sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 py-3">
          {/* Main header row */}
          <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
            {/* Logo and Brand Name */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="relative w-20 h-20 sm:w-25 sm:h-25">
                <img 
                  src="/images/Logo.png" 
                  alt="Journey Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">Journey</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-full sm:max-w-2xl w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-lg border-2 border-transparent focus:outline-none focus:border-white/30 bg-white/10 text-white placeholder-white/70"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                />
                <Search className="absolute right-3 top-2.5 text-white/70" size={20} />
              </div>
            </div>

            {/* Size Chart Button */}
            <button
              onClick={() => setIsSizeChartOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              <Ruler size={20} />
              <span>Size Chart</span>
            </button>

            {/* Mobile Menu Icon
            <button className="p-2 rounded-lg hover:bg-white/10 text-white">
              <Menu size={24} />
            </button> */}
          </div>

          {/* Filters row */}
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            {/* Size Chart Button (Mobile) */}
            <button
              onClick={() => setIsSizeChartOpen(true)}
              className="sm:hidden px-4 py-1.5 rounded-lg bg-white/10 text-white border-2 border-transparent focus:outline-none focus:border-white/30 cursor-pointer flex items-center gap-2"
            >
              <Ruler size={16} />
              <span>Size Chart</span>
            </button>

            <select
              className="px-4 py-1.5 rounded-lg bg-white/10 text-white border-2 border-transparent focus:outline-none focus:border-white/30 cursor-pointer"
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            >
              <option value="" className="text-gray-800">All Genders</option>
              <option value="male" className="text-gray-800">Male</option>
              <option value="female" className="text-gray-800">Female</option>
              <option value="unisex" className="text-gray-800">Unisex</option>
            </select>

            <select
              className="px-4 py-1.5 rounded-lg bg-white/10 text-white border-2 border-transparent focus:outline-none focus:border-white/30 cursor-pointer"
              value={filters.size}
              onChange={(e) => setFilters({ ...filters, size: e.target.value })}
            >
              <option value="" className="text-gray-800">All Sizes</option>
              <option value="L" className="text-gray-800">L</option>
              <option value="XL" className="text-gray-800">XL</option>
              <option value="XXL" className="text-gray-800">XXL</option>
            </select>

            <select
              className="px-4 py-1.5 rounded-lg bg-white/10 text-white border-2 border-transparent focus:outline-none focus:border-white/30 cursor-pointer"
              value={filters.color}
              onChange={(e) => setFilters({ ...filters, color: e.target.value })}
            >
              <option value="" className="text-gray-800">All Colors</option>
              <option value="black" className="text-gray-800">Black</option>
              <option value="gray" className="text-gray-800">Gray</option>
              <option value="white" className="text-gray-800">White</option>
              <option value="blue" className="text-gray-800">Blue</option>
            </select>
          </div>
        </div>
      </header>

      <SizeChartModal 
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />
    </>
  );
}