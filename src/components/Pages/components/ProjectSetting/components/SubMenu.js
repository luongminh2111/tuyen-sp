import React from "react";
import "../styles/subMenu.scss";

function SubMenu(props) {
  return (
    <div className="submenu-wrapper">
      <div className="title">
        <div>
          <i class="fa-solid fa-gear"></i>
        </div>
        <div>Project Settings</div>
      </div>
      <div className="menu-items">
        <div className="item">General</div>
        <div className="item">Members</div>
        <div className="item">Themes</div>
        <div className="item">Issue Type</div>
        <div className="item">Categories</div>
        <div className="item">Edit Versions / Milestones</div>
      </div>
    </div>
  );
}
export default SubMenu;
