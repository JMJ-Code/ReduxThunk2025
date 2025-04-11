import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchMovieTrailerQuery } from '../store/apis/moviesApi';

function MovieTrailer() {
  const { movieId } = useParams<{ movieId: string }>();
  const { data, error, isLoading } = useFetchMovieTrailerQuery(movieId);

  if (isLoading) {
    return <div>Indlæser trailer...</div>;
  }

  if (error) {
    return <div>Der opstod en fejl under indlæsning af traileren.</div>;
  }

  // Find den første trailer fra API-dataene
  const trailer = data?.results?.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');

  if (!trailer) {
    return <div>Ingen trailer tilgængelig for denne film.</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Trailer</h3>
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title="Filmtrailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default MovieTrailer;