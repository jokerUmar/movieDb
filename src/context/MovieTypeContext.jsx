import { createContext, useState } from "react";

export const MovieTypeContext = createContext();

const MovieTypeProvider = ({ children }) => {
  const [movieType, setMovieType] = useState("popular");

  return <MovieTypeContext.Provider value={{movieType, setMovieType}}>{children}</MovieTypeContext.Provider>;
};

export default MovieTypeProvider;
