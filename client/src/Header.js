import React from "react";
import "./Header.css";
import image from './assets/favicon-PhotoRoom.png'


function Header() {
  return (
    <div className="header__logo">
      <img
        className="header__logo"
        src={image}
        alt=""
      />
    </div>
  );
}

export default Header;
