import React from 'react';
import { useParams } from 'react-router-dom'; // Bruges til at hente movieId fra URL'en
import { useFetchMovieTrailerQuery } from '../store/apis/moviesApi'; // RTK Query hook til at hente trailere

function MovieTrailer() {
  // Henter movieId fra URL-parametre
  const { movieId } = useParams<{ movieId: string }>();

  // Bruger RTK Query til at hente trailere baseret på movieId
  const { data, error, isLoading } = useFetchMovieTrailerQuery(movieId);

  // Viser loader mens trailer-data hentes
  if (isLoading) {
    return <div>Indlæser trailer...</div>;
  }

  // Viser fejlbesked hvis noget går galt
  if (error) {
    return <div>Der opstod en fejl under indlæsning af traileren.</div>;
  }

  // Finder den første YouTube-trailer blandt resultaterne
  const trailer = data?.results?.find(
    (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  // Hvis der ikke findes en gyldig trailer
  if (!trailer) {
    return <div>Ingen trailer tilgængelig for denne film.</div>;
  }

  // Hvis en trailer findes, embed den via iframe
  return (
    <div className="container mt-4">
      <h3>Trailer</h3>
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${trailer.key}`} // Indsæt trailerens YouTube-ID
        title="Filmtrailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default MovieTrailer; // Gør komponenten tilgængelig for andre filer
