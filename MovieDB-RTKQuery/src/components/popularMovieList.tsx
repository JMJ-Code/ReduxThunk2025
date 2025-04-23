import React from "react";
import { useSelector } from "react-redux"; // Hook til at læse fra Redux-state
import { RootState } from "../store"; // Typing til Redux state
import { useFetchPopularMoviesQuery } from "../store"; // RTK Query hook til at hente populære film
import MovieCard from "./movieCard"; // Komponent til at vise enkelt filmkort
import GenreFilter from "./genreFilter"; // Komponent til filtrering baseret på genre

function PopularMoviesList() {
  // Henter det valgte genre-filter fra Redux
  const genreFilter = useSelector((state: RootState) => state.searchMovie.genreFilter);

  // Kalder API'et via RTK Query for at hente populære film
  const { data, error, isFetching } = useFetchPopularMoviesQuery({});

  let content;

  // Viser en loading-tekst mens data hentes
  if (isFetching) {
    content = <div>Indlæser film...</div>;
  } 
  // Viser fejlbesked hvis noget gik galt
  else if (error) {
    content = <div>Fejl ved indlæsning af film.</div>;
  } 
  // Hvis data er hentet korrekt
  else {
    let filteredMovies = data.results;

    // Hvis der er valgt et genre-filter, filtrer filmene baseret på genre-id
    if (genreFilter) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids.includes(Number(genreFilter))
      );
    }

    // Map hver film til et MovieCard
    content = filteredMovies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  }

  return (
    <div className="container">
      <GenreFilter /> {/* Genre-filter dropdown */}
      <div className="row row-cols-3 row-cols-md-2 m-4">
        {content} {/* Filmkort vises her */}
      </div>
    </div>
  );
}

export default PopularMoviesList;
// Eksporterer komponenten så den kan bruges i andre filer
// Dette er en React komponent der viser en liste af populære film og giver mulighed for at filtrere dem baseret på genre
