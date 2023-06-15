import React from "react";
import "./access.css";
import { Loader } from "@mantine/core";

function Access() {
  return (
    <>
      <div className="access">
        <div className="container">
          <div className="access_header">
            <Loader color="red" size="lg" />
          </div>

          <div className="access_body">
            <h1>Movea</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Access;
