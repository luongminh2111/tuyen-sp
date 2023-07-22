import React from "react";

function TaskInStatus(props) {
  const { status } = props;

  return (
    <div className="status-wrapper">
      <div className={`status-title ${status}`}>
        <span>
          <i className="fa-solid fa-circle"></i>
        </span>
        <span>{status || "Open"}</span>
        <span style={{marginLeft: '8px'}}>({3})</span>
      </div>
      <div className="list-issue">
        {status === "Open" ? (
          <div className="add-issue-btn mb-3">
            <span>
              <i className="fa-solid fa-plus"></i>
            </span>
            <span>Add Issue...</span>
          </div>
        ) : null}
        <div className="list-task">
          {status === 'Open' ? 
          <div className="task-item">
            <div className="row-1 mb-2 mt-2">
              <div className="_left">
                <div className="type">Task</div>
                <div className="prj-name">PMA_web</div>
              </div>
              <div className="_right">
                <div className="dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
            <div className="row-2">
              <div className="desc">Sơ đồ luồng hệ thống</div>
            </div>
          </div> : null}
        </div>
      </div>
    </div>
  );
}
export default TaskInStatus;
