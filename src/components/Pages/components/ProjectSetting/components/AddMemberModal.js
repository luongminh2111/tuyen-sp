import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/AddMemberModalStyle.scss";
import { USER_ROLE, USER_ROLE_TEXT } from "../../../../../commons/Commons";
import { addMemberToProject } from "../actions/ProjectActionCallApi";

function AddMemberModal(props) {
  const { open, handleClose, projectId, hasIds } = props;

  const staffs = useSelector((state) => state.staffs.items);
  const members = staffs?.filter((e) => e.role !== USER_ROLE.WORKSPACE_ADMIN && !hasIds?.includes(e.id));

  const [ids, setIds] = useState([]);

  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(addMemberToProject(ids, projectId));
    handleClose();
  };

  const handleSelectMember = (id) => {
    if(ids?.includes(id)){
      setIds(ids?.filter(e => e !== id));
    } else {
      setIds(ids.concat(id));
    }
  }

  return (
    <Dialog open={open} className="dialog-add-member-project" maxWidth="lg">
      <DialogTitle className="create-pj-title">
        <div className="text-align-center">Select member join in project</div>
      </DialogTitle>
      <DialogContent>
        <div className="contents-add d-flex justify-content-between">
          <div className="filter-member-table">
            <div className="header">
              <div className="checkbox-input">Select</div>
              <div className="name">Nick Name</div>
              <div className="mail">Email Address</div>
              <div className="role">Role</div>
              <div className="join">Join on</div>
            </div>
            <div className="body">
              {members?.map((e, index) => {
                return (
                  <div className="item" onClick={() => handleSelectMember(e.id)} key={index}>
                    <div className="checkbox-input">
                      <input type="checkbox" />
                    </div>
                    <div className="name">{e?.name}</div>
                    <div className="mail">{e?.email}</div>
                    <div className="role">{USER_ROLE_TEXT[e?.role]}</div>
                    <div className="join">
                      {e?.created_at?.substring(0, 10)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="list-btn-action-member">
          <button onClick={() => handleClose()}>Cancel</button>
          <button onClick={() => handleCreate()}>Save</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default AddMemberModal;
