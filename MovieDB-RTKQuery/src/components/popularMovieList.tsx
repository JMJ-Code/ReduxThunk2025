import { useFetchPopularMoviesQuery } from "../store";
import MovieCard from "./movieCard";
import GenreFilter from "./genreFilter";
import React from "react";

function PopularMoviesList() {
  const [selectedGenre, setSelectedGenre] = React.useState("");
  const { data, error, isFetching } = useFetchPopularMoviesQuery({});

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(genreId);
  };

  let content;

  if (isFetching) {
    content = <div>Indlæser film...</div>;
  } else if (error) {
    content = <div>Fejl ved indlæsning af film.</div>;
  } else {
    let filteredMovies = data.results;

    if (selectedGenre) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids.includes(Number(selectedGenre))
      );
    }

    content = filteredMovies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  }

  return (
    <div className="container">
      <GenreFilter onSelectGenre={handleGenreSelect} />
      <div className="row row-cols-3 row-cols-md-2 m-4">{content}</div>
    </div>
  );
}

export default PopularMoviesList;

