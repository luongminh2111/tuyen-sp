import React, { useRef, useState } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearFilterTask } from "../../components/Pages/components/ProjectSetting/actions/ProjectActionRedux";

function ToggleNav(props) {
  const isExpand = useSelector((state) => state.global.isExpand);
  const curProject = useSelector((state) => state.projects.itemDetail);

  const menuBarRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeExpand = () => {
    dispatch({
      type: "CHANGE_EXPAND",
      value: !isExpand,
    });
  };

  const handleChangeMenu = (value) => {
    dispatch({
      type: "RESET_LIST",
      value,
    });
    history.push("/tasks");
  };

  const pathName = history.location.pathname;

  const [changeMenuBar, setChangeMenuBar] = useState(false);

  const handleSwitchMenu = () => {
    dispatch({ type: "RESET_TASK_DETAIL" });
  };

  return (
    <div className={`toggle-menu-wrapper ${isExpand ? "expand" : ""}`}>
      <div className="menu-bar" onClick={() => handleChangeExpand()}>
        <span
          className="icon"
          ref={menuBarRef}
          onMouseOver={() => setChangeMenuBar(true)}
          onMouseLeave={() => setChangeMenuBar(false)}
        >
          {changeMenuBar ? (
            isExpand ? (
              <i className="fa-solid fa-arrow-left"></i>
            ) : (
              <i className="fa-sharp fa-solid fa-arrow-right"></i>
            )
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </span>
      </div>
      <div
        className="menu-item home d-flex"
        onClick={() => {
          dispatch({ type: "RESET_TASK_DETAIL" });
          history.push(`/project?name=${curProject?.name}`);
        }}
      >
        <span className="icon">
          <i className="fa-solid fa-house"></i>
        </span>
        {isExpand ? <span className="text">Home</span> : null}
      </div>
      <div
        className={`menu-item add-task d-flex ${
          pathName === "/add-task" ? "active" : ""
        }`}
        onClick={() => {
          dispatch({ type: "RESET_TASK_DETAIL" });
          history.push("/add-task");
        }}
      >
        <span className="icon">
          <i className="fa-solid fa-plus"></i>
        </span>
        {isExpand ? <span className="text">Create Task</span> : null}
      </div>
      <div
        className={`menu-item issue d-flex ${
          pathName === "/tasks" ? "active" : ""
        }`}
        onClick={() => {
          dispatch({ type: "RESET_TASK_DETAIL" });
          dispatch(clearFilterTask());
          handleChangeMenu(true);
        }}
      >
        <span className="icon">
          <i className="fa-solid fa-list"></i>
        </span>
        {isExpand ? <span className="text">Tasks</span> : null}
      </div>
      <div
        className={`menu-item board d-flex ${
          pathName === "/board" ? "active" : ""
        }`}
        onClick={() => { dispatch({ type: "RESET_TASK_DETAIL" }); dispatch(clearFilterTask()); history.push("/board")}}
      >
        <span className="icon">
          <i className="fa-solid fa-chart-simple"></i>
        </span>
        {isExpand ? <span className="text">Board</span> : null}
      </div>
      <div
        className={`menu-item file d-flex ${
          pathName === "/files" ? "active" : ""
        }`}
        onClick={() => {
          dispatch({ type: "RESET_TASK_DETAIL" });
          history.push("/files");
        }}
      >
        <span className="icon">
          <i className="fa-solid fa-folder"></i>
        </span>
        {isExpand ? <span className="text">Files</span> : null}
      </div>
      <div
        className={`menu-item setting d-flex ${
          pathName === "/project-setting" ? "active" : ""
        }`}
        onClick={() => {
          dispatch({ type: "RESET_TASK_DETAIL" });
          history.push("/project-setting");
        }}
      >
        <span className="icon">
          <i className="fa-solid fa-gear"></i>
        </span>
        {isExpand ? <span className="text">Project Setting</span> : null}
      </div>
    </div>
  );
}
export default ToggleNav;
