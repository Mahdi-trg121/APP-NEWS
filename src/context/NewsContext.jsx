import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { newsData } from '../data/newsData';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const containerRef = useRef(null);

  const [articles, setArticles] = useState(() => {
    const savedArticles = localStorage.getItem('newsArticles');
    const initialArticles = savedArticles ? JSON.parse(savedArticles) : newsData;

    return initialArticles.map(article => ({
      ...article,
      isLiked: localStorage.getItem(`liked_${article.id}`) === 'true',
      isDisliked: localStorage.getItem(`disliked_${article.id}`) === 'true',
      likes: parseInt(localStorage.getItem(`likes_${article.id}`)) || article.likes || 0,
      dislikes: parseInt(localStorage.getItem(`dislikes_${article.id}`)) || article.dislikes || 0,
      comments: article.comments || [],
    }));
  });

  const [viewedArticles, setViewedArticles] = useState(() => {
    const savedHistory = localStorage.getItem('viewHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('newsArticles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('viewHistory', JSON.stringify(viewedArticles));
  }, [viewedArticles]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const preserveScroll = (callback) => {
    const scrollTop = containerRef.current?.scrollTop;
    callback();
    setTimeout(() => {
      if (containerRef.current) containerRef.current.scrollTop = scrollTop;
    }, 0);
  };

  const likeArticle = useCallback((id) => {
    preserveScroll(() => {
      setArticles(prev => prev.map(article => {
        if (article.id === id) {
          const isCurrentlyLiked = article.isLiked;
          const newLikes = isCurrentlyLiked ? Math.max(0, article.likes - 1) : article.likes + 1;
          const newDislikes = article.isDisliked ? Math.max(0, article.dislikes - 1) : article.dislikes;

          localStorage.setItem(`liked_${id}`, (!isCurrentlyLiked).toString());
          localStorage.setItem(`likes_${id}`, newLikes.toString());
          localStorage.setItem(`disliked_${id}`, 'false');
          localStorage.setItem(`dislikes_${id}`, newDislikes.toString());

          return {
            ...article,
            likes: newLikes,
            dislikes: newDislikes,
            isLiked: !isCurrentlyLiked,
            isDisliked: false,
          };
        }
        return article;
      }));
    });
  }, []);

  const dislikeArticle = useCallback((id) => {
    preserveScroll(() => {
      setArticles(prev => prev.map(article => {
        if (article.id === id) {
          const isCurrentlyDisliked = article.isDisliked;
          const newDislikes = isCurrentlyDisliked ? Math.max(0, article.dislikes - 1) : article.dislikes + 1;
          const newLikes = article.isLiked ? Math.max(0, article.likes - 1) : article.likes;

          localStorage.setItem(`disliked_${id}`, (!isCurrentlyDisliked).toString());
          localStorage.setItem(`dislikes_${id}`, newDislikes.toString());
          localStorage.setItem(`liked_${id}`, 'false');
          localStorage.setItem(`likes_${id}`, newLikes.toString());

          return {
            ...article,
            likes: newLikes,
            dislikes: newDislikes,
            isLiked: false,
            isDisliked: !isCurrentlyDisliked,
          };
        }
        return article;
      }));
    });
  }, []);

  const addComment = useCallback((articleId, text) => {
    preserveScroll(() => {
      const newComment = {
        id: Date.now().toString(),
        user: 'Guest',
        text,
        date: new Date().toISOString(),
      };

      setArticles(prev =>
        prev.map(article =>
          article.id === articleId
            ? { ...article, comments: [...(article.comments || []), newComment] }
            : article
        )
      );
    });
  }, []);

  const viewArticle = useCallback((id) => {
    const viewed = articles.find((a) => a.id === id);
    if (!viewed) return;

    setViewedArticles((prev) => {
      const alreadyViewed = prev.some((item) => item.id === id);
      if (!alreadyViewed) {
        setArticles((prevArticles) =>
          prevArticles.map((article) =>
            article.id === id ? { ...article, views: (article.views || 0) + 1 } : article
          )
        );
        const { id, title, category } = viewed;
        return [...prev, { id, title, category }];
      }
      return prev;
    });
  }, [articles]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const getArticlesByCategory = useCallback((category) => {
    if (!category || category === 'All') return articles;
    return articles.filter((article) => article.category === category);
  }, [articles]);

  const getTrendingArticles = useCallback(() => {
    return [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);
  }, [articles]);

  const getCategories = useCallback(() => {
    const categories = new Set(articles.map((a) => a.category));
    return ['All', ...Array.from(categories)];
  }, [articles]);

  return (
    <div ref={containerRef} style={{ height: '100vh', overflow: 'auto' }}>
      <NewsContext.Provider
        value={{
          articles,
          viewedArticles,
          darkMode,
          likeArticle,
          dislikeArticle,
          addComment,
          viewArticle,
          toggleDarkMode,
          getArticlesByCategory,
          getTrendingArticles,
          getCategories,
        }}
      >
        {children}
      </NewsContext.Provider>
    </div>
  );
};
