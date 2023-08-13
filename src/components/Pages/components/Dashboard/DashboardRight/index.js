import React, { useEffect, useState } from "react";
import "./style/index.scss";
import { useDispatch } from "react-redux";
import { getAllUpdateInProject } from "../actions/DashboardAactionCallApi";
import { CircularProgress } from "@mui/material";
import { EMPTY_USER } from "../../../../../commons/image";

function DashboardRight(props) {
  const { handleChangeRightRoom, isRightZoomOut } = props;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getAllUpdateInProject()).then((res) => {
      setItems(res?.data);
      setLoading(false);
    });
  }, []);

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
      </div>
      {!isRightZoomOut ? (
        <div className="list-updates">
          <div className="updates">
            <div className="list-timeline">
              {loading ? (
                <div>
                  <div
                    className="w-100 d-flex justify-content-center align-items-center"
                    style={{ height: "400px" }}
                  >
                    <CircularProgress />
                  </div>
                </div>
              ) : (
                items?.length === 0 ? 
                (
                  <div
                className="d-flex align-items-center justify-content-center w-100"
                style={{ height: "300px", backgroundColor: '#FFF' }}
              >
                <div className="list-empty">
                  <p>No update to display</p>
                </div>
              </div>
                ) :
                items?.map((e) => {
                  return (
                    <div className="timeline-item">
                      <div className="timelịne-date">
                        {e?.updated_at?.substring(0, 10)}
                      </div>
                      <div className="timeline__stream">
                        <div className="avatar">
                          <img
                            src={e?.creator?.avatar || EMPTY_USER}
                            alt="avatar"
                          />
                        </div>
                        <div className="right-content">
                          <div className="stream-update__text">
                            <div>
                              <span
                                style={{
                                  fontWeight: "600",
                                  marginRight: "16px",
                                }}
                              >
                                {e?.creator?.name}
                              </span>
                              {e?.type === "NORMAL" ? (
                                <span>posted a comment on the task</span>
                              ) : null}
                              {e?.type === "ADD" ? (
                                <span>added a new task</span>
                              ) : null}
                              {e?.type === "UPDATE" ? (
                                <span>updated a task</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="stream-update__title">
                            <span
                              className="project-name"
                              style={{
                                fontWeight: "600",
                                marginRight: "10px",
                                color: "#0088FF",
                                cursor: "pointer",
                              }}
                            >
                              {e?.task?.task_key}
                            </span>
                            <span>{e?.task?.name}</span>
                          </div>
                          {e?.type === "NORMAL" || e?.type === "UPDATE" ? (
                            <div className="stream-update__content d-flex justify-content-between mt-2">
                              <div className="">
                                <div>{e?.content}</div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default DashboardRight;
