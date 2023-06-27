import React from "react";
import HeaderNav from "../../../commons/HeaderNav/HeaderNav";
import "./styles/index.scss";
import { ORG_IMAGE_DEFAULT } from "../../../../commons/image";
import ReactTooltip from "react-tooltip";
import DashboardLeft from "./DashboardLeft";
import DashboardRight from "./DashboardRight";
import { useState } from "react";
import ToggleNav from "../../../../commons/ToggleNav";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Dashboard(props) {
  const [isRightZoomOut, setIsRightRoomOut] = useState(false);

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
                  <a href="">
                    <i class="fa-solid fa-gear"></i>
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
