import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/modals/CreateNewProjectStyle.scss";
import { createProject } from "../../actions/WorkplaceActionCallApi";
import Alerts from "../../../../../../commons/Alert";
import { compareTime, parseDateToString } from "../../../../../../ulti/dateTime";

function CreateNewProject(props) {
  const { open, handleClose } = props;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(parseDateToString(new Date()));
  const [endDate, setEndDate] = useState(parseDateToString(new Date()));
  
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const handleCreate = () => {
    if (compareTime(new Date(endDate), new Date(startDate))) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("Start time can not be after End time");
      return;
    }
    const request = {
      name, 
      project_key: key,
      description,
      start_date: startDate,
      end_date: endDate
    }
    dispatch(createProject(request)).then(res => {
      if(res){
        setTextAlert(res);
        setOpenAlert(true);
        setStatusAlert("error");
      } else {
        setTextAlert("Create new project success !");
        setOpenAlert(true);
        setStatusAlert("success");
        setTimeout(() => {
          handleClose();
        }, [1500]);
      }
 
    });
  };

  return (
    <Dialog open={open} className="dialog-create-project" maxWidth="lg">
      <DialogTitle className="create-pj-title">
        <div className="text-align-center">Create new project</div>
      </DialogTitle>
      <DialogContent>
        <div className="contents d-flex justify-content-between">
          <div className="prj-info">
            <div className="d-flex justify-content-between">
              <div className="prj-name col-5">
                <div className="label mb-1">Project name</div>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="prj-key col-5">
                <div className="label mb-1">Project key</div>
                <div>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-2 mb-2">
              <div className="prj-name col-5">
                <div className="label mb-1">Start date</div>
                <div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="prj-key col-5">
                <div className="label mb-1">End date</div>
                <div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className="prj-description col-12">
              <div className="label mb-1">Project description</div>
              <textarea
                id="input-comment"
                name="w3review"
                maxLength={2000}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </DialogContent>
      <div className="list-btn-action">
        <button onClick={() => handleClose()}>Cancel</button>
        <button onClick={() => handleCreate()}>Save</button>
      </div>
      {openAlert ? (
        <Alerts
          text={textAlert}
          status={statusAlert}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      ) : null}
    </Dialog>
  );
}
export default CreateNewProject;
