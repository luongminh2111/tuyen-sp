import React, { useState } from "react";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import "../styles/index.scss";
import SubMenu from "./SubMenu";
import SettingContent from "./SettingContents";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Workplace(props){

  const [settingSelect, setSettingSelect] = useState('');

  const workspace = useSelector(state => state.workplace?.workspace) || {};
  console.log("check workspace:", workspace);

  const history = useHistory();

  useEffect(() =>{
    const path = new URLSearchParams(history.location.search);
    const tab = path.get("id");
    setSettingSelect(tab);
  }, [history]);

  return (
    <div className="workplace-setting-wrapper">
      <HeaderNav />
      <div className="content-header">
          <div className="header-icon-set project-header__summary">
            <div className="workspace-name">{workspace?.name}</div>
          </div>
          <div className="project-header__actions"></div>
        </div>
        <div className="workplace-setting-container d-flex">
          <SubMenu settingSelect={settingSelect} setSettingSelect={setSettingSelect}/>
          <SettingContent settingSelect={settingSelect} setSettingSelect={setSettingSelect} workspace={workspace}/>
        </div>
    </div>
  )
}
export default Workplace;