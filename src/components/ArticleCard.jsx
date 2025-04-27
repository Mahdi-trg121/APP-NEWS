import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, Heart, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { formatDate } from '../utils/helpers';
import { useNews } from '../context/NewsContext';

const ArticleCard = ({ article, onClick }) => {
  const { likeArticle, dislikeArticle, articles } = useNews();
  const [isAnimating, setIsAnimating] = useState(false);

  // جلب المقال المحدّث حسب الـ id
  const updatedArticle = articles.find(a => a.id === article.id) || article;

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    likeArticle(article.id);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleDislike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dislikeArticle(article.id);
  };

  return (
    <Link 
      to={`/article/${article.id}`}
      className="group flex flex-col h-full overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800 relative"
    >
      {/* زر اللايك */}
      <button
        onClick={handleLike}
        className={`absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors ${isAnimating ? 'heart-animation' : ''}`}
        aria-label={updatedArticle.isLiked ? 'Unlike article' : 'Like article'}
      >
        <Heart 
          size={20} 
          className={updatedArticle.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
        />
      </button>

      {/* صورة المقال */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={updatedArticle.image} 
          alt={updatedArticle.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-2">
          <span className="text-xs font-medium text-white px-2 py-1 rounded-full bg-blue-600">
            {updatedArticle.category}
          </span>
        </div>
      </div>

      {/* تفاصيل المقال */}
      <div className="flex flex-col flex-grow p-4">
        <h3 
          className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white cursor-pointer hover:text-blue-600" 
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick();
          }}
        >
          {updatedArticle.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
          {updatedArticle.summary}
        </p>

        {/* معلومات إضافية */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <ThumbsUp 
                size={16} 
                onClick={handleLike} 
                className={`${updatedArticle.isLiked ? 'text-green-600' : 'text-gray-500 hover:text-green-600'} cursor-pointer`}
              />
              <span>{updatedArticle.likes || 0}</span>
            </span>

            <span className="flex items-center space-x-1">
              <ThumbsDown 
                size={16} 
                onClick={handleDislike} 
                className={`${updatedArticle.isDisliked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'} cursor-pointer`}
              />
              <span>{updatedArticle.dislikes || 0}</span>
            </span>

            <span className="flex items-center space-x-1">
              <Eye size={16} />
              <span>{updatedArticle.views}</span>
            </span>

            <span className="flex items-center space-x-1">
              <MessageSquare size={16} />
              <span>{updatedArticle.comments?.length || 0}</span>
            </span>

            <span className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{formatDate(updatedArticle.publishDate)}</span>
            </span>
          </div>

          <span className="text-blue-600 dark:text-blue-400">Read more</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
