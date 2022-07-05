import React from 'react';

const Pagination = ({ currentPage, totalPages, setPage, isFetching }) => {
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (totalPages === 0) {
    return null;
  }

  if (isFetching) {
    return null;
  }
  return (
    <div className="py-6">
      <div className="flex justify-center items-center gap-6">
        <button onClick={handlePrev} className="btn btn-primary">
          Prev
        </button>
        <div className="flex ">
          <h1>{currentPage}</h1>
          <h1>/{totalPages}</h1>
        </div>
        <button onClick={handleNext} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
