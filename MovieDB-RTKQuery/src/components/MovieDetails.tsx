import React from 'react';
import { useParams } from 'react-router-dom'; // Henter URL-parametre (f.eks. movieId)
import { useFetchMovieDetailsQuery } from '../store/apis/moviesApi'; // RTK Query til at hente detaljer for en film
import MovieTrailer from './MovieTrailer'; // Importerer komponenten der viser traileren

function MovieDetails() {
  // Ekstraherer movieId fra URL'en (routedynamik)
  const { movieId } = useParams<{ movieId: string }>();

  // Henter filmdetaljer med RTK Query hook baseret på movieId
  const { data: movie, error, isLoading } = useFetchMovieDetailsQuery(movieId);

  // Vis loader mens data hentes
  if (isLoading) {
    return <div>Indlæser...</div>;
  }

  // Vis fejlbesked hvis noget gik galt under hentning
  if (error) {
    return <div>Der opstod en fejl under indlæsning af filmdetaljer.</div>;
  }

  // Returner layout med filmens info
  return (
    <div className="container mt-4">
      <h2>{movie.title}</h2>

      {/* Filmplakat */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="img-fluid mb-4"
      />

      {/* Forskellige metadata om filmen */}
      <p><strong>Udgivelsesdato:</strong> {movie.release_date}</p>
      <p><strong>Vurdering:</strong> {movie.vote_average}</p>
      <p><strong>Original Sprog:</strong> {movie.original_language}</p>
      <p><strong>Handling:</strong> {movie.overview || 'Ingen beskrivelse tilgængelig.'}</p>

      {/* Trailer-komponent placeres her */}
      <MovieTrailer />
    </div>
  );
}

export default MovieDetails; // Eksporterer komponenten så den kan bruges i routes
