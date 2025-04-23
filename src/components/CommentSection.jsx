import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { formatDate } from '../utils/helpers';

const CommentSection = ({ article }) => {
  const [commentText, setCommentText] = useState('');
  const { addComment } = useNews();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const form = e.target;
      const scrollPos = form.getBoundingClientRect().top + window.pageYOffset;
      
      addComment(article.id, commentText);
      setCommentText('');
      
      setTimeout(() => {
        window.scrollTo({
          top: scrollPos,
          behavior: 'smooth'
        });
      }, 0);
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
        <MessageSquare className="mr-2" size={20} />
        Comments ({article.comments?.length || 0})
      </h3>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
              U
            </div>
          </div>
          <div className="flex-grow">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add your comment..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              rows="3"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} className="mr-2" />
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* بقية كود عرض التعليقات كما هو */}
    </div>
  );
};

export default CommentSection;