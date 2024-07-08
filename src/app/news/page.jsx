'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getNews, setPage } from '@/redux/features/news/newsSlice';
import NewsCard from '@/components/newsCard';

export default function News() {
  const dispatch = useAppDispatch();
  const { news, status, error, currentPage, totalResults } = useAppSelector((state) => state.news);
  const [columns, setColumns] = useState(3); // Number of columns in grid

  useEffect(() => {
    dispatch(getNews(currentPage));
  }, [dispatch, currentPage]);


  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  // Filter out articles with title '[Removed]'
  const filteredNews = news.filter(article => article.title !== '[Removed]');

  return (
    <div className="flex flex-col items-center justify-center px-auto mt-10">
      <div className={`grid grid-cols-${columns} gap-4`}>
        {filteredNews.map((news, index) => (
          <div key={index} className="">
            <NewsCard news={news} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center mb-10">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-navyBlue text-[white] "
        >
          Previous Page
        </button>
        <span className="mx-2 text-lg bg-navyBlue text-[white]">{currentPage}</span>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage * 6 >= totalResults}
          className="px-4 py-2 ml-2 bg-navyBlue text-[white]"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
