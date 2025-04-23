import React from 'react';
import { useDispatch } from 'react-redux'; // Bruges til at sende actions til Redux store
import { Link } from 'react-router-dom'; // Til navigation via links
import { addMovieToList } from '../store/myListSlice'; // Action til at tilføje film til "Min Liste"

function MovieCard({ movie }: { movie: any }) {
  const dispatch = useDispatch(); // Initialiserer dispatch-funktionen fra Redux

  const posterBasePath = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'; // Base-URL for filmplakater

  // Debug-log – viser hele movie-objektet i konsollen
  console.log(movie);

  // Fallback-værdier i tilfælde af manglende data
  const posterPath = movie.poster_path ? posterBasePath + movie.poster_path : 'path/to/default-image.jpg';
  const title = movie.title || 'Ukendt titel';
  const voteAverage = movie.vote_average || 'N/A';
  const overview = movie.overview || 'Ingen beskrivelse tilgængelig.';
  const releaseDate = movie.release_date || 'Ukendt dato';

  // Funktion til at tilføje film til "Min Liste"
  const handleAddToList = () => {
    dispatch(addMovieToList(movie)); // Udløser Redux-action med hele filmobjektet
  };

  return (
    <div className="col-lg-2 mb-4"> {/* Responsiv kolonne med margin-bottom */}
      <div className="card"> {/* Bootstrap card til visning af film */}
        
        {/* Klikbart billede/link til filmens detaljer */}
        <Link to={`/movie/${movie.id}`}>
          <img src={posterPath} className="card-img-top" alt={`Filmplakat for ${title}`} />
        </Link>

        <div className="card-body">
          <h5 className="card-title">
            {/* Klikbart titel-link */}
            <Link to={`/movie/${movie.id}`} className="text-decoration-none">
              {title.substring(0, 200)}
            </Link>
          </h5>

          {/* Vis gennemsnitlig bedømmelse */}
          <span className="far fa-star" aria-hidden="true"></span>
          <span className="ml-1">{voteAverage}</span>

          {/* Kort beskrivelse af filmen */}
          <p className="card-text">{overview.substring(0, 125).concat('...')}</p>

          {/* Vis udgivelsesdato og en "play"-ikon */}
          <div className="d-flex justify-content-between p-0">
            <span className="far fa-calendar" aria-hidden="true">
              {releaseDate}
            </span>
            <span className="far fa-play-circle"></span>
          </div>

          {/* Knap til at tilføje film til brugerens liste */}
          <button
            className="btn btn-primary mt-3 w-100"
            onClick={handleAddToList}
          >
            Tilføj til Min Liste
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard; // Eksporterer komponenten til brug andre steder i app'en
