'use client';

import { useState } from 'react';

const filterCategories = [
  { id: 'all', label: 'All Programs', count: '50+' },
  { id: 'strength', label: 'Strength Training', count: '15' },
  { id: 'cardio', label: 'Cardio & HIIT', count: '12' },
  { id: 'bodybuilding', label: 'Bodybuilding', count: '18' },
  { id: 'powerlifting', label: 'Powerlifting', count: '8' },
  { id: 'beginner', label: 'Beginner Friendly', count: '20' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured First' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'newest', label: 'Newest First' },
  { id: 'popular', label: 'Most Popular' },
];

export default function ProgramsFilter() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('featured');

  return (
    <section className="py-12 bg-bbd-charcoal/20 border-y border-bbd-ivory/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          {/* Filter Categories */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-bbd-ivory mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-3">
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`
                    inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${activeFilter === category.id
                      ? 'bg-bbd-orange text-bbd-black'
                      : 'bg-bbd-charcoal/50 text-bbd-ivory hover:bg-bbd-orange/20 hover:text-bbd-orange border border-bbd-ivory/20'
                    }
                  `}
                >
                  {category.label}
                  <span className={`
                    ml-2 px-2 py-0.5 rounded-full text-xs
                    ${activeFilter === category.id
                      ? 'bg-bbd-black/20 text-bbd-black'
                      : 'bg-bbd-ivory/10 text-bbd-ivory/70'
                    }
                  `}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="lg:w-64">
            <h3 className="text-lg font-bold text-bbd-ivory mb-4">Sort by</h3>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="w-full px-4 py-3 bg-bbd-charcoal border border-bbd-ivory/20 rounded-md text-bbd-ivory focus:border-bbd-orange focus:ring-1 focus:ring-bbd-orange outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id} className="bg-bbd-charcoal">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFilter !== 'all' && (
          <div className="mt-6 flex items-center gap-4">
            <span className="text-bbd-ivory/70 text-sm">Active filters:</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-bbd-orange/20 text-bbd-orange rounded-full text-sm">
                {filterCategories.find(cat => cat.id === activeFilter)?.label}
                <button
                  onClick={() => setActiveFilter('all')}
                  className="ml-2 hover:text-bbd-ivory transition-colors"
                >
                  ×
                </button>
              </span>
            </div>
            <button
              onClick={() => setActiveFilter('all')}
              className="text-bbd-ivory/70 hover:text-bbd-orange text-sm transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
