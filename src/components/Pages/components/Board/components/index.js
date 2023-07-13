import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ToggleNav from "../../../../../commons/ToggleNav";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import "../styles/index.scss";
import BoardFilter from "./BoardFilter";
import TaskInStatus from "./TaskInStatus";
import DragTaskItem from "./DragTaskItem";
import { defaultGroupsTask } from "../commons/DataCommons";

function Board(props) {
  const isExpand = useSelector((state) => state.global.isExpand);
  const dragItem = useRef();
  const dragOverItem = useRef();
   
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
 

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
              <span className="header-icon-set__name">PMA_web</span>
              <span className="header-icon-set__key">(PMA_web)</span>
            </div>
          </div>
          <div className="board-header__actions"></div>
        </div>
        <div className="board-container">
          <BoardFilter />
          <div className="list-status">
            {/* <TaskInStatus status="Open" />
            <TaskInStatus status="In-Progress" />
            <TaskInStatus status="Resolved" />
            <TaskInStatus status="Closed" /> */}
            <DragTaskItem data={defaultGroupsTask} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Board;
