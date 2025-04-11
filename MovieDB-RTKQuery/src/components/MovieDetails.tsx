import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchMovieDetailsQuery } from '../store/apis/moviesApi';
import MovieTrailer from './MovieTrailer'; // Importer MovieTrailer-komponenten

function MovieDetails() {
  const { movieId } = useParams<{ movieId: string }>();
  const { data: movie, error, isLoading } = useFetchMovieDetailsQuery(movieId);

  if (isLoading) {
    return <div>Indlæser...</div>;
  }

  if (error) {
    return <div>Der opstod en fejl under indlæsning af filmdetaljer.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="img-fluid mb-4"
      />
      <p><strong>Udgivelsesdato:</strong> {movie.release_date}</p>
      <p><strong>Vurdering:</strong> {movie.vote_average}</p>
      <p><strong>Original Sprog:</strong> {movie.original_language}</p>
      <p><strong>Handling:</strong> {movie.overview || 'Ingen beskrivelse tilgængelig.'}</p>

      {/* Tilføj MovieTrailer-komponenten */}
      <MovieTrailer />
    </div>
  );
}

export default MovieDetails;