import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import MovieTypeProvider from "./context/MovieTypeContext.jsx";
import MovieDataProvider from "./context/MovieDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MovieDataProvider>
      <MovieTypeProvider>
        <App />
      </MovieTypeProvider>
    </MovieDataProvider>
  </BrowserRouter>
);
