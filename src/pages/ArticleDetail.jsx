import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { ArrowLeft, Eye, ThumbsUp, ThumbsDown, Clock, Tag } from 'lucide-react';
import CommentSection from '../components/CommentSection';
import TrendingSidebar from '../components/TrendingSidebar';
import { formatDate } from '../utils/helpers';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    articles, 
    viewArticle,   // ✅ الاسم الصحيح
    likeArticle, 
    dislikeArticle 
  } = useNews();
  
  const article = articles.find(article => article.id === parseInt(id));

  useEffect(() => {
    if (article) {
      viewArticle(article.id); // ✅ استدعاء الدالة الصحيحة
      document.title = `${article.title} | ReactNews`;
      window.scrollTo(0, 0);
    }

    return () => {
      document.title = 'ReactNews';
    };
  }, [article, viewArticle]);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="md:w-3/4">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to all articles
          </button>

          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* Article Header */}
            <div className="relative h-64 sm:h-96">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-gray-200 text-sm flex items-center">
                    <Clock size={14} className="mr-1" />
                    {formatDate(article.publishDate)}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {article.title}
                </h1>
              </div>
            </div>

            {/* Article Info Bar */}
            <div className="flex flex-wrap items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  {article.views} views
                </span>
                <span className="flex items-center">
                  <Tag size={16} className="mr-1" />
                  {article.category}
                </span>
              </div>

              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <button 
                  onClick={() => likeArticle(article.id)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                >
                  <ThumbsUp size={16} />
                  <span>{article.likes}</span>
                </button>
                <button 
                  onClick={() => dislikeArticle(article.id)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                >
                  <ThumbsDown size={16} />
                  <span>{article.dislikes}</span>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Comments Section */}
              <CommentSection article={article} />
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/4">
          <TrendingSidebar />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
