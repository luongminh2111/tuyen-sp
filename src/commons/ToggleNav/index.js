import React, { useRef, useState } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ToggleNav(props) {

  const isExpand = useSelector(state => state.global.isExpand);

  const menuBarRef = useRef();
  const dispatch = useDispatch();

  const history = useHistory();

  const handleChangeExpand = () => {
    dispatch({
      type : 'CHANGE_EXPAND',
      value : !isExpand
    })
  }

  const [changeMenuBar, setChangeMenuBar] = useState(false);

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
      <div className="menu-item home d-flex" onClick={() => history.push("/")}>
        <span className="icon">
          <i className="fa-solid fa-house"></i>
        </span>
        {isExpand ? <span className="text">Home</span> : null}
      </div>
      <div className="menu-item add-issue d-flex" onClick={() => history.push("/add-issue")}>
        <span className="icon">
          <i className="fa-solid fa-plus"></i>
        </span>
        {isExpand ? <span className="text">Add Issue</span> : null}
      </div>
      <div className="menu-item issue d-flex" onClick={() => history.push("/issues")}>
        <span className="icon">
          <i className="fa-solid fa-list"></i>
        </span>
        {isExpand ? <span className="text">Issue</span> : null}
      </div>
      <div className="menu-item board d-flex" onClick={() => history.push("/board")}>
        <span className="icon">
          <i className="fa-solid fa-chart-simple"></i>
        </span>
        {isExpand ? <span className="text">Board</span> : null}
      </div>
      <div className="menu-item file d-flex" onClick={() => history.push("/files")}>
        <span className="icon">
          <i className="fa-solid fa-folder"></i>
        </span>
        {isExpand ? <span className="text">Files</span> : null}
      </div>
      <div className="menu-item setting d-flex" onClick={() => history.push("/project-setting")}>
        <span className="icon">
          <i className="fa-solid fa-gear"></i>
        </span>
        {isExpand ? <span className="text">Project Setting</span> : null}
      </div>
    </div>
  );
}
export default ToggleNav;
