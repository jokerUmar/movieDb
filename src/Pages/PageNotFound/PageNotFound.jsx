import React from "react";

function PageNotFound() {
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            backgroundColor: "black",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: "99",
            top: "0",
            left: "0",
            textAlign: "center",
          }}
        >
          404 NOT FOUND
        </h1>
      </div>
    </>
  );
}

export default PageNotFound;
