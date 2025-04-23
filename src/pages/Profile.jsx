import React from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { User, History, Clock, Eye, ArrowLeft } from 'lucide-react';

export default function Profile() {
  const { articles, viewedArticles } = useNews();
  const viewedArticlesList = articles.filter(article =>
    viewedArticles.includes(article.id)
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Link 
        to="/" 
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Home
      </Link>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <User size={32} className="text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">Your Profile</h1>
              <p className="opacity-80">View your reading history and preferences</p>
            </div>
          </div>
        </div>
        
        {/* Reading History */}
        <div className="p-6">
          <div className="flex items-center mb-6">
            <History size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Reading History</h2>
          </div>
          
          {viewedArticlesList.length > 0 ? (
            <div className="space-y-4">
              {viewedArticlesList.map((article) => (
                <Link 
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="flex items-start p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-md overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {formatDate(article.date)}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Eye size={12} className="mr-1" />
                        {article.views} views
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <History size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No reading history yet</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Articles you view will appear here.
              </p>
              <Link 
                to="/"
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Browse Articles
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
