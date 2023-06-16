import React, { useContext, useEffect, useState } from "react";
import "./movieShow.css";
import { useNavigate, useParams } from "react-router";
import { MovieDataContext } from "../../context/MovieDataContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Slider2 from "../../components/slider2/Slider2";

function MovieShow({ api_key }) {
  let params = useParams();
  let navigate = useNavigate();

  const [movieInfo, setMovieInfo] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${api_key}&append_to_response=videos`
      )
      .then((res) => {
        setMovieInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="show">
      <div className="container">
        <article className="out" onClick={() => navigate(-1)}>
          <FontAwesomeIcon
            style={{ fontSize: "20px" }}
            icon={faCircleArrowLeft}
          />
          <span>Go back</span>
        </article>
        <div className="parent_screen">
          <img
            className="baclkdrop_image"
            src={
              movieInfo?.data?.backdrop_path &&
              "https://image.tmdb.org/t/p/original" +
                movieInfo.data.backdrop_path
            }
          />

          <div className="movie_info">
            <img
              src={
                movieInfo?.data?.poster_path
                  ? "https://image.tmdb.org/t/p/w500" +
                    movieInfo.data.poster_path
                  : ""
              }
              className="movie_info_img"
            />
            <div className="movie-right_box">
              <h1 className="movie_info_title">
                {movieInfo?.data?.original_title
                  ? movieInfo.data.original_title
                  : "no title"}
              </h1>
              <p className="movie_info_overview">
                {movieInfo?.data?.overview
                  ? movieInfo.data.overview
                  : "no description"}
              </p>
              <article className="movie_info_genres-box">
                <span className="movie_info_average">
                  {movieInfo?.data?.vote_average
                    ? movieInfo.data.vote_average
                    : "no info"}
                  🔥
                </span>

                <div className="movie_genres-box">
                  {movieInfo?.data?.genres &&
                    movieInfo.data.genres.map((e) => (
                      <div
                        className="movie_info_genre"
                        key={movieInfo?.data?.id ? movieInfo.data.id : ""}
                      >
                        <p>{e.name}</p>
                      </div>
                    ))}
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="video_box">
          {movieInfo?.data?.videos?.results?.length ? (
            <h1 className="video_title">Videos</h1>
          ) : (
            <h1 className="video_title">no videos</h1>
          )}
          {movieInfo?.data?.videos?.results?.length ? (
            <Slider2 movieInfo={movieInfo} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieShow;
