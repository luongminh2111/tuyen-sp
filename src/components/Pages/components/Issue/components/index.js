import React, { useEffect, useState, useMemo } from "react";
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

  const [showDetail, setShowDetail] = useState(false);

  const [id, setId] = useState("");
  const [subId, setSubId] = useState("");

  const getCurrentTask = useMemo(() => {
    return tasks?.find((e) => e.id === id);
  }, [id]);

  const getCurrentSubTask = useMemo(() => {
    return tasks
      ?.find((e) => e.id === id)
      ?.sub_tasks?.find((e) => e.id === subId);
  }, [subId, id]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListTask());
    dispatch(getListMemberOfProject(curProject?.id));
    dispatch(getListMileStoneInProject(curProject?.id));
    setShowDetail(false);
  }, []);

  useEffect(() => {
    console.log("check vao day nay");
    dispatch(getListTask());
  }, [showDetail]);

  return (
    <>
      <ToggleNav />
      <div className={`issues-wrapper ${isExpand ? "menu-expand" : ""}`}>
        <HeaderNav />
        <div className="issues-content">
          <HeaderIssue item={curProject} />
          {showDetail ? (
            <TaskDetail
              task={getCurrentSubTask || getCurrentTask}
              setShowDetail={setShowDetail}
              milestones={milestones}
              isExpand={isExpand}
            />
          ) : (
            <>
              <FilterIssue />
              <TableIssue
                tasks={tasks}
                id={id}
                setId={setId}
                setSubId={setSubId}
                showDetail={showDetail}
                setShowDetail={setShowDetail}
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
