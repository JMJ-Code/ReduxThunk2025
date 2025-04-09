import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { moviesApi } from './apis/moviesApi';
import { searchMovieReducer, changeSearchTerm } from './searchMovieSlice';
import { myListReducer } from './myListSlice';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer, // Reducer til RTK Query
    searchMovie: searchMovieReducer,
    myList: myListReducer, // Reducer til søgning
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware), // Tilføj RTK Query middleware
});

console.log(store.getState());
console.log(searchMovieReducer);
console.log(changeSearchTerm);

setupListeners(store.dispatch);

// Eksporter hooks fra moviesApi
export {
  useFetchPopularMoviesQuery,
  useFetchHighestRatedMoviesQuery,
  useFetchSearchMovieQuery,
  useFetchGenresQuery, // Tilføjet her
} from './apis/moviesApi';

export { changeSearchTerm };
export type RootState = ReturnType<typeof store.getState>;