import React from "react";
import "../styles/subMenu.scss";

function SubMenu(props) {
  const { settingSelect, setSettingSelect } = props;

  const handleSelectSetting = (value) => {
    setSettingSelect(value);
  }

  return (
    <div className="submenu-wrapper">
      <div className="title" onClick={() => handleSelectSetting("")}>
        <div>
          <i className="fa-solid fa-gear"></i>
        </div>
        <div>Project Settings</div>
      </div>
      <div className="menu-items">
        <div className={`item ${settingSelect === "" ? "active" : ''}`} onClick={() => handleSelectSetting("")}>General</div>
        <div className={`item ${settingSelect === "Members" ? "active" : ''}`} onClick={() => handleSelectSetting("Members")}>Members</div>
        <div className={`item ${settingSelect === "Issue Type" ? "active" : ''}`} onClick={() => handleSelectSetting("Issue Type")}>Issue Type</div>
        <div className={`item ${settingSelect === "Milestones" ? "active" : ''}`} onClick={() => handleSelectSetting("Milestones")}>Milestones</div>
      </div>
    </div>
  );
}
export default SubMenu;
