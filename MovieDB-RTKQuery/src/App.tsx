import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PopularMoviesList from "./components/popularMovieList";
import HighestRatedMovieList from "./components/highestRatedMovieList";
import MovieImg from './assets/Image/movie_black2.jpg';
import SearchMovie from './components/searchMovie';
import SearchedMovieList from './components/searchedMovieList';
import Home from './components/home';
import MyList from './components/myList'; // Importer "Min Liste"-komponenten

function App() { 
  return (
    <div>
      <div className="jumbotron pb-3 pt-3">
        <div className="navbar navbar-expand-lg">
          <nav className="nav navbar-nav">    
            <Link to='/' className="nav-item nav-link">Home</Link>
            <Link to='/popular' className="nav-item nav-link">Popular</Link>
            <Link to='/highest-rated' className="nav-item nav-link">Highest Rated</Link>
            <Link to='/my-list' className="nav-item nav-link">My List</Link> {/* Tilføjet her */}
          </nav>
        </div> 
          <span className='h1'>React Moviefinder <img className="rounded movie_img m-3" src={MovieImg} width="75" height="75" alt="Movie Finder Logo" /></span>
          <span className="d-flex justify-content-between p-0">This small App demonstrates React, Redux-Toolkit, RTK Query and React-Router<SearchMovie/></span>
      </div>
        <Routes> 
            <Route path='/' element={<Home/>} />   
            <Route path='/popular' element={<PopularMoviesList/>} />     
            <Route path='/highest-rated' element={<HighestRatedMovieList/>} />
            <Route path='/searchedMovie' element={<SearchedMovieList/>} /> 
            <Route path='/my-list' element={<MyList />} /> {/* Tilføjet her */}
        </Routes>
    </div>
  );
}

export default App;