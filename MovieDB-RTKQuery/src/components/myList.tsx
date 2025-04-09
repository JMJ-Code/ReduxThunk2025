import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeMovieFromList } from "../store/myListSlice";
import MovieCard from "./movieCard";



function MyList() {
  const dispatch = useDispatch();
const myList = useSelector((state: RootState) => state.myList.movies);

  const handleRemove = (movieId: number) => {
    dispatch(removeMovieFromList(movieId));
  };

  if (myList.length === 0) {
    return <div className="container">Din liste er tom.</div>;
  }

  return (
    <div className="container">
      <h3>Min Liste</h3>
      <div className="row row-cols-3 row-cols-md-2 m-4">
        {myList.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
            <button
              className="btn btn-danger mt-2"
              onClick={() => handleRemove(movie.id)}
            >
              Fjern fra listen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyList;