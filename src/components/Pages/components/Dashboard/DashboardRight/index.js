import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import "./style/index.scss";

function DashboardRight(props) {
  const { handleChangeRightRoom, isRightZoomOut } = props;

  console.log("check props :", isRightZoomOut);

  return (
    <div
      className={`dashboard-right-wrapper ${isRightZoomOut ? "zoom-in" : ""}`}
    >
      <div className="header">
        <div className="header-left">
          <div
            className="collapse-icon"
            onClick={() => {
              handleChangeRightRoom();
            }}
          >
            <i className="fa-solid fa-chevron-up"></i>
          </div>
          <div className="title"> Recent Updates</div>
        </div>
        {!isRightZoomOut ?
        <div className="header-right">
          <div className="filter-project">Filter: PMA_web</div>
          <div className="options">
            <span></span>
            <span>View options</span>
          </div>
        </div> : null }
      </div>
      {!isRightZoomOut ? (
        <div className="list-updates">
          <div className="current-time">Thu Jun. 22, 2023</div>
          <div className="updates">
            {fakeList?.map((item, index) => {
              return (
                <div className="update-item" key={index}>
                  <div className="top-content">
                    <div className="user">
                      <div className="avatar">
                        <img src={ORG_IMAGE_DEFAULT}></img>
                      </div>
                      <div className="name">
                        <span>{item?.fullName}</span> 
                        <span>add a</span>
                        <span>file</span>
                      </div>
                    </div>
                    <div className="time">{item?.time}</div>
                  </div>

                  <div className="update-info">
                    <div className="info-top">
                      <div className="update-name">PMA_web</div>
                    </div>
                    <div className="sub-name">PMA_web</div>
                    <div className="info-bottom">
                      <div className="add-issue">Add issue</div>
                      <div className="issues">Issues</div>
                      <div className="board">Board</div>
                      <div className="file">Files</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default DashboardRight;

const fakeList = [
  {
    image: "",
    fullName: "Vu Duc Tuyen",
    projectName: "PMA_web (PMA_WEB)",
    filename: "ừtừ vựng thuyết trình.docx",
    time: "2 ngày trước",
  },
  {
    image: "",
    fullName: "Vu Duc Tuyen",
    projectName: "PMA_web (PMA_WEB)",
    filename: "ừtừ vựng thuyết trình.docx",
    time: "2 ngày trước",
  },
  {
    image: "",
    fullName: "Vu Duc Tuyen",
    projectName: "PMA_web (PMA_WEB)",
    filename: "ừtừ vựng thuyết trình.docx",
    time: "2 ngày trước",
  },
  {
    image: "",
    fullName: "Vu Duc Tuyen",
    projectName: "PMA_web (PMA_WEB)",
    filename: "ừtừ vựng thuyết trình.docx",
    time: "2 ngày trước",
  },
  {
    image: "",
    fullName: "Vu Duc Tuyen",
    projectName: "PMA_web (PMA_WEB)",
    filename: "ừtừ vựng thuyết trình.docx",
    time: "2 ngày trước",
  },
  {
    image: "",
    fullName: "Vu Duc Tuyen",
    projectName: "PMA_web (PMA_WEB)",
    filename: "ừtừ vựng thuyết trình.docx",
    time: "2 ngày trước",
  },
  {
    image: "",
    fullName: "Vu Duc Tuyen",
    projectName: "PMA_web (PMA_WEB)",
    filename: "ừtừ vựng thuyết trình.docx",
    time: "2 ngày trước",
  },
];
