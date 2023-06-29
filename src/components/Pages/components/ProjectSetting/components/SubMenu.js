import React from "react";
import "../styles/subMenu.scss";

function SubMenu(props) {
  const {setSettingSelect} = props;

  const handleSelectSetting = (value) => {
    setSettingSelect(value);
  }

  return (
    <div className="submenu-wrapper">
      <div className="title" onClick={() => handleSelectSetting("")}>
        <div>
          <i class="fa-solid fa-gear"></i>
        </div>
        <div>Project Settings</div>
      </div>
      <div className="menu-items">
        <div className="item" onClick={() => handleSelectSetting("")}>General</div>
        <div className="item" onClick={() => handleSelectSetting("Members")}>Members</div>
        <div className="item" onClick={() => handleSelectSetting("Issue Type")}>Issue Type</div>
        <div className="item" onClick={() => handleSelectSetting("Milestones")}>Milestones</div>
      </div>
    </div>
  );
}
export default SubMenu;
