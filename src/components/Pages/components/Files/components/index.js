import React from "react";
import ToggleNav from "../../../../../commons/ToggleNav";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import { useSelector } from "react-redux";
import "../styles/index.scss";
import FileLeftContent from "./FileLeftContent";
import FileRightContent from "./FileRightContent";

function Files(props) {
  const isExpand = useSelector((state) => state.global.isExpand);
  return (
    <>
      <ToggleNav />
      <div className={`files-wrapper ${isExpand ? "menu-expand" : ""}`}>
        <HeaderNav />
        <div className="content-header">
          <div className="header-icon-set project-header__summary">
            <div className="header-icon-set__icon">
              <a href="">
                <img src={ORG_IMAGE_DEFAULT} />
              </a>
            </div>
            <div className="header-icon-set__text">
              <span className="header-icon-set__name">PMA_web</span>
              <span className="header-icon-set__key">(PMA_web)</span>
            </div>
          </div>
          <div className="project-header__actions"></div>
        </div>
        <div className="files-container">
          <FileLeftContent />
          <FileRightContent />
        </div>
      </div>
    </>
  );
}
export default Files;
