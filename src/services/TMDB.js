import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Movie from '../components/Movie/Movie';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
///movie/popular?api_key=<<api_key>>&language=en-US&page=1

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => {
        return `genre/movie/list?api_key=${tmdbApiKey}&language=it-IT`;
      },
    }),
    // Get movies by  [type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get movies by search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}&language=it-IT`;
        }

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}&language=it-IT`;
        }
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}&language=it-IT`;
        }

        return `movie/popular?page=${page}&api_key=${tmdbApiKey}&language=it-IT`;
      },
      //Getmovie
      //https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key=<<api_key>>
    }),
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}&language=it-IT`,
    }),

    getProviders: builder.query({
      query: (id) =>
        `/movie/${id}/watch/providers?api_key=${tmdbApiKey}&language=it-IT`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetProvidersQuery,
} = tmdbApi;
