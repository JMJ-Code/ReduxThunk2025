import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.themoviedb.org/3/'
  }),
  endpoints(builder) {
    return {
      fetchPopularMovies: builder.query({
        query: () => {
          return {
            url: 'movie/popular',
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }),

      fetchHighestRatedMovies: builder.query({
        query: () => {
          return {
            url: 'movie/top_rated',
            params: {
              sort_by: 'vote_average.desc',
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }),

      fetchSearchMovie: builder.query({
        query: (searchTerm) => {
          return {
            url: 'search/movie',
            params: {
              query: searchTerm,
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }),

      fetchGenres: builder.query({
        query: () => {
          return {
            url: 'genre/movie/list',
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323',
              language: 'da-DK'
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

// Tilføj nu også den nye hook her:
export const {
  useFetchPopularMoviesQuery,
  useFetchHighestRatedMoviesQuery,
  useFetchSearchMovieQuery,
  useFetchGenresQuery, // <-- denne linje er ny
} = moviesApi;

export { moviesApi };


