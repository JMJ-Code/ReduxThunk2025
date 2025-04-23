import React from 'react';
import { useFetchUpcomingMoviesQuery } from '../store/apis/moviesApi'; // Importerer API-kaldet for at hente kommende film
import { Link } from 'react-router-dom'; // Importerer Link-komponenten til navigation

function UpcomingMovies() {
  // Bruger useFetchUpcomingMoviesQuery til at hente data for kommende film
  const { data, error, isLoading, isFetching } = useFetchUpcomingMoviesQuery({});

  // Håndterer loading-tilstande
  if (isFetching) {
    return <div>Loading...</div>; // Vist når data hentes
  }

  if (isLoading) {
    return <div>Indlæser kommende film...</div>; // Vist når data er i gang med at blive hentet
  }

  if (error) {
    return <div>Der opstod en fejl under indlæsning af kommende film.</div>; // Fejlbehandling
  }

  return (
    <div className="container mt-4">
      <h2>Soon release</h2>
      <div className="row">
        {data.results.map((movie: any) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.id}>
            <div className="card">
              {/* Link til filmdetaljer baseret på filmens ID */}
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
                  Udgivelsesdato: {movie.release_date || 'Ukendt'} {/* Vist udgivelsesdato */}
                </p>
                {/* Link til at se detaljer for filmen */}
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
// Eksporterer UpcomingMovies-komponenten så den kan bruges i app’en
// og vise kommende film i et grid-layout
// og give mulighed for at klikke på filmene for at se detaljer