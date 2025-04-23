import MovieImg from '../assets/Image/movie_black2.jpg'; // Importerer forsidebilledet
import React from 'react'; // Import af React bibliotek
import { useFetchPopularMoviesQuery } from "../store"; // RTK Query hook til at hente populære film fra API
import MovieCard from "./movieCard"; // Komponent der viser en film som et kort

function Home() {
  const { data, isLoading, error } = useFetchPopularMoviesQuery({});
  // Hooket henter data om populære film og returnerer:
  // - data: Filmlisten
  // - isLoading: True hvis den stadig henter
  // - error: Fejlstatus hvis noget går galt

  let previewMovies; // Bruges til at lagre det indhold, vi viser i UI

  if (isLoading) {
    // Hvis filmene stadig hentes, vis loading-besked
    previewMovies = <div>Indlæser populære film...</div>;
  } else if (error) {
    // Hvis der opstod en fejl under hentning, vis fejlbesked
    previewMovies = <div>Kunne ikke hente film.</div>;
  } else {
    // Når data er klar, tag de første 3 film og vis dem med MovieCard
    previewMovies = data.results.slice(0, 3).map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  }

  return (
    <div className='container text-center'>
      <div className='Logo'>MovieFinder</div> {/* Titel/logo på forsiden */}

      {/* Forsidebillede */}
      <img className="rounded movie_img" src={MovieImg} width="450" height="450" />

      {/* Forfatterens navn */}
      <div className='Logo2 mt-5'>by Henrik Høltzer</div>

      {/* Sektion for top 3 populære film */}
      <h3 className="mt-5">Top 3 Populære Film</h3>
      <div className="row row-cols-1 row-cols-md-3 justify-content-center mt-3">
        {previewMovies} {/* Viser enten filmene eller en statusbesked */}
      </div>
    </div>
  );
}

export default Home; // Eksporterer Home-komponenten så den kan bruges i app’en

