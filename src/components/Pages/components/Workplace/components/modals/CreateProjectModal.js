import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/modals/CreateNewProjectStyle.scss";
import { createProject } from "../../actions/WorkplaceActionCallApi";

function CreateNewProject(props) {
  const { open, handleClose } = props;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    const request = {
      name, 
      project_key: key,
      description
    }
    dispatch(createProject(request));
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
    </Dialog>
  );
}
export default CreateNewProject;
