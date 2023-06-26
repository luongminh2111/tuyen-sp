import React  from "react";
import Project from "./Project";
import "./styles/index.scss";

function DashboardLeft (props) {

  const {isRightZoomOut} = props;

  return (
    <div className={`dashboard-left-wrapper ${isRightZoomOut ? 'extend' : ''}`}>
      <Project />
    </div>
  )
}
export default DashboardLeft;