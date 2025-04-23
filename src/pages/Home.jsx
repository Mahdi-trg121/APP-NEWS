import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import ArticleCard from '../components/ArticleCard';
import CategoryFilter from '../components/CategoryFilter';
import TrendingSidebar from '../components/TrendingSidebar';
import { SlidersHorizontal, Grid, List } from 'lucide-react';

export default function Home() {
  const { getArticlesByCategory } = useNews();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const navigate = useNavigate();

  const filteredArticles = getArticlesByCategory(selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Latest News</h1>
            <div className="flex space-x-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <SlidersHorizontal size={20} className="mr-2 text-gray-700 dark:text-gray-300" />
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">Filter by Category</h2>
          </div>

          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />

          {filteredArticles.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-6"
            }>
              {filteredArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  onClick={() => navigate(`/article/${article.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:w-1/4">
          <TrendingSidebar />
        </div>
      </div>
    </div>
  );
}
