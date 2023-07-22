import React from "react";
import "../styles/ProjectLeftContent.scss";

function ProjectLeftContent(props) {
  return (
    <div className="project-left-wrapper">
      <div className="title">
        <div className="text-1">Project Home</div>
        <div className="text-2">Recent Updates</div>
      </div>
      <div className="list-timeline">
        <div className="timeline-item">
          <div className="timelịne-date">Mon Jun. 26, 2023</div>
          <div className="timeline__stream">
            <div className="avatar">
              <div>V</div>
            </div>
            <div className="right-content">
              <div className="stream-update__text">
                <div>
                  <span>Vũ Đức Tuyên</span>
                  <span>posted a comment on the issue</span>
                </div>
                <div>
                  <span>a day ago</span>
                </div>
              </div>
              <div className="stream-update__title">
                <span className="project-name">PMA_web </span>
                <span>(PMA_WEB)</span>
              </div>
              <div className="stream-update__content d-flex justify-content-between">
                <div className="">
                  <img></img>
                  <div>Shared Files tu_vung.docx</div>
                </div>
                <div className="btn-actions d-flex align-items-end">
                  <div className="comment " style={{ marginRight: "12px" }}>
                    <i className="fa-solid fa-message"></i>
                  </div>
                  <div className="rate">
                    <span>
                      <i className="fa-solid fa-star"></i>
                    </span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timelịne-date">Mon Jun. 26, 2023</div>
          <div className="timeline__stream">
            <div className="avatar">
              <div>V</div>
            </div>
            <div className="right-content">
              <div className="stream-update__text">
                <div>
                  <span>Vũ Đức Tuyên</span>
                  <span>posted a comment on the issue</span>
                </div>
                <div>
                  <span>a day ago</span>
                </div>
              </div>
              <div className="stream-update__title">
                <span className="project-name">PMA_web </span>
                <span>(PMA_WEB)</span>
              </div>
              <div className="stream-update__content d-flex justify-content-between">
                <div className="">
                  <img></img>
                  <div>Shared Files tu_vung.docx</div>
                </div>
                <div className="btn-actions d-flex align-items-end">
                  <div className="comment " style={{ marginRight: "12px" }}>
                    <i className="fa-solid fa-message"></i>
                  </div>
                  <div className="rate">
                    <span>
                      <i className="fa-solid fa-star"></i>
                    </span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timelịne-date">Mon Jun. 26, 2023</div>
          <div className="timeline__stream">
            <div className="avatar">
              <div>V</div>
            </div>
            <div className="right-content">
              <div className="stream-update__text">
                <div>
                  <span>Vũ Đức Tuyên</span>
                  <span>posted a comment on the issue</span>
                </div>
                <div>
                  <span>a day ago</span>
                </div>
              </div>
              <div className="stream-update__title">
                <span className="project-name">PMA_web </span>
                <span>(PMA_WEB)</span>
              </div>
              <div className="stream-update__content d-flex justify-content-between">
                <div className="">
                  <img></img>
                  <div>Shared Files tu_vung.docx</div>
                </div>
                <div className="btn-actions d-flex align-items-end">
                  <div className="comment " style={{ marginRight: "12px" }}>
                    <i className="fa-solid fa-message"></i>
                  </div>
                  <div className="rate">
                    <span>
                      <i className="fa-solid fa-star"></i>
                    </span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProjectLeftContent;
