import { ThumbsUp, ThumbsDown, Eye, MessageSquare } from 'lucide-react';
import { Article } from '../data/newsData';
import { useNews } from '../context/NewsContext';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  const { likeArticle, dislikeArticle } = useNews();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 cursor-pointer" onClick={onClick}>
          {article.title}
        </h2>
        <p className="text-gray-600 mb-4">{article.summary}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-4">{article.author}</span>
          <span>{new Date(article.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center mt-4 space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              likeArticle(article.id);
            }}
            className="flex items-center space-x-1 text-gray-600 hover:text-green-600"
          >
            <ThumbsUp size={18} />
            <span>{article.likes}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dislikeArticle(article.id);
            }}
            className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
          >
            <ThumbsDown size={18} />
            <span>{article.dislikes}</span>
          </button>
          <div className="flex items-center space-x-1 text-gray-600">
            <Eye size={18} />
            <span>{article.views}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <MessageSquare size={18} />
            <span>{article.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}