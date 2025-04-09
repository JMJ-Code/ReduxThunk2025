import React from "react";
import { useFetchGenresQuery } from "../store";

interface Genre {
  id: number;
  name: string;
}

interface GenreFilterProps {
  onSelectGenre: (genreId: string) => void;
}

function GenreFilter({ onSelectGenre }: GenreFilterProps) {
  const { data, error, isLoading } = useFetchGenresQuery({});

  console.log({ data, error, isLoading }); // Debugging

  if (isLoading) return <div>Indlæser genrer...</div>;
  if (error) return <div>Fejl ved indlæsning af genrer.</div>;
  if (!data?.genres || data.genres.length === 0) {
    return <div>Ingen genrer fundet.</div>;
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = event.target.value;
    onSelectGenre(genreId); // sender valgt genre-id tilbage til parent
  };

  return (
    <div className="m-3">
      <label htmlFor="genre-select" className="form-label fw-bold">
        Vælg genre:
      </label>
      <select className="form-select" id="genre-select" onChange={handleChange}>
        <option value="">Alle genrer</option>
        {data.genres.map((genre: Genre) => (
          <option key={genre.id} value={genre.id.toString()}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
