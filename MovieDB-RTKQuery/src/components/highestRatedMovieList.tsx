import { useFetchHighestRatedMoviesQuery } from "../store"; // RTK Query hook til at hente højest bedømte film
import MovieCard from "./movieCard"; // Komponent der viser én film
import React from 'react'; // Import af React

function HighestRatedMovieList() {                                    
  const { data, error, isFetching } = useFetchHighestRatedMoviesQuery({}); 
  // Henter data fra API’et via RTK Query. Returnerer:
  // - data: Filmdata
  // - error: Fejlstatus
  // - isFetching: Om data stadig hentes

  let content; // Variabel til at indeholde det indhold, der skal vises i UI’et

  if (isFetching) {
    content = <div>Loading;</div>; // Vis loading-besked hvis data hentes
  } else if (error) {
    content = <div>Error loading movies.</div>; // Vis fejlbesked hvis der er fejl
  } else {
    content = data.results
      .filter(movie => movie.poster_path !== null && movie.vote_average !== 0) 
      // Filtrer film uden billede eller med 0 i bedømmelse
      .map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />; 
        // Returnér en MovieCard-komponent for hver film
      });
  }

  return (
    <div className="row row-cols-3 row-cols-md-2 m-4">
      {/* Bootstrap-grid layout der viser filmene */}
      {content}
    </div>
  );
}

export default HighestRatedMovieList; // Eksporterer komponenten så den kan bruges i andre filer

