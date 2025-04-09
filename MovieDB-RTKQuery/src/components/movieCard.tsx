import React from 'react';
import { useDispatch } from 'react-redux';
import { addMovieToList } from '../store/myListSlice';

function MovieCard({ movie }: { movie: any }) {
  const dispatch = useDispatch();
  const posterBasePath = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

  // Håndter manglende data med fallback-værdier
  const posterPath = movie.poster_path ? posterBasePath + movie.poster_path : 'path/to/default-image.jpg';
  const title = movie.title || 'Ukendt titel';
  const voteAverage = movie.vote_average || 'N/A';
  const overview = movie.overview || 'Ingen beskrivelse tilgængelig.';
  const releaseDate = movie.release_date || 'Ukendt dato';

  // Håndter tilføjelse til "Min Liste"
  const handleAddToList = () => {
    dispatch(addMovieToList(movie));
  };

  return (
    <div className="col-lg-2 mb-4">
      <div className="card">
        <img src={posterPath} className="card-img-top" alt={`Filmplakat for ${title}`} />
        <div className="card-body">
          <h5 className="card-title">
            <span>{title.substring(0, 200)}</span>
          </h5>
          <span className="far fa-star" aria-hidden="true"></span>
          <span className="ml-1">{voteAverage}</span>
          <p className="card-text">{overview.substring(0, 125).concat('...')}</p>
          <div className="d-flex justify-content-between p-0">
            <span className="far fa-calendar" aria-hidden="true">
              {releaseDate}
            </span>
            <span className="far fa-play-circle"></span>
          </div>
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

export default MovieCard;