import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { formatDate } from '../utils/helpers';

const CommentSection = ({ article }) => {
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState([]);
  const { addComment, getArticleComments } = useNews();

  // تحميل التعليقات عند التحميل وعند التحديث
  useEffect(() => {
    const loadComments = async () => {
      const comments = await getArticleComments(article.id);
      setLocalComments(comments || []);
    };
    loadComments();
  }, [article.id, getArticleComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const form = e.target;
      const scrollPos = form.getBoundingClientRect().top + window.pageYOffset;
      
      try {
        await addComment(article.id, commentText);
        setCommentText('');
        
        // تحديث التعليقات المحلية مباشرة
        setLocalComments(prev => [
          ...prev,
          {
            id: Date.now(), // ID مؤقت حتى يتم حفظه في الخادم
            text: commentText,
            createdAt: new Date().toISOString(),
            user: { name: 'You' } // يمكن استبدالها ببيانات المستخدم الحقيقي
          }
        ]);

        // التمرير السلس بعد التحديث
        setTimeout(() => {
          window.scrollTo({
            top: scrollPos,
            behavior: 'smooth'
          });
        }, 100);
      } catch (error) {
        console.error('Failed to post comment:', error);
      }
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
        <MessageSquare className="mr-2" size={20} />
        Comments ({localComments.length})
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
              required
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

      <div className="space-y-6">
        {localComments.map((comment) => (
          <div key={comment.id} className="flex">
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">
                {comment.user?.name?.charAt(0) || 'U'}
              </div>
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {comment.user?.name || 'Unknown'}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {comment.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;