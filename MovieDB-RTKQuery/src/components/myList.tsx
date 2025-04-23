import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Hooks til at tilgå og ændre Redux-state
import { RootState } from "../store"; // RootState-type for korrekt typing
import { removeMovieFromList } from "../store/myListSlice"; // Action til at fjerne film fra listen
import { Link } from "react-router-dom"; // Bruges til navigation via links

function MyList() {
  const dispatch = useDispatch();

  // Henter filmene fra "Min Liste" i Redux-state
  const myList = useSelector((state: RootState) => state.myList.movies);

  // Funktion til at fjerne film baseret på ID
  const handleRemove = (movieId: number) => {
    dispatch(removeMovieFromList(movieId));
  };

  // Hvis listen er tom, vis besked og link tilbage til forsiden
  if (myList.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h3>Din liste er tom.</h3>
        <p>Tilføj nogle film til din liste for at se dem her.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Gå til forsiden
        </Link>
      </div>
    );
  }

  // Hvis listen indeholder film, vis dem i et grid-layout
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Min Liste</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {myList.map((movie) => {
          // Sæt fallback-værdier for filmoplysninger
          const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "path/to/default-image.jpg"; // Fallback-plakat
          const title = movie.title || "Ukendt titel";
          const releaseDate = movie.release_date || "Ukendt dato";
          const overview = movie.overview || "Ingen beskrivelse tilgængelig.";

          return (
            <div className="col" key={movie.id}>
              <div className="card h-100 shadow-sm">
                {/* Klikbar plakat fører til filmens detaljer */}
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={posterPath}
                    className="card-img-top"
                    alt={`Filmplakat for ${title}`}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate" title={title}>
                    {title}
                  </h5>
                  <p className="card-text text-muted">
                    Udgivelsesdato: {releaseDate}
                  </p>
                  <p className="card-text text-muted">
                    {overview.substring(0, 100).concat("...")}
                  </p>
                  {/* Knap til at fjerne filmen fra listen */}
                  <button
                    className="btn btn-danger mt-auto"
                    onClick={() => handleRemove(movie.id)}
                  >
                    Fjern fra listen
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyList;
// Eksporterer MyList-komponenten så den kan bruges i app’en
// og i routing
