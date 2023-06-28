import React from "react";
import "../styles/index.scss";

function FileRightContent(props) {
  const renderRecentlyUpdate = () => {
    return (
      <div className="recently-update-wrapper">
        <div className="label">Recently Updated</div>
        <div className="list-update">
          {[1, 2, 3, 4, 5]?.map((e) => {
            return (
              <div className="item">
                <div className="file-name">
                  <span className="icon"><i class="fa-regular fa-file-pdf"></i></span>
                  <span className="name">ừtừ vựng thuyết trình.docx</span>
                </div>
                <div className="user-time">
                  <span className="time">5 day ago</span>
                  <span style={{margin : "0 12px"}}>/</span>
                  <span className="account">Vu Duc Tuyen</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFindFile = () => {
    return (
      <div className="find-file-wrapper">
        <div className="label">Find File</div>
        <div className="find-content"></div>
      </div>
    )
  } 

  return <div className="files-right-content">{renderRecentlyUpdate()}</div>;
}
export default FileRightContent;
