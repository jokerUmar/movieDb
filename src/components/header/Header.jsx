import React, { useContext, useEffect, useState, memo } from "react";
import "./header.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
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

  const [hideBool, setHideBool] = useState(false);
  const [inputShow, setInputShow] = useState(true);
  const [windowSize, setWindowSize] = useState();
  const [search_value, setSearch_value] = useState("");

  let navigate = useNavigate();

  function handleInput(e) {
    setSearch_value(e.target.value);
  }

  useEffect(() => {
    if (screen.width < 450) {
      setHideBool(true);
    }
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    if (windowSize > 450) {
      setHideBool(false);
      setInputShow(true);
    } else if (windowSize < 450) {
      setHideBool(true);
    }

    window.addEventListener("resize", handleWindowResize);
  }, [windowSize]);

  function handleSearchIcon() {
    if (screen.width < 450) {
      setInputShow(!inputShow);
      setHideBool(!hideBool);
      if (hideBool === false && search_value.trim().length > 0) {
        setHideBool(false);
        setInputShow(false);
        setSearchData(search_value.trim());
        navigate(`search/${search_value.trim()}/1`);
      } else if (hideBool === false && search_value.trim().length == 0) {
        setHideBool(true);
        setInputShow(true);
      }
    } else if (screen.width > 450 && search_value.trim().length > 0) {
      setSearchData(search_value.trim());
      navigate(`search/${search_value}/1`);
    }
  }

  function handleKeyUp(e) {
    if (e.key == "Enter" && search_value.trim().length > 0) {
      setSearchData(search_value.trim());
      navigate(`search/${search_value}/1`);
    }
  }

  return (
    <div className="header">
      <div className="container">
        <h1
          className="header_logo"
          style={inputShow ? { display: "block" } : { display: "none" }}
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
            style={hideBool ? { display: "none" } : { display: "inline-block" }}
            onKeyUp={(e) => handleKeyUp(e)}
          />
          <FontAwesomeIcon
            className="search_icon"
            icon={faMagnifyingGlass}
            onClick={handleSearchIcon}
          />
          <Microphone searchData={searchData} setSearchData={setSearchData} inputShow={inputShow} />
        </div>
      </div>

      <div className="container_movie">
        <h2 className="seacrch_genres_title">Search by genres</h2>
      </div>
    </div>
  );
}

export default memo(Header);
