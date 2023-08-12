import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToggleNav from "../../../../../commons/ToggleNav";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import "../styles/index.scss";
import BoardFilter from "./BoardFilter";
import DragTaskItem from "./DragTaskItem";
import { getListTask } from "../../Issue/actions/TaskCallApi";
import {
  getListMemberInWorkspace,
  getListMileStoneInProject,
} from "../../ProjectSetting/actions/ProjectActionCallApi";

function Board(props) {
  const isExpand = useSelector((state) => state.global.isExpand);
  const curProject = useSelector((state) => state.projects.itemDetail);
  const members = useSelector((state) => state.projects.members);
  const milestones = useSelector((state) => state.projects.milestone);
  const tasks = useSelector((state) => state.projects.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListTask());
    dispatch(getListMemberInWorkspace(curProject?.id));
    dispatch(getListMileStoneInProject());
  }, []);

  return (
    <>
      <ToggleNav />
      <div className={`board-wrapper ${isExpand ? "menu-expand" : ""}`}>
        <HeaderNav />
        <div className="content-header">
          <div className="header-icon-set project-header__summary">
            <div className="header-icon-set__icon">
              <a href="">
                <img src={ORG_IMAGE_DEFAULT} />
              </a>
            </div>
            <div className="header-icon-set__text">
              <span className="header-icon-set__name">{curProject?.name}</span>
              <span className="header-icon-set__key">
                ({curProject?.project_key})
              </span>
            </div>
          </div>
          <div className="board-header__actions"></div>
        </div>
        <div className="board-container">
          <BoardFilter
            members={members}
            milestones={milestones}
          />
          <div className="list-status">
            <DragTaskItem
              members={members}
              tasks={tasks}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Board;
