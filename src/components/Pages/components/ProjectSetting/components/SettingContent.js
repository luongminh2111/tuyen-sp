import React from "react";
import { Button } from "@mui/material";
import MemberSetting from "./Members";
import IssueType from "./IssueType";
import Milestone from "./Milestone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../actions/ProjectActionCallApi";
import Alerts from "../../../../../commons/Alert";
import { compareTime, parseDateToString } from "../../../../../ulti/dateTime";
import { updateProjectDetail } from "../actions/ProjectActionRedux";

function SettingContent(props) {

  const dispatch = useDispatch();

  const { settingSelect, project, account } = props;
  const [name, setName] = useState(project.name);
  const [key, setKey] = useState(project.project_key);
  const [description, setDescription] = useState(project?.description);
  const [startDate, setStartDate] = useState( parseDateToString(project?.start_date));
  const [dueDate, setDueDate] = useState(parseDateToString(project?.due_date));

  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const handleUpdateProject = () => {
    if (account?.role === 3) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("You do not have permission to perform this operation");
      return;
    }
    if (compareTime(new Date(dueDate), new Date(startDate))) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("Start time can not be after End time");
      return;
    }
    const request = {
      name,
      description,
      start_date: startDate,
      due_date: dueDate,
    };
    dispatch(updateProject(request, project.id)).then((res) => {
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res.data?.message);
        dispatch(updateProjectDetail(res.data.data));
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res.data?.message);
      }
    });
  };

  const renderGeneralSetting = () => {
    return (
      <>
        <div className="title d-flex">
          <div>General</div>
          <div>
            <i className="fa-sharp fa-solid fa-circle-question"></i>
          </div>
        </div>
        <div className="back-to-project">
          <div>
            <i className="fa-solid fa-rotate-left"></i>
          </div>
          <div>Go to project</div>
        </div>
        <div className="project-name mt-4">
          <div className="label d-flex">
            <span>Project Name</span>
            <span>*</span>
          </div>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="project-key mt-3">
          <div className="label d-flex">
            <span>Project Key</span>
            <span>*</span>
          </div>
          <div>
            <input type="text" value={key} disabled />
          </div>
        </div>
        <div className="input-date mt-2">
          <div className="label">
            <span>Start date</span>
            <span>*</span>
          </div>
          <div>
            <input
              type="date"
              data-date=""
              data-date-format="YYYY MM DD"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>
        <div className="input-date mt-3">
          <div className="label">
            <span>Due date</span>
            <span>*</span>
          </div>
          <div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="prj-description col-12">
          <div className="label mb-1">Project description</div>
          <textarea
            id="input-comment"
            name="w3review"
            maxLength={2000}
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="d-flex justify-content-center save-btn">
          <Button onClick={() => handleUpdateProject()}>Save</Button>
        </div>
      </>
    );
  };

  return (
    <div className="setting-content-wrapper">
      {!settingSelect ? (
        renderGeneralSetting()
      ) : settingSelect === "Members" ? (
        <MemberSetting projectId={project.id} account={account} />
      ) : settingSelect === "Issue Type" ? (
        <IssueType />
      ) : (
        <Milestone projectId={project.id} account={account} />
      )}
      {openAlert ? (
        <Alerts
          text={textAlert}
          status={statusAlert}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      ) : null}
    </div>
  );
}
export default SettingContent;
