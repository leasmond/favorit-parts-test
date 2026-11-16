const PAGE_SIZE_OPTIONS = [20, 50, 100];

const OffersPagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  onPageSizeChange,
}) => {
  const visiblePages = [...new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const paginationItems = [];

  visiblePages.forEach((page, index) => {
    if (index > 0 && page - visiblePages[index - 1] > 1) {
      paginationItems.push('ellipsis');
    }

    paginationItems.push(page);
  });

  return (
    <div className="offers-pagination">
      <div className="offers-pagination__info">
        Показано {startIndex + 1}–{endIndex} из {totalItems}
      </div>
      <div className="offers-pagination__controls">
        <div className="offers-pagination__size">
          <label htmlFor="page-size">На странице:</label>
          <select
            id="page-size"
            className="form-select form-select-sm"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <nav aria-label="Навигация по страницам">
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                type="button"
                className="page-link"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                aria-label="Предыдущая страница"
              >
                &laquo;
              </button>
            </li>
            {paginationItems.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className={`page-item ${
                  item === currentPage ? 'active' : ''
                } ${item === 'ellipsis' ? 'disabled' : ''}`}
              >
                {item === 'ellipsis' ? (
                  <span className="page-link">...</span>
                ) : (
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => onPageChange(item)}
                    aria-current={item === currentPage ? 'page' : undefined}
                  >
                    {item}
                  </button>
                )}
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                type="button"
                className="page-link"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                aria-label="Следующая страница"
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default OffersPagination;
