import React from "react";
import "../styles/SubMenu.scss";
import { useHistory } from "react-router-dom";
import { PATH_WORKPLACE_SETTING } from "../../../../../contains/pathDefault";


function SubMenu(props) {

  const { settingSelect, setSettingSelect } = props;

  const history = useHistory();

  const handleSelectSetting = (value) => {
    if(value?.length > 0){
      history.push(`${PATH_WORKPLACE_SETTING}?id=${value}`);
    }
    else {
      history.push(PATH_WORKPLACE_SETTING);
    }
    setSettingSelect(value);
  };

  return (
    <div className="submenu-wrapper">
      <div className="menu-items">
        <div className={`item ${settingSelect === "" ? "active" : ''}`} onClick={() => handleSelectSetting("")}>
          <span>
            <i className="fa-solid fa-gear"></i>
          </span>
          <span>General</span>
        </div>
        <div className={`item ${settingSelect === "staff" ? "active" : ''}`} onClick={() => handleSelectSetting("staff")}>
          <span>
          <i className="fa-solid fa-user-secret"></i>
          </span>
          <span>Staffs</span>
        </div>
        <div className={`item ${settingSelect === "projects" ? "active" : ''}`} onClick={() => handleSelectSetting("projects")}>
          <span>
          <i className="fa-solid fa-diagram-project"></i>
          </span>
          <span>List Project</span>
        </div>
      </div>
    </div>
  );
}
export default SubMenu;
