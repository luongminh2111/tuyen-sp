import { TextField } from "@material-ui/core";
import React from "react";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import { Button } from "@mui/material";

function SettingContent(props) {
  return (
    <div className="setting-content-wrapper">
      <div className="title d-flex">
        <div>General</div>
        <div>
          <i class="fa-sharp fa-solid fa-circle-question"></i>
        </div>
      </div>
      <div className="back-to-project">
        <div>
          <i class="fa-solid fa-rotate-left"></i>
        </div>
        <div>Go to project</div>
      </div>
      <div className="project-name mt-4">
        <div className="label d-flex">
          <span>Project Name</span>
          <span>*</span>
        </div>
        <div>
          <input type="text" />
        </div>
      </div>
      <div className="project-key mt-3">
        <div className="label d-flex">
          <span>Project Key</span>
          <span>*</span>
        </div>
        <div>
          <input type="text" />
        </div>
      </div>
      <div className="rule mt-3 ">
        <div className="label mb-1">Formatting Rules</div>
        <div>
          <ButtonDropDown options={defaultOptions} />
        </div>
      </div>
      <hr />
      <div className="en-priority mt-4 d-flex">
        <div>
          <input type="checkbox" />
        </div>
        <div className="text">
          <div>Enable priorities, versions and milestones</div>
          <div>
            Check the box to use priorities , milestones and versions in issues
            for this project.
          </div>
        </div>
      </div>
      <div className="en-subversion mt-4 d-flex">
        <div>
          <input type="checkbox" />
        </div>
        <div className="text">Enable Subversion</div>
      </div>
      <div className="en-git mt-4 d-flex">
        <div>
          <input type="checkbox" />
        </div>
        <div className="text">Enable Git</div>
      </div>
      <div className="en-file mt-4 d-flex">
        <div>
          <input type="checkbox" />
        </div>
        <div className="text">
          <div>Enable File</div>
          <div>Check the box to use files for this project.</div>
          <div>
            If you uncheck the box when there is already data in the file, the
            remaining files will be saved as storage space.
          </div>
        </div>
      </div>
      <div className="en-admin-prj mt-4 d-flex">
        <div>
          <input type="checkbox" />
        </div>
        <div className="text">
          Allow project administrators to manage each other.
        </div>
      </div>
      <div className="en-archive mt-4 d-flex">
        <div>
          <input type="checkbox" />
        </div>
        <div className="text">
          <div>Archive this project</div>
          <div>Note: If checked, this project will no longer appear on the Dashboard,
            but you will still see it in gray in the project list.</div>
        </div>
      </div>
      <div className="d-flex justify-content-center save-btn">
        <Button>Save</Button>
      </div>
    </div>
  );
}
export default SettingContent;

const defaultOptions = [
  {
    id: 1,
    value: "User space setting",
  },
  {
    id: 2,
    value: "Backlog",
  },
  {
    id: 3,
    value: "Markdown",
  },
];
