import React from "react";
import HeaderNav from "../../../commons/HeaderNav/HeaderNav";
import "./styles/index.scss";
import { ORG_IMAGE_DEFAULT } from "../../../../commons/image";
import ReactTooltip from "react-tooltip";
import DashboardLeft from "./DashboardLeft";
import DashboardRight from "./DashboardRight";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PATH_WORKPLACE_SETTING } from "../../../../contains/pathDefault";
import { USER_ROLE } from "../../../../commons/Commons";

function Dashboard(props) {
  const [isRightZoomOut, setIsRightRoomOut] = useState(false);

  const account = useSelector(state => state.auth.account);

  const history = useHistory();

  useEffect(() => {
    history.push("/dashboard");
  }, []);

  const handleChangeRightRoom = () => {
    setIsRightRoomOut(!isRightZoomOut);
  };

  return (
    <>
      <div className={`dashboard-wrapper`}>
        <HeaderNav />
        <div className="content-header">
          <div className="content-header__inner">
            <div className="header-icon-set  -dashboard ">
              <div className="header-icon-set__icon">
                <a href="/">
                  <img src={ORG_IMAGE_DEFAULT} />
                </a>
              </div>
              <div className="title-group">
                <span className="org-name">HUST</span>
                <span
                  className="setting-icon"
                  data-tip=""
                  data-for="space-setting"
                >
                  <a href={`${PATH_WORKPLACE_SETTING}`}>
                    <i className="fa-solid fa-gear"></i>
                  </a>
                </span>
                <ReactTooltip
                  type="dark"
                  effect="solid"
                  place="top"
                  id="space-setting"
                >
                  Space setting
                </ReactTooltip>
              </div>
            </div>
          </div>
        </div>
        {account?.role === USER_ROLE.WORKSPACE_ADMIN ?
        <div className="workplace-empty d-flex">
          <div className="item-add project">
            <div className="item-icon">
              <i className="fa-solid fa-folder-tree"></i>
            </div>
            <div className="item-content">
              <div>Add Project</div>
              <div className="sub-text">First, add a project that you would like to work on</div>
              <div>
                <button onClick={() => history.push(`${PATH_WORKPLACE_SETTING}`)}>Add</button>
              </div>
            </div>
          </div>
          <div className="item-add user">
            <div className="item-icon">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <div className="item-content">
              <div>Add User</div>
              <div className="sub-text">Invite members to this Space to work on your project with you</div>
              <div>
                <button onClick={() => history.push(`${PATH_WORKPLACE_SETTING}?id=staff`)}>Add</button>
              </div>
            </div>
          </div>
          <div className="item-add issue">
            <div className="item-icon">
              <i className="fa-sharp fa-solid fa-list-ul"></i>
            </div>
            <div className="item-content">
              <div>Add Issue</div>
              <div className="sub-text">Please add a project first</div>
              <div>
                <button disabled >Add</button>
              </div>
            </div>
          </div>
        </div> : null }
        <div className="dashboard-contents">
          <DashboardLeft isRightZoomOut={isRightZoomOut} />
          <DashboardRight
            isRightZoomOut={isRightZoomOut}
            handleChangeRightRoom={handleChangeRightRoom}
          />
        </div>
      </div>
    </>
  );
}
export default Dashboard;
