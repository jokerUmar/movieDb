import React, { memo, useContext, useEffect, useState } from "react";
import "./hero.css";
import { useParams } from "react-router";
import { MovieTypeContext } from "../../context/MovieTypeContext";
import BasicPagination from "../../components/pagination/Pagination";
import axios from "axios";
import { MovieDataContext } from "../../context/MovieDataContext";
import NotFound from "../notFound/NotFound";
import Loader from "../../components/loader/Loader";

function Hero({ api_key, activePage, setPage, setGenreId, genreId }) {
  let params = useParams();

  let { movieType, setMovieType } = useContext(MovieTypeContext);
  let { movieData, setMovieData } = useContext(MovieDataContext);

  const [movieList, setMovieList] = useState([]);
  const [LoadingData, setLoadingData] = useState(false);

  setGenreId(params.number);

  function movieListApi() {
    if (params.Movies == "MoviesByType") {
      return `https://api.themoviedb.org/3/list/${genreId}?api_key=${api_key}`;
    } else if (params.Movies == "Movies") {
      return `https://api.themoviedb.org/3/movie/${movieType}?api_key=${api_key}&language=en-US&page=${activePage}`;
    } else if (params.Movies == "search") {
      return `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=tourist&page=${activePage}`;
    }
  }

  useEffect(() => {
    setLoadingData(false);
    axios
      .get(movieListApi())
      .then((res) => {
        if (params.Movies == "Movies") {
          setMovieList(res.data.results);
        } else if (params.Movies == "MoviesByType") {
          setMovieList(res.data.items);
        }
        setMovieData({ ...res });
        setLoadingData(true);
      })
      .catch((err) => {
        console.log(err);
        setMovieList([]);
        setMovieData({});
        setLoadingData(true);
      });
  }, [movieType, activePage, genreId]);

  useEffect(() => {
    setPage(params.number * 1);
  }, []);

  console.log(movieList);

  return (
    <div className="hero">
      <div className="movie_container">
        {LoadingData ? (
          movieList.length > 0 ? (
            movieList.map((e) => {
              return (
                <>
                  <div
                    key={e.id}
                    className="card"
                    style={{
                      backgroundImage: `url( https://image.tmdb.org/t/p/w500${e.poster_path})`,
                    }}
                  >
                    <div className="info_card">
                      <div className="info_box">
                        <h3 className="info_title">{e.title}</h3>
                        <div className="info_btn">Watch</div>
                      </div>
                    </div>
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
                </>
              );
            })
          ) : (
            <NotFound />
          )
        ) : (
          <Loader />
        )}
      </div>

      {params.Movies == "Movies" ? (
        <div className="hero_pagination">
          <BasicPagination
            movieData={movieData}
            setMovieData={setMovieData}
            activePage={activePage}
            setPage={setPage}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(Hero);
