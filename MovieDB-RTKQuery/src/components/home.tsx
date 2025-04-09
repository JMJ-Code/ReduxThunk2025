import MovieImg from '../assets/Image/movie_black2.jpg';
import React from 'react';
import { useFetchPopularMoviesQuery } from "../store";
import MovieCard from "./movieCard";

function Home() {
  const { data, isLoading, error } = useFetchPopularMoviesQuery({});

  let previewMovies;
  if (isLoading) {
    previewMovies = <div>Indlæser populære film...</div>;
  } else if (error) {
    previewMovies = <div>Kunne ikke hente film.</div>;
  } else {
    previewMovies = data.results.slice(0, 3).map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  }

  return (
    <div className='container text-center'>
      <div className='Logo'>MovieFinder</div>
      <img className="rounded movie_img" src={MovieImg} width="450" height="450" />
      <div className='Logo2 mt-5'>by Henrik Høltzer</div>

      {/* Ny sektion med populære film */}
      <h3 className="mt-5">Top 3 Populære Film</h3>
      <div className="row row-cols-1 row-cols-md-3 justify-content-center mt-3">
        {previewMovies}
      </div>
    </div>
  );
}

export default Home;
