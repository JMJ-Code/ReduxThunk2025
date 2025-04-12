import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  [key: string]: any;
}

interface MyListState {
  movies: Movie[];
}

const initialState: MyListState = {
  movies: [],
};

const myListSlice = createSlice({
  name: "myList",
  initialState,
  reducers: {
    addMovieToList(state, action: PayloadAction<Movie>) {
      const movieExists = state.movies.find((movie) => movie.id === action.payload.id);
      if (!movieExists) {
        state.movies.push(action.payload);
      }
    },
    removeMovieFromList(state, action: PayloadAction<number>) {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addMovieToList, removeMovieFromList } = myListSlice.actions;
export const myListReducer = myListSlice.reducer; // Eksporter reduceren med navngiven eksportksporter reduceren med navngiven eksport