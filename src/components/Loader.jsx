import React from "react";
import "../styles/loader.css";

const Loader = () => {
  return (
    <div className="wrapper">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
