import React from "react";
import { Link } from "react-router-dom";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

//home으로 가는 링크랑 유저 profile로 가는 링크
const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li>
        <Link
          to="/"
          style={{ marginRight: 10 }}>
          <AiFillTwitterCircle
            color={"#04AAFF"}
            size="40"
          />
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}>
          <BsPersonCircle
            color={"#04AAFF"}
            size="35"

            // size="2x"
          />
          <span style={{ marginTop: 10 }}>
            {userObj.displayName
              ? `${userObj.displayName}'s Profile`
              : "Profile"}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
