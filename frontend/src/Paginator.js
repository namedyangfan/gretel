function Paginator({ numPages, currentPage, setSearchParams }) {
  const pagesNumbers = [];
  function handleClick(e) {
    setSearchParams({ page: e });
  }

  for (let i = 0; i < numPages; i++) {
    const pageNum = i + 1;
    const className =
      currentPage === pageNum ? 'page-item active' : 'page-item';

    pagesNumbers.push(
      <li className={className} key={pageNum}>
        <span className='page-link' onClick={() => handleClick(pageNum)}>
          {pageNum}
        </span>
      </li>
    );
  }

  return (
    <nav
      aria-label='Page navigation example'
      className='d-flex justify-content-center'
    >
      <ul className='pagination'>{pagesNumbers}</ul>
    </nav>
  );
}

export default Paginator;
