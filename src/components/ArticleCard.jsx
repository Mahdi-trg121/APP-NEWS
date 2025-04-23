import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, Heart } from 'lucide-react';
import { formatDate } from '../utils/helpers';
import { useNews } from '../context/NewsContext';

const ArticleCard = ({ article }) => {
  const { likeArticle } = useNews();
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    likeArticle(article.id);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <Link 
      to={`/article/${article.id}`}
      className="group flex flex-col h-full overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800 relative"
    >
      <button
        onClick={handleLike}
        className={`absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors ${isAnimating ? 'heart-animation' : ''}`}
        aria-label={article.isLiked ? 'Unlike article' : 'Like article'}
      >
        <Heart 
          size={20} 
          className={article.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
        />
      </button>
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-2">
          <span className="text-xs font-medium text-white px-2 py-1 rounded-full bg-blue-600">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white">
          {article.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
          {article.summary}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Heart size={14} className="mr-1" /> 
              {article.likes || 0}
            </span>
            <span className="flex items-center">
              <Eye size={14} className="mr-1" /> 
              {article.views}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" /> 
              {formatDate(article.publishDate)}
            </span>
          </div>
          <span className="text-blue-600 dark:text-blue-400">Read more</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;