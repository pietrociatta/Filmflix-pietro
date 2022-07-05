import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery, useGetProvidersQuery } from '../../services/TMDB';
import {
  AiFillClockCircle,
  AiOutlineFile,
  AiOutlineUser,
  AiFillLike,
  AiOutlineInfo,
  AiOutlineInfoCircle,
} from 'react-icons/ai';

const MovieInformation = () => {
  const [activeClass, setActiveClass] = useState(1);

  useEffect(() => {
    setActiveClass(0);
  }, []);

  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { currentData } = useGetProvidersQuery(id);

  console.log(currentData);
  let tabs = [
    {
      name: 'Description',
      icon: <AiOutlineFile />,
      description: data?.overview,
    },
    { name: 'Cast', icon: <AiOutlineUser />, description: data?.credits.cast },
    { name: 'Info', icon: <AiOutlineInfoCircle />, description: 'prova3' },
  ];
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
      <div className="rounded-lg p-6 md:flex md:flex-row flex-col">
        <div className="md:w-[35%] 2xl:w-[25%] bg-base-300 h-max p-4 rounded-lg">
          <div className=" object-cover    ">
            <img
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              alt={data?.title}
              className="rounded-lg shadow-lg h-min w-full  mx-auto md:mx-0  "
            />
          </div>
          <div>
            <div>
              {currentData?.results?.IT && currentData.results.IT.flatrate ? (
                <div className="flex gap-3 justify-center mt-4 max-w-max mx-auto ">
                  {currentData?.results?.IT?.flatrate.map((provider) => (
                    <div className=" bg-base-100 p-1 rounded-full  ">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                        alt=""
                        className="rounded-full w-[40px] "
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="md:w-[65%] 2xl:w-[70%] my-auto mt-8 md:mt-0  ">
          <div className="md:pl-6   ">
            <h4 className="bg-green-500 max-w-max px-4 text-center text-white rounded-full">
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
            <div class="tabs tabs-boxed max-w-max">
              {tabs.map((tab, i) => (
                <button
                  onClick={() => setActiveClass(i)}
                  class={`${
                    activeClass === i
                      ? 'bg-[#DC1A28] text-white rounded-lg'
                      : ''
                  } tab gap-1`}
                >
                  {tabs[i].icon}
                  {tabs[i].name}
                </button>
              ))}
            </div>
            <div>
              {typeof tabs[activeClass].description === 'string' ? (
                <p className="p-1 mt-3  max-h-[270px] h-[250px] overflow-y-scroll scrollbar-thumb-scroll scrollbar-thin scrollbar-track-transparent">
                  {tabs[activeClass].description}
                </p>
              ) : (
                <div className="flex space-x-5 mt-4 pb-4 mb-4  overflow-x-scroll scrollbar-thumb-scroll scrollbar-thin scrollbar-track-transparent">
                  {tabs[activeClass].description
                    .map((memeber) => (
                      <div className=" bg-base-100 p-2 rounded-lg ">
                        <img
                          src={
                            memeber.profile_path
                              ? `https://image.tmdb.org/t/p/w500/${memeber.profile_path}`
                              : 'https://www.fillmurray.com/200/300'
                          }
                          alt=""
                          className="w-full min-w-[5em] rounded-lg"
                        />
                        <p className="text-sm mt-2">{memeber.name}</p>
                        <p className="text-xs opacity-50">
                          {memeber.character.split(' ')[0]}
                        </p>
                      </div>
                    ))
                    .slice(0, 8)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInformation;
