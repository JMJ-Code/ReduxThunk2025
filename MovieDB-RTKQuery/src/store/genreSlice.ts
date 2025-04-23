import { createSlice } from "@reduxjs/toolkit"; // Importerer createSlice fra Redux Toolkit
// Importerer createSlice fra Redux Toolkit
// Opretter en type til state-strukturen
interface GenreState {
  selectedGenre: string; // Holder det valgte genre-ID
}

// Initialiserer state med standardværdi
const initialState: GenreState = {
  selectedGenre: "", // Standardværdi: Ingen genre valgt
};

// Opretter en slice til genre-håndtering
const genreSlice = createSlice({
  name: "genre",
  initialState, // Initialiserer state med initialState
  reducers: { // Definerer reducer-funktioner
    setSelectedGenre(state, action) {
      state.selectedGenre = action.payload; // Opdaterer selectedGenre med det valgte genre-ID
    },
  },
});
 // Eksporterer reducer-funktionerne og reduceren
export const { setSelectedGenre } = genreSlice.actions;
export const genreReducer = genreSlice.reducer;