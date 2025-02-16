import { useState } from 'react';

function usePagination(
  totalPages: any,
  initialPage = 1,
  maxPagesDisplayed = 5,
) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  function goToPage(pageNumber: any) {
    setCurrentPage(pageNumber);
  }

  function nextPage() {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }

  function prevPage() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function generatePagination() {
    let pagination = [];

    if (totalPages <= maxPagesDisplayed) {
      pagination = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxPagesDisplayed / 2),
      );
      let endPage = Math.min(totalPages, startPage + maxPagesDisplayed - 1);

      if (startPage > 1) {
        pagination.push(1);
        if (startPage > 2) {
          pagination.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pagination.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pagination.push('...');
        }
        pagination.push(totalPages);
      }
    }

    return pagination;
  }

  return { currentPage, goToPage, nextPage, prevPage, generatePagination };
}

export default usePagination;
