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
  const taskDetail = useSelector(state => state.tasks.detail);

  const [showDetail, setShowDetail] = useState(false);

  const [id, setId] = useState("");
  const [subId, setSubId] = useState("");

  const getCurrentTask = useMemo(() => {
    return tasks?.find((e) => e.id === id);
  }, [id]);

  const getCurrentSubTask = useMemo(() => {
    if(subId) {
      return tasks
      ?.find((e) => e.id === id)
      ?.sub_tasks?.find((e) => e.id === subId);
    }
    return null;
  }, [subId, id]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListTask());
    dispatch(getListMemberOfProject(curProject?.id));
    dispatch(getListMileStoneInProject(curProject?.id));
   
    if (taskDetail?.id) {
      if (taskDetail?.parent_task_id) {
        setSubId(taskDetail?.id);
        setId(taskDetail?.parent_task_id);
      } else {
        setId(taskDetail?.id);
      }
      setShowDetail(true);
    }
  }, []);

  return (
    <>
      <ToggleNav />
      <div className={`issues-wrapper ${isExpand ? "menu-expand" : ""}`}>
        <HeaderNav />
        <div className="issues-content">
          <HeaderIssue item={curProject} />
          { console.log("check  taskDetail :", taskDetail)}
          {showDetail ? (
            <TaskDetail
              task={ taskDetail?.id > 0 ? taskDetail : subId > 0 ? getCurrentSubTask : getCurrentTask}
              setShowDetail={setShowDetail}
              milestones={milestones}
              isExpand={isExpand}
              isSubTask={subId > 0 ? 'sub' : 'par'}
              setId={setId}
              setSubId={setSubId}
              tasks={tasks}
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
