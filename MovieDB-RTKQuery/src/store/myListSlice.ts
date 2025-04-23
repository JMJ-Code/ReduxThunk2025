import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Movie interface
interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  [key: string]: any;
}

// MyListState interface
interface MyListState {
  movies: Movie[];
}

// Hent data fra Local Storage
const loadFromLocalStorage = (): Movie[] => {
  const data = localStorage.getItem("myListMovies");
  return data ? JSON.parse(data) : [];
};

// Initialiserer state med data fra Local Storage
const initialState: MyListState = {
  movies: loadFromLocalStorage(),
};

// Opretter en slice til håndtering af "myList" state
const myListSlice = createSlice({
  name: "myList",
  initialState,
  reducers: {
    addMovieToList(state, action: PayloadAction<Movie>) {
      const movieExists = state.movies.find((movie) => movie.id === action.payload.id);
      if (!movieExists) {
        state.movies.push(action.payload);
        // Gem i Local Storage
        localStorage.setItem("myListMovies", JSON.stringify(state.movies));
      }
    },
    removeMovieFromList(state, action: PayloadAction<number>) {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
      // Opdater Local Storage
      localStorage.setItem("myListMovies", JSON.stringify(state.movies));
    },
  },
});

// Eksporter reducerne og actions
export const { addMovieToList, removeMovieFromList } = myListSlice.actions;
export const myListReducer = myListSlice.reducer;