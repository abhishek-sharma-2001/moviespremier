import React, { useState } from "react";
import "./App.css";

const MovieCard = ({ movie }) => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div
        className={`movie ${showPopup ? "blurred" : ""}`}
        onClick={openPopup}
      >
        <div>
          <p>{movie.Year}</p>
        </div>
        <div>
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https:via.placeholder.com/400"
            }
            alt={movie.Title}
          />
        </div>
        <div>
          <span>{movie.Type}</span>
          <h3>{movie.Title}</h3>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{movie.Title}</h2>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https:via.placeholder.com/400"
              }
              alt={movie.Title}
            />
            <p>{movie.Plot}</p>
            <p>
              <span>Director:</span> {movie.Director}
            </p>
            <p>
              <span>Actors:</span> {movie.Actors}
            </p>
            <p>
              <span>Genre:</span> {movie.Genre}
            </p>
            <p>
              <span>Released:</span> {movie.Released}
            </p>
            <p>
              <span>IMDb Rating:</span> {movie.imdbRating}
            </p>

            <a
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on IMDb
            </a>
            <span> </span>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
