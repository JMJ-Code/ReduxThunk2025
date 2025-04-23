import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Import af nødvendige funktioner fra RTK Query

const moviesApi = createApi({
  reducerPath: 'movies', // Angiver reducer-path for API'en i Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.themoviedb.org/3/', // Base URL for API'en
  }),
  endpoints(builder) {
    return {
      // Endpoint for at hente populære film
      fetchPopularMovies: builder.query({
        query: () => {
          return {
            url: 'movie/popular',
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323', // API-nøgle til TMDB
            },
            method: 'GET',
          };
        },
      }),

      // Endpoint for at hente top-rated film
      fetchHighestRatedMovies: builder.query({
        query: () => {
          return {
            url: 'movie/top_rated',
            params: {
              sort_by: 'vote_average.desc', // Sortering efter gennemsnitlig vurdering
              api_key: '81c50c197b83129dd4fc387ca6c8c323', // API-nøgle til TMDB
            },
            method: 'GET',
          };
        },
      }),

      // Endpoint for at søge film baseret på søgeterm
      fetchSearchMovie: builder.query({
        query: (searchTerm) => {
          return {
            url: 'search/movie',
            params: {
              query: searchTerm, // Søgeterm
              api_key: '81c50c197b83129dd4fc387ca6c8c323', // API-nøgle til TMDB
            },
            method: 'GET',
          };
        },
      }),

      // Endpoint for at hente filmgenrer
      fetchGenres: builder.query({
        query: () => {
          return {
            url: 'genre/movie/list',
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323', // API-nøgle til TMDB
              language: 'en-US', // Sprog for resultater
            },
            method: 'GET',
          };
        },
      }),

      // Endpoint for at hente filmtrailer baseret på film-ID
      fetchMovieTrailer: builder.query({
        query: (movieId) => {
          return {
            url: `movie/${movieId}/videos`, // Trailer-relateret data
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323', // API-nøgle til TMDB
              language: 'en-US', // Sprog for resultater
              region: 'US', // Region, kan ændres til en ønsket region
            },
            method: 'GET',
          };
        },
      }),

      // Endpoint for at hente kommende film
      fetchUpcomingMovies: builder.query({
        query: () => {
          return {
            url: 'movie/upcoming', // Kommende film
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323', // API-nøgle til TMDB
              language: 'en-US', // Sprog for resultater
              region: 'US', // Region
            },
            method: 'GET',
          };
        },
      }),

      // Endpoint for at hente filmdetaljer baseret på film-ID
      fetchMovieDetails: builder.query({
        query: (movieId) => {
          return {
            url: `movie/${movieId}`, // Filmdetaljer
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323', // API-nøgle til TMDB
              language: 'en-US', // Sprog for resultater
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

// Eksporter hooks til de enkelte endpoints for at kunne bruge dem i komponenter
export const {
  useFetchPopularMoviesQuery,
  useFetchHighestRatedMoviesQuery,
  useFetchSearchMovieQuery,
  useFetchGenresQuery,
  useFetchMovieDetailsQuery,
  useFetchMovieTrailerQuery,
  useFetchUpcomingMoviesQuery,
} = moviesApi;

export { moviesApi }; // Eksporterer selve API'en
// Dette gør det muligt at bruge den i andre filer, f.eks. i store/index.ts
// og i komponenter til at hente data fra API'en


