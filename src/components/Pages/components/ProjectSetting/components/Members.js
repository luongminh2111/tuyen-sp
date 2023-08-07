import React from "react";
import "../styles/Member.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListMemberInWorkspace, getListMemberOfProject } from "../actions/ProjectActionCallApi";
import { useState } from "react";
import AddMemberModal from "./AddMemberModal";
import { USER_ROLE_TEXT } from "../../../../../commons/Commons";

function MemberSetting(props) {

  const { projectId } = props;

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const members = useSelector(state => state.projects.members);
  const hasIds = members?.map(e => e.id);

  useEffect(() => {
    dispatch(getListMemberInWorkspace());
    dispatch(getListMemberOfProject(projectId));
  }, []);


  return (
    <div className="member-content-wrapper">
      <div className="title d-flex">
        <div>Project Members ({members?.length} members)</div>
      </div>
      <div className="add-member-btn">
        <button onClick={() => setOpenModal(true)}>Add member</button>
      </div>
      <div className="filter-member d-flex">
        <div className="text-1">Filter users</div>
        <div className="search-input d-flex">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" />
          <i className="fa-solid fa-x"></i>
        </div>
      </div>
      <div className="filter-result-table">
        <div className="header">
          <div className="name">Nick Name</div>
          <div className="mail">Email Address</div>
          <div className="role">Role</div>
          <div className="join">Join on</div>
          <div className="remove">Remove</div>
        </div>
        <div className="body">
          {members?.map((e, index) => {
            return (
              <div className="item" key={index}>
                <div className="name">{e?.name}</div>
                <div className="mail">{e?.email}</div>
                <div className="role">{USER_ROLE_TEXT[e?.role]}</div>
                <div className="join">{e?.created_at?.substring(0, 10)}</div>
                <div className="remove">
                  <i className="fa-solid fa-x"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {openModal ? 
      <AddMemberModal open={openModal} handleClose={() => setOpenModal(false)} projectId={projectId} hasIds={hasIds} /> : null}
    </div>
  );
}
export default MemberSetting;
