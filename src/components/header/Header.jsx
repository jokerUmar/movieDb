import React, { useContext, useEffect, useState, memo } from "react";
import "./header.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import Microphone from "../microphone/Microphone";
import { MovieTypeContext } from "../../context/MovieTypeContext";
import { SearchListContext } from "../../context/SearchListContext";

function Header() {
  const styleEl = {
    textDecoration: "none",
    fontSize: "18px",
    color: "#ced6e0",
  };

  let { movieType, setMovieType } = useContext(MovieTypeContext);
  let { searchData, setSearchData } = useContext(SearchListContext);

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [hideBool, setHideBool] = useState(false);
  const [inputShow, setInputShow] = useState(true);

  function handleInput(e) {
    setSearchData(e.target.value);
  }

  function handleSearchIcon() {}

  return (
    <div className="header">
      <div className="container">
        <h1 className="header_logo">Movea</h1>
        <ul className="header_list">
          <li className="header_item">
            <NavLink
              style={styleEl}
              to={"/Movies/popular"}
              className={({ isActive }) =>
                isActive
                  ? "header_active header_navlink"
                  : "header_unActive header_navlink"
              }
              onClick={() => setMovieType("popular")}
            >
              Popular
            </NavLink>
          </li>
          <li className="header_item">
            <NavLink
              style={styleEl}
              to={"/Movies/upcoming"}
              className={({ isActive }) =>
                isActive
                  ? "header_active header_navlink"
                  : "header_unActive header_navlink"
              }
              onClick={() => setMovieType("upcoming")}
            >
              Upcoming
            </NavLink>
          </li>
          <li className="header_item">
            <NavLink
              style={styleEl}
              to={"/Movies/top_rated"}
              className={({ isActive }) =>
                isActive
                  ? "header_active header_navlink"
                  : "header_unActive header_navlink"
              }
              onClick={() => setMovieType("top_rated")}
            >
              Top Rated
            </NavLink>
          </li>
        </ul>
        <div className="header_search">
          <input
            className="header_input"
            type="text"
            placeholder="type something"
            onChange={(e) => handleInput(e)}
          />
          <FontAwesomeIcon
            className="search_icon"
            icon={faMagnifyingGlass}
            onClick={handleSearchIcon}
          />

          <Microphone />
        </div>
      </div>

      <div className="container_movie">
        <h2 className="seacrch_genres_title">Search by genres</h2>
      </div>
    </div>
  );
}

export default memo(Header);
