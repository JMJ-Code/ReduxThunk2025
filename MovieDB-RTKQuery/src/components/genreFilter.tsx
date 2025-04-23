import React from "react"; 
import { useFetchGenresQuery } from "../store"; // RTK Query hook til at hente genrer
import { useDispatch } from "react-redux"; // Hook til at sende actions til Redux
import { changeGenreFilter } from "../store/searchMovieSlice"; // Action til at opdatere genre-filter i Redux

function GenreFilter() {
  const dispatch = useDispatch(); // Initialiserer dispatch-funktionen fra Redux
  const { data, error, isLoading } = useFetchGenresQuery({}); // Henter genrer fra API’et via RTK Query

  // Viser en besked mens data hentes
  if (isLoading) return <div>Indlæser genrer...</div>;

  // Viser fejlbesked hvis noget går galt under hentning
  if (error) return <div>Fejl ved indlæsning af genrer.</div>;

  // Håndterer ændringer i select-dropdown
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = event.target.value; // Henter valgt genreId
    console.log("Selected Genre ID:", genreId); // Debug: viser den valgte genre i konsollen
    dispatch(changeGenreFilter(genreId)); // Sender action til Redux for at opdatere filteret
  };

  return (
    <div>
      <label htmlFor="genre-select">Vælg genre:</label>
      <select id="genre-select" onChange={handleChange}>
        <option value="">Alle genrer</option> {/* Standardvalg */}
        {data?.genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name} {/* Viser genre-navnet i dropdown */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter; // Eksporterer komponenten så den kan bruges i andre filer
