import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.themoviedb.org/3/',
  }),
  endpoints(builder) {
    return {
      fetchPopularMovies: builder.query({
        query: () => {
          return {
            url: 'movie/popular',
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323',
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
              api_key: '81c50c197b83129dd4fc387ca6c8c323',
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
              api_key: '81c50c197b83129dd4fc387ca6c8c323',
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
              language: 'da-DK',
            },
            method: 'GET',
          };
        },
      }),
      fetchMovieTrailer: builder.query({
        query: (movieId) => {
          return {
            url: `movie/${movieId}/videos`,
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323',
              language: 'en-US', // Skift til 'en-US', hvis du foretrækker engelske resultater
            },
            method: 'GET',
          };
        },
      }),
      fetchUpcomingMovies: builder.query({
        query: () => {
          return {
            url: 'movie/upcoming',
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323',
              language: 'en-US', // Skift til 'en-US', hvis du foretrækker engelske resultater
              region: 'US', // Begræns resultaterne til Danmark (valgfrit)
            },
            method: 'GET',
          };
        },
      }),

      // Tilføj fetchMovieDetails endpoint
      fetchMovieDetails: builder.query({
        query: (movieId) => {
          return {
            url: `movie/${movieId}`,
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323',
              language: 'en-US',
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

// Eksporter hooks til alle endpoints
export const {
  useFetchPopularMoviesQuery,
  useFetchHighestRatedMoviesQuery,
  useFetchSearchMovieQuery,
  useFetchGenresQuery,
  useFetchMovieDetailsQuery,
  useFetchMovieTrailerQuery, 
  useFetchUpcomingMoviesQuery,
} = moviesApi;

export { moviesApi };

