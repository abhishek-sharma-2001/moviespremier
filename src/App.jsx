import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=2e9b6f85";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      console.log(data);

      if (data.Search) {
        // Fetch detailed information for each movie using IMDb ID
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const detailedResponse = await fetch(`${API_URL}&i=${movie.imdbID}`);
            const detailedData = await detailedResponse.json();
            return detailedData;
          })
        );

        setMovies(detailedMovies);
        setSearchTerm(""); // Clear the input field after searching
      } else {
        setMovies([]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>CinemaHub</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              searchMovies(searchTerm);
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {loading ? (
        <div className="loading empty">
          <h2>Please wait...</h2>
        </div>
      ) : movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
