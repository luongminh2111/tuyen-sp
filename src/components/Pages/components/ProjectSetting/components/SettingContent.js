import { TextField } from "@material-ui/core";
import React from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import MemberSetting from "./Members";
import IssueType from "./IssueType";
import Milestone from "./Milestone";

function SettingContent(props) {
  const history = useHistory();

  const { settingSelect } = props;

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
        <hr />
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
            <div>
              Note: If checked, this project will no longer appear on the
              Dashboard, but you will still see it in gray in the project list.
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center save-btn">
          <Button>Save</Button>
        </div>
      </>
    );
  };

  return (
    <div className="setting-content-wrapper">
      {!settingSelect ? (
        renderGeneralSetting()
      ) : settingSelect === "Members" ? (
        <MemberSetting />
      ) : settingSelect === "Issue Type" ? (
        <IssueType />
      ) : (
        <Milestone />
      )}
    </div>
  );
}
export default SettingContent;
