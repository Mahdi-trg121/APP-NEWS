import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Eye } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { formatDate } from '../utils/helpers';

const TrendingSidebar = () => {
  const { getTrendingArticles } = useNews();
  const trendingArticles = getTrendingArticles();

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-5">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
        <TrendingUp size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
        Trending Now
      </h2>
      
      <div className="space-y-4">
        {trendingArticles.map((article) => (
          <Link 
            key={article.id}
            to={`/article/${article.id}`}
            className="group flex space-x-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-gray-900 dark:text-white">
                {article.title}
              </h3>
              <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Eye size={12} className="mr-1" />
                <span>{article.views} views</span>
                <span className="mx-2">•</span>
                <span>{formatDate(article.publishDate)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingSidebar;