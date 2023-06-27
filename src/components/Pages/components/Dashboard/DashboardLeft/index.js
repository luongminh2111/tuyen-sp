import React  from "react";
import Project from "./Project";
import "./styles/index.scss";
import MyIssue from "./MyIssue";

function DashboardLeft (props) {

  const {isRightZoomOut} = props;

  return (
    <div className={`dashboard-left-wrapper ${isRightZoomOut ? 'extend' : ''}`}>
      <Project />
      <MyIssue />
    </div>
  )
}
export default DashboardLeft;