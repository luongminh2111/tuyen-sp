import React  from "react";
import Project from "./Project";
import "./styles/index.scss";
import MyIssue from "./MyIssue";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListProject } from "../../Workplace/actions/WorkplaceActionCallApi";

function DashboardLeft (props) {

  const {isRightZoomOut} = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProject());
  }, []);

  return (
    <div className={`dashboard-left-wrapper ${isRightZoomOut ? 'extend' : ''}`}>
      <Project />
      <MyIssue />
    </div>
  )
}
export default DashboardLeft;