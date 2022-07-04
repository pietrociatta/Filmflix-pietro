import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

const Movies = () => {
  const [page, setpage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <div className="flex flex-col gap-y-3 h-[80vh] justify-center items-center">
        We are finding movies...
        <progress class="progress w-56"></progress>
      </div>
    );
  }

  if (!data.results.length) {
    return <div>No movies found</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
