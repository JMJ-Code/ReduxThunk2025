import { useFetchSearchMovieQuery } from "../store"; // RTK Query hook til at hente søgeresultater
import MovieCard from "./movieCard"; // Komponent til at vise enkelt filmkort
import { useSelector, useDispatch } from "react-redux"; // Redux hooks
import React from 'react';
import { RootState } from "../store"; // Importering af RootState-typen til Redux

function SearchedMoviesList() {  
  // Henter søgetermen fra Redux state
  const searchTerm = useSelector((state: RootState) => {
    return state.searchMovie.searchTerm;
  });

  // Kalder RTK Query funktionen til at hente søgeresultater for den aktuelle søgeterm
  const { data, error, isFetching } = useFetchSearchMovieQuery(searchTerm); 

  let content;

  // Viser loading-tekst mens data hentes
  if (isFetching) {
    content = <div>Loading;</div>;
  } 
  // Viser fejlbesked hvis der opstår en fejl under hentning af data
  else if (error) {
    content = <div>Error loading movies.</div>;
  } 
  // Hvis data er hentet korrekt
  else {
    content = data.results
      .filter(movie => movie.poster_path !== null) // Filtrerer film uden plakatbillede
      .map((movie) => {
        return <MovieCard key={movie.id} movie={movie}></MovieCard>;
      });
  }

  return (
    <div className="row row-cols-3 row-cols-md-2 m-4">
      {content} {/* Viser de filtrerede filmkort */}
    </div>
  );
}

export default SearchedMoviesList;

