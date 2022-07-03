import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const Movie = ({ movie, i }) => {
  return (
    <div className="relative animate-card-pop transition-all ease-in-out bg-base-300 p-3 rounded-xl hover:scale-105 hover:transition-all hover:ease-in-out  hover:duration-300">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative">
          <div
            className="absolute bg-base-300 rounded-full px-[12px] py-[3px] items-center m-1 flex text-white space-x-1  top-0 tooltip "
            data-tip={`Rating: ${movie.vote_average.toPrecision(1) / 2}/5`}
          >
            <AiFillStar className="text-yellow-400 2xl:text-base text-sm" />
            <p className="2xl:text-base font-semibold text-sm">
              {movie.vote_average.toPrecision(1) / 2}
            </p>
          </div>
          <img
            className="rounded-xl"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://www.fillmurray.com/200/300'
            }
            alt={movie.title}
          />
        </div>
        <div className="h-16 py-2">
          <h1 className="text-xl  font-medium">
            {movie.title.length > 23
              ? movie.title.substring(0, 23) + '...'
              : movie.title}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Movie;
