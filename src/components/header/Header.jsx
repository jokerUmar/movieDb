import React, { useContext, useEffect, useState } from "react";
import "./header.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import Microphone from "../microphone/Microphone";
import { MovieTypeContext } from "../../context/MovieTypeContext";

function Header({ searchBool, setSearchBool, activePage, setPage }) {
  const styleEl = {
    textDecoration: "none",
    fontSize: "18px",
    color: "#ced6e0",
  };

  let { movieType, setMovieType } = useContext(MovieTypeContext);

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [hideBool, setHideBool] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);

  window.addEventListener("resize", function () {
    if (windowSize > 451) {
      setSearchBool(false);
      setHideBool(false);
    } else if (windowSize < 451) {
      setSearchBool(true);
    }
  });

  function handleSearchIcon() {
    if (windowSize < 451) {
      setSearchBool(!searchBool);
      setHideBool(!hideBool);
    } else if (windowSize > 451) {
      setSearchBool(false);
      setHideBool(false);
    }
  }

  return (
    <div className="header">
      <div className="container">
        <h1
          className="header_logo"
          style={hideBool ? { display: "none" } : { display: "inline-block" }}
        >
          Movea
        </h1>
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
            >
              Popular
            </NavLink>
          </li>
          <li className="header_item">
            <NavLink
              style={styleEl}
              to={"/Movies/upcoming/" + activePage}
              className={({ isActive }) =>
                isActive
                  ? "header_active header_navlink"
                  : "header_unActive header_navlink"
              }
            >
              Upcoming
            </NavLink>
          </li>
          <li className="header_item">
            <NavLink
            style={styleEl}
              to={"/Movies/top_rated/" + activePage}
              className={({ isActive }) =>
                isActive
                  ? "header_active header_navlink"
                  : "header_unActive header_navlink"
              }
            >
              Top Rated
            </NavLink>
          </li>
        </ul>
        <div
          className="header_search"
          style={searchBool ? { maxWidth: "100px" } : { maxWidth: "300px" }}
        >
          <input
            className="header_input"
            type="text"
            placeholder="type something"
            style={
              searchBool ? { display: "none" } : { display: "inline-block" }
            }
          />
          <FontAwesomeIcon
            className="search_icon"
            icon={faMagnifyingGlass}
            onClick={handleSearchIcon}
          />

          <Microphone hideBool={hideBool} />
        </div>
      </div>

      <div className="container_movie">
        <h2 className="seacrch_genres_title">Search by genres</h2>
      </div>
    </div>
  );
}

export default Header;
