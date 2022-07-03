import React from 'react';
import Movie from '../Movie/Movie';

const MovieList = ({ movies }) => {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 2xl:grid-cols-5">
        {movies.results.map((movie, i) => (
          <Movie key={i} movie={movie} i={i} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
