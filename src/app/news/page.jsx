'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getNews } from '@/redux/features/news/newsSlice';
import NewsCard from '@/components/newsCard';

export default function News() {
  const dispatch = useAppDispatch();
  const { news, status, error } = useAppSelector((state) => state.news);
  const [columns, setColumns] = useState(3); // Number of columns in grid

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    // Function to dynamically adjust columns based on window width
    const updateColumns = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setColumns(1); // Single column for small screens
      } else if (screenWidth < 1024) {
        setColumns(2); // Two columns for medium screens
      } else {
        setColumns(3); // Three columns for large screens
      }
    };

    // Update columns on initial load and on window resize
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => {
      window.removeEventListener('resize', updateColumns);
    };
  }, []);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  // Filter out articles with title '[Removed]'
  const filteredNews = news.filter(article => article.title !== '[Removed]');

  const columnItems = Array.from({ length: columns }, (_, i) => []);

  // Distribute filtered news articles into columns for masonry layout
  filteredNews.forEach((article, index) => {
    const columnIndex = index % columns;
    columnItems[columnIndex].push(
      <NewsCard key={index} news={article} />
    );
  });

  return (
    <div className='news-grid px-auto'>
      {columnItems.map((column, index) => (
        <div key={index} className='column'>
          {column.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>{item}</React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
