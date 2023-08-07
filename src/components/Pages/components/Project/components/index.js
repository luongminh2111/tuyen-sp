import React, { useEffect, useState } from "react";
import ToggleNav from "../../../../../commons/ToggleNav";
import { useSelector } from "react-redux";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import ProjectLeftContent from "./ProjectLeftContent";
import ProjectRightContent from "./ProjectRightContent/index";
import "../styles/index.scss";
import ProjectHeader from "./ProjectHeader";

function Project(props) {
  const isExpand = useSelector((state) => state.global.isExpand);
  const curProject = useSelector((state) => state.projects.itemDetail);

  return (
    <>
      <ToggleNav />
      <div className={`projects-wrapper ${isExpand ? "menu-expand" : ""}`}>
        <HeaderNav />
        <ProjectHeader item={curProject} />
        <div className="content-wrapper">
          <ProjectLeftContent />
          <ProjectRightContent />
        </div>
      </div>
    </>
  );
}
export default Project;
