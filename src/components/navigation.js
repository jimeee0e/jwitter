import React from "react";
import { Link } from "react-router-dom";

//home으로 가는 링크랑 유저 profile로 가는 링크
const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
