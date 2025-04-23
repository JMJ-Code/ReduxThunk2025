import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { moviesApi } from './apis/moviesApi';
import { searchMovieReducer } from './searchMovieSlice';
import { myListReducer } from './myListSlice';
import { genreReducer } from './genreSlice'; // Importer genreReducer

// Opretter Redux store
// Konfigurerer Redux store med reducerne og middleware
// Reducerne håndterer tilstandene for forskellige dele af applikationen
export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer, // Reducer til RTK Query
    searchMovie: searchMovieReducer,
    myList: myListReducer, // Reducer til søgning
    genre: genreReducer, // Tilføj genreReducer her
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware), // Tilføj RTK Query middleware
});

// Opsætning af lyttere til RTK Query
// Dette muliggør automatisk genopfriskning af data og caching
setupListeners(store.dispatch);

// Eksporter hooks fra moviesApi
export {
  useFetchPopularMoviesQuery,
  useFetchHighestRatedMoviesQuery,
  useFetchSearchMovieQuery,
  useFetchGenresQuery, // Tilføjet her
} from './apis/moviesApi';

// Eksporter reducerne fra slices
export { changeSearchTerm } from './searchMovieSlice'; // Eksporter changeSearchTerm
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;