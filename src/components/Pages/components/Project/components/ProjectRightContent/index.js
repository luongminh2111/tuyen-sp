import React from "react";
import "../../styles/ProjectRightContent.scss"
import Status from "./Status";
import Milestones from "./Milestone";
import Category from "./Category";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getTaskStatusCount, getMilestoneStatusCount } from "../../actions/ProjectCallApi";

function ProjectRightContent(props){
  const dispatch = useDispatch();

  const [statusCount, setStatusCount] = useState();
  const [mileCount, setMileCount] = useState();

  useEffect(() => {
    dispatch(getTaskStatusCount()).then(res => {
      setStatusCount(res);
    });
    dispatch(getMilestoneStatusCount()).then(res => {
      setMileCount(res);
    });
  }, []);

  return (
    <div className="project-right-wrapper">
      <Status statusCount={statusCount}/>
      <Milestones mileCount={mileCount} />
      <Category />
    </div>
  )
};
export default ProjectRightContent;