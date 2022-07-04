import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery } from '../../services/TMDB';
import { AiFillClockCircle, AiFillLike } from 'react-icons/ai';

const MovieInformation = () => {
  let tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  console.log(data);
  if (isFetching) {
    return (
      <div className="flex flex-col gap-y-3 h-[80vh] justify-center items-center">
        We are finding your movie...
        <progress class="progress w-56"></progress>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="bg-base-300 rounded-lg p-6 md:flex md:flex-row flex-col">
        <div className="md:w-[40%]">
          <img
            src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
            alt={data?.title}
            className="rounded-lg w-full shadow-lg "
          />
        </div>
        <div className="md:w-[60%]">
          <div className="px-6">
            <h4 className="bg-green-500 w-[100px] text-center text-white rounded-full">
              {data?.status}
            </h4>
            <h1 className="text-3xl text-white mt-6">{data?.title}</h1>
            <p>{data?.tagline}</p>
            <div className="mt-3 flex justify-between">
              <div className="flex items-center gap-1">
                <AiFillLike />
                <span>{data?.vote_average * 10}%</span>
              </div>
              <div className="flex items-center gap-1">
                <AiFillClockCircle />
                <p>{(data?.runtime / 60).toPrecision(2)} h</p>
              </div>
            </div>
            <div class="divider"></div>
            <div class="tabs tabs-boxed">
              {tabs.map((tab, i) => (
                <a class="tab">{tab}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInformation;
