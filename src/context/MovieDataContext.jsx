import { createContext, useState } from "react";

export const MovieDataContext = createContext();

const MovieDataProvider = ({ children }) => {
  const [movieData, setMovieData] = useState({});

  return (
    <MovieDataContext.Provider value={{ movieData, setMovieData }}>
      {children}
    </MovieDataContext.Provider>
  );
};

export default MovieDataProvider;
