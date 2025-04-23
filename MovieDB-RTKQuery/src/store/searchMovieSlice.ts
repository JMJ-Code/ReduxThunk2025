import { createSlice } from '@reduxjs/toolkit';

// Importer createSlice fra Redux Toolkit
const searchMovieSlice = createSlice({
    name: 'searchMovie',
    initialState: {
        searchTerm: '',
        genreFilter: '' // Added genreFilter to the initial state
    },
    // Define the reducers
    reducers: {
        changeSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        changeGenreFilter(state, action) { // New reducer for genreFilter
            state.genreFilter = action.payload;
        }
    }
});

// Exporting the actions
export const { changeSearchTerm, changeGenreFilter } = searchMovieSlice.actions;
export const searchMovieReducer = searchMovieSlice.reducer; // Combined reducers