import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { newsData } from '../data/newsData';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  // استخدام useRef لحفظ موضع التمرير
  const containerRef = useRef(null);

  // تهيئة الحالات مع localStorage
  const [articles, setArticles] = useState(() => {
    const savedArticles = localStorage.getItem('newsArticles');
    const initialArticles = savedArticles ? JSON.parse(savedArticles) : newsData;
    
    // تحميل حالة الإعجاب لكل مقال من localStorage
    return initialArticles.map(article => ({
      ...article,
      isLiked: localStorage.getItem(`liked_${article.id}`) === 'true',
      likes: parseInt(localStorage.getItem(`likes_${article.id}`)) || article.likes || 0
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

  // حفظ التغييرات في localStorage
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

  // دالة الإعجاب المعدلة
  const likeArticle = useCallback((id) => {
    const scrollTop = containerRef.current?.scrollTop;
    
    setArticles(prev => prev.map(article => {
      if (article.id === id) {
        const newLikeStatus = !article.isLiked;
        const newLikes = newLikeStatus ? (article.likes + 1) : (article.likes - 1);
        
        // حفظ في localStorage لكل مقال
        localStorage.setItem(`liked_${id}`, newLikeStatus.toString());
        localStorage.setItem(`likes_${id}`, newLikes.toString());
        
        return {
          ...article,
          likes: newLikes,
          isLiked: newLikeStatus
        };
      }
      return article;
    }));
    
    // استعادة موضع التمرير بعد التحديث
    setTimeout(() => {
      if (containerRef.current) containerRef.current.scrollTop = scrollTop;
    }, 0);
  }, []);

  // دالة عدم الإعجاب المعدلة
  const dislikeArticle = useCallback((id) => {
    const scrollTop = containerRef.current?.scrollTop;
    
    setArticles(prev => prev.map(article => {
      if (article.id === id) {
        const newDislikes = (article.dislikes || 0) + 1;
        return {
          ...article,
          dislikes: newDislikes
        };
      }
      return article;
    }));
    
    setTimeout(() => {
      if (containerRef.current) containerRef.current.scrollTop = scrollTop;
    }, 0);
  }, []);

  // دالة إضافة تعليق معدلة
  const addComment = useCallback((articleId, text) => {
    const scrollTop = containerRef.current?.scrollTop;
    
    const newComment = {
      id: Date.now().toString(),
      user: 'Guest',
      text,
      date: new Date().toISOString(),
    };

    setArticles(prev =>
      prev.map(article =>
        article.id === articleId
          ? {
              ...article,
              comments: [...(article.comments || []), newComment],
            }
          : article
      )
    );
    
    setTimeout(() => {
      if (containerRef.current) containerRef.current.scrollTop = scrollTop;
    }, 0);
  }, []);

  // دوال العرض والوضع الداكن
  const viewArticle = useCallback((id) => {
    setViewedArticles((prev) => {
      const alreadyViewed = prev.some((item) => item.id === id);
      if (!alreadyViewed) {
        setArticles((prevArticles) =>
          prevArticles.map((article) =>
            article.id === id ? { ...article, views: (article.views || 0) + 1 } : article
          )
        );

        const viewed = articles.find((a) => a.id === id);
        if (viewed) {
          const { id, title, category } = viewed;
          return [...prev, { id, title, category }];
        }
      }
      return prev;
    });
  }, [articles]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  // دوال مساعدة
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

