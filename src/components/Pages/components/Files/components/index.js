import React, { useEffect } from "react";
import ToggleNav from "../../../../../commons/ToggleNav";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import { useDispatch, useSelector } from "react-redux";
import "../styles/index.scss";
import FileLeftContent from "./FileLeftContent";
import { getListFile } from "../actions/FileActionCallapi";
import {  getListMemberOfProject } from "../../ProjectSetting/actions/ProjectActionCallApi";

function Files(props) {
  const isExpand = useSelector((state) => state.global.isExpand);
  const curProject = useSelector((state) => state.projects.itemDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListFile());
    dispatch(getListMemberOfProject(curProject?.id));
  }, []);

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
              <span className="header-icon-set__name">{curProject?.name}</span>
              <span className="header-icon-set__key">({curProject?.project_key})</span>
            </div>
          </div>
          <div className="project-header__actions"></div>
        </div>
        <div className="files-container">
          <FileLeftContent curProject={curProject} />
          {/* <FileRightContent /> */}
        </div>
      </div>
    </>
  );
}
export default Files;
