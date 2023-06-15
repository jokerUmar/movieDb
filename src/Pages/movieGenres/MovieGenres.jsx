import React, { useContext } from "react";
import "./movieGenres.css";
import { useParams } from "react-router";
import { MovieTypeContext } from "../../context/MovieTypeContext";
import { MovieListContext } from "../../context/MovieLIstContext";

function MovieGenres({ setGenreId }) {
  // state
  let { setMovieType } = useContext(MovieTypeContext);
  let { setMovieList, movieList } = useContext(MovieListContext);

  // params

  const params = useParams();
  setMovieType(params.MoviesByType);
  setGenreId(params.id);

  console.log(movieList);

  return (
    <div className="hero">
      <div className="movie_container">
        {movieList.data.item_count > 0 ? (
          movieList.data.items.map((e) => {
            return (
              <div
                key={e.id}
                className="card"
                style={{
                  backgroundImage: `url( https://image.tmdb.org/t/p/w500${e.poster_path})`,
                }}
              >
                <article className="movies_rating">
                  <span style={{ fontSize: "18px", fontWeight: "600" }}>
                    {e.vote_average}
                  </span>
                  <span>🔥</span>
                </article>

                <article className="movies_year">
                  <p>{e.release_date.split("").slice(0, 4).join("")}</p>
                </article>
              </div>
            );
          })
        ) : (
          <h1
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            No data
          </h1>
        )}
      </div>
    </div>
  );
}

export default MovieGenres;
