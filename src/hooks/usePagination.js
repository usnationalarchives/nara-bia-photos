import { useState } from 'react';

const usePagination = (options = { items: [], perPage: 20 }) => {
  const { items, perPage, page, setPage } = options;

  // set up pagination data
  const offset = (page - 1) * perPage,
    data = items.slice(offset).slice(0, perPage),
    totalPages = Math.ceil(items.length / perPage),
    total = items.length,
    prevPage = page - 1 ? page - 1 : null,
    nextPage = totalPages > page ? page + 1 : null;

  // provide a function for handling switching to the previous page
  const prevHandler = () => {
    setPage(prevPage);
  };

  // provide a function for handling switching to the next page
  const nextHandler = () => {
    setPage(nextPage);
  };

  // provide a function for handling switching to the first page
  const firstPageHandler = () => {
    setPage(1);
  };

  // provide a function for handling switching to the last page
  const lastPageHandler = () => {
    setPage(totalPages);
  };

  return {
    perPage,
    prevPage,
    nextPage,
    prevHandler,
    nextHandler,
    firstPageHandler,
    lastPageHandler,
    total,
    totalPages,
    data,
  };
};

export default usePagination;
