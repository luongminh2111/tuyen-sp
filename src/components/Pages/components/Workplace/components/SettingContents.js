import React from "react";
import { useHistory } from "react-router-dom";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import "../styles/SettingContents.scss";
import Staffs from "./Staffs";
import ListProject from "./ListProjects";

function SettingContent(props) {

  const history = useHistory();

  const { settingSelect } = props;

  const renderGeneralSetting = () => {
    return (
      <>
        <div className="title d-flex">
          <div>Space Setting</div>
          <div>
            <i class="fa-sharp fa-solid fa-circle-question"></i>
          </div>
        </div>
        <div className="workplace-info mt-4">
          <div className="label d-flex">
            <span>Organization Name</span>
            <span>*</span>
          </div>
          <div>
            <input type="text" />
          </div>
          <div className="label d-flex">
            <span>Name</span>
            <span>*</span>
          </div>
          <div>
            <input type="text" />
          </div>
          <div className="label d-flex">
            <span>Space logo</span>
            <span>*</span>
          </div>
          <div className="logo-company">
            <img src={ORG_IMAGE_DEFAULT}></img>
          </div>
          <div className="label d-flex">
            <span>Organization Domain</span>
            <span>*</span>
          </div>
          <div>
            <input type="text" />
          </div>
          <div className="label d-flex">
            <span>Description</span>
          </div>
          <div>
            <input type="text" />
          </div>
        </div>
        
        <div className="d-flex justify-content-center save-btn">
          <button>Save</button>
        </div>
      </>
    );
  };

  return (
    <div className="setting-content-wrapper">
      
      {!settingSelect ? (
        renderGeneralSetting()
      ) : settingSelect === "staff" ? (
        <Staffs />
      ): settingSelect === "projects" ? (
        <ListProject />
      ) : null}

    </div>
  );
}
export default SettingContent;
