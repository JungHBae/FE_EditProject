import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="selection">
      <Link to="matching">매칭</Link>
      <Link to="board">계시판</Link>
    </div>
  );
};
