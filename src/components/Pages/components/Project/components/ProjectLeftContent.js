import React from "react";
import "../styles/ProjectLeftContent.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUpdateItem } from "../../Workplace/actions/WorkplaceActionCallApi";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { EMPTY_USER } from "../../../../../commons/image";
import { useHistory } from "react-router-dom";

function ProjectLeftContent(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllUpdateItem()).then((res) => {
      setLoading(false);
      if (res) {
        setItems(res);
      }
    });
  }, []);

  const handleShowTask = (item) => {
    if(item?.task?.task_key || item?.task?.name) {
      dispatch({
        type: 'UPDATE_TASK_DETAIL',
        item
      });
      history.push("/tasks");
    }
   
  }


  return (
    <div className="project-left-wrapper">
      <div className="title">
        <div className="text-1">Project Home</div>
        <div className="text-2">Recent Updates</div>
      </div>
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
          items?.map((e) => {
            return (
              <div className="timeline-item">
                <div className="timelịne-date">
                  {e?.updated_at?.substring(0, 10)}
                </div>
                <div className="timeline__stream">
                  <div className="avatar">
                    <img src={e?.creator?.avatar || EMPTY_USER} alt="avatar" />
                  </div>
                  <div className="right-content">
                    <div className="stream-update__text">
                      <div>
                        <span
                          style={{ fontWeight: "600", marginRight: "16px" }}
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
                        onClick={() => handleShowTask(e)}
                      >
                        {e?.task?.task_key}
                      </span>
                      <span onClick={() => handleShowTask(e)}>{e?.task?.name}</span>
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
  );
}
export default ProjectLeftContent;
