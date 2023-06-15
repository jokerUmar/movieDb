import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Access from "./components/access/Access";
import { Navigate, Route, Routes, useLocation,  } from "react-router";
import Header from "./components/header/Header";
import SimpleSlider from "./components/slider/Slider";
import Footer from "./components/footer/Footer";
import Hero from "./Pages/hero/Hero";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchBool, setSearchBool] = useState(false);
  const [genreList, setGenreList] = useState([]);
  const [genreId, setGenreId] = useState(1);
  const [activePage, setPage] = useState(1);

  const api_key = "7b0558c3cbe306f177068007b6078d3a";

  function timeLoading() {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }

  function genreListApi() {
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en`;
  }

  useEffect(() => {
    setLoading(false);
    axios
      .get(genreListApi())
      .then((res) => {
        setGenreList(res.data.genres);
        timeLoading();
      })
      .catch((err) => console.log("genre :", err));
  }, []);

  return (
    <>
      {!loading ? (
        ""
      ) : (
        <>
          <Header
            activePage={activePage}
            searchBool={searchBool}
            setSearchBool={setSearchBool}
            setPage={setPage}
          />
          <div className="container_movie">
            <SimpleSlider genreList={genreList} />
          </div>
        </>
      )}

      <Routes>
        // Navigate
        <Route
          path="/Movies/popular"
          element={<Navigate replace to={"/Movies/popular/1"} />}
        />
        <Route
          path="/Movies"
          element={<Navigate replace to={"/Movies/popular/1"} />}
        />
        <Route
          path="/Movies/upcoming"
          element={<Navigate replace to={"/Movies/upcoming/1"} />}
        />
        <Route
          path="/Movies/top_rated"
          element={<Navigate replace to={"/Movies/top_rated/1"} />}
        />
        <Route
          path="/MoviesByType/Genres"
          element={<Navigate replace to="/MoviesByType/Genres" />}
        />
        <Route
          path="/"
          element={<Navigate replace to={"/Movies/popular/1"} />}
        />
        // components
        <Route
          path={`/:Movies/:MovieType/:number`}
          element={
            loading ? (
              <Hero
                api_key={api_key}
                activePage={activePage}
                setPage={setPage}
                genreId={genreId}
                setGenreId={setGenreId}
              />
            ) : (
              <Access />
            )
          }
        ></Route>
      </Routes>

      {!loading ? (
        ""
      ) : (
        <>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
