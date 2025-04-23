import { useSelector, useDispatch } from "react-redux"; // Redux hooks til at hente og opdatere state
import { changeSearchTerm } from "../store"; // Action creator til at ændre søgetermen i state
import { useNavigate } from "react-router-dom"; // Hook til navigation mellem sider i React Router
import React from "react";

function SearchMovie() {
  const dispatch = useDispatch(); // Hook til at tilgå Redux dispatch
  const navigate = useNavigate(); // Hook til navigation
  const searchTerm = useSelector((state: any) => {
    return state.searchMovie.searchTerm; // Henter søgetermen fra Redux state
  });

  // Håndterer ændringer i søgeinput
  const handleSearchTermChange = (event) => {
    dispatch(changeSearchTerm(event.target.value)); // Opdaterer søgetermen i Redux state
  }

  // Håndterer formindsendelse (submit)
  const handleSubmit = (event) => {
    event.preventDefault(); // Forhindrer standard browserformulærindsendelse
    navigate("/searchedMovie"); // Navigerer til siden, der viser søgeresultater
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Search</label>
      <input 
        className="input ml-2" 
        value={searchTerm} 
        onChange={handleSearchTermChange} // Opdaterer søgetermen når der skrives i inputfeltet
      />
    </form>
  );
}

export default SearchMovie;
// Eksporterer SearchMovie komponenten så den kan bruges i andre filer


