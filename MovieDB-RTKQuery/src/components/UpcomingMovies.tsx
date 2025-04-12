import React from 'react';
import { useFetchUpcomingMoviesQuery } from '../store/apis/moviesApi';
import { Link } from 'react-router-dom';

function UpcomingMovies() {
  const { data, error, isLoading } = useFetchUpcomingMoviesQuery();

  if (isLoading) {
    return <div>Indlæser kommende film...</div>;
  }

  if (error) {
    return <div>Der opstod en fejl under indlæsning af kommende film.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Soon realese</h2>
      <div className="row">
        {data.results.map((movie: any) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.id}>
            <div className="card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  Udgivelsesdato: {movie.release_date || 'Ukendt'}
                </p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                  Se detaljer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingMovies;