import { useParams, useNavigate } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import CommentSection from '../components/CommentSection';
import { ArrowLeft, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import { useEffect } from 'react';

export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles, viewArticle, likeArticle, dislikeArticle } = useNews();
  const article = articles.find(a => a.id === id);

  useEffect(() => {
    if (article) {
      viewArticle(article.id);
    }
  }, [article, viewArticle]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p>Article not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Home
      </button>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="flex items-center text-gray-600 mb-6">
        <span className="mr-4">{article.author}</span>
        <span>{new Date(article.date).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center space-x-6 mb-8">
        <button
          onClick={() => likeArticle(article.id)}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
        >
          <ThumbsUp size={20} />
          <span>{article.likes}</span>
        </button>
        <button
          onClick={() => dislikeArticle(article.id)}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
        >
          <ThumbsDown size={20} />
          <span>{article.dislikes}</span>
        </button>
        <div className="flex items-center space-x-2 text-gray-600">
          <Eye size={20} />
          <span>{article.views} views</span>
        </div>
      </div>
      <div className="prose max-w-none mb-8">
        <p className="text-lg leading-relaxed">{article.content}</p>
      </div>
      <CommentSection articleId={article.id} comments={article.comments} />
    </div>
  );
}
