import React from "react";
import "../styles/HeaderStyle.scss";
import Search from "./Search";
import HeaderNav from "../../commons/HeaderNav/HeaderNav";

function Header (props) {

  const { handleOpenRegisterForm, handleOpenLoginForm } = props;

  return(
    <div className="header-wrapper">
      <HeaderNav handleOpenRegisterForm={handleOpenRegisterForm} handleOpenLoginForm={handleOpenLoginForm} />
      <div className="slogan">
        <div className="content">Let's The World Together!</div>
        <div className="sub-content">Find awesome hotel, tour, car and activities in London</div>
      </div>
      <Search />
    </div>
  )
}
export default Header;