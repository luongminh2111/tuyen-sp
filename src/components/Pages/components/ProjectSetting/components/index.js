import React, { useState } from "react";
import { useSelector } from "react-redux";
import ToggleNav from "../../../../../commons/ToggleNav";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import "../styles/index.scss";
import SubMenu from './SubMenu';

import SettingContent from "./SettingContent";


function ProjectSetting(props) {
  const isExpand = useSelector((state) => state.global.isExpand);

  const [settingSelect, setSettingSelect] = useState('');

  return (
    <>
      <ToggleNav />
      <div className={`project-setting-wrapper ${isExpand ? "menu-expand" : ""}`}>
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
        <div className="project-setting-container d-flex">
          <SubMenu settingSelect={settingSelect} setSettingSelect={setSettingSelect}/>
          <SettingContent settingSelect={settingSelect}/>
        </div>
      </div>
    </>
  );
}
export default ProjectSetting;