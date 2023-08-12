import React, { useEffect, useState } from "react";
import ToggleNav from "../../../../../commons/ToggleNav";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import HeaderIssue from "./HeaderIssue";
import FilterIssue from "./FilterIssue";
import TableIssue from "./TableIssue";
import "../styles/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { getListTask } from "../actions/TaskCallApi";
import {
  getListMemberOfProject,
  getListMileStoneInProject,
} from "../../ProjectSetting/actions/ProjectActionCallApi";
import TaskDetail from "./Detail";

function Issues(props) {
  const isExpand = useSelector((state) => state.global.isExpand);

  const tasks = useSelector((state) => state.projects.tasks);
  const curProject = useSelector((state) => state.projects.itemDetail);
  const milestones = useSelector((state) => state.projects.milestone);
  const taskDetail = useSelector(state => state.tasks.detail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListTask());
    dispatch(getListMemberOfProject(curProject?.id));
    dispatch(getListMileStoneInProject());
  }, []);

  return (
    <>
      <ToggleNav />
      <div className={`issues-wrapper ${isExpand ? "menu-expand" : ""}`}>
        <HeaderNav />
        <div className="issues-content">
          <HeaderIssue item={curProject} />
          {taskDetail?.id ? (
            <TaskDetail
              taskItem={taskDetail}
              milestones={milestones}
              isExpand={isExpand}
              tasks={tasks}
            />
          ) : (
            <>
              <FilterIssue />
              <TableIssue
                tasks={tasks}
                milestones={milestones}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Issues;
