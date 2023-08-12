import React from "react";
import "../styles/Member.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListMemberInWorkspace, getListMemberOfProject } from "../actions/ProjectActionCallApi";
import { useState } from "react";
import AddMemberModal from "./AddMemberModal";
import { USER_ROLE_TEXT } from "../../../../../commons/Commons";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import Alerts from "../../../../../commons/Alert";

function MemberSetting(props) {

  const { projectId, account } = props;

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");
  const [roleOption, setRoleOption] = useState({});
  const members = useSelector(state => state.projects.members);
  const hasIds = members?.map(e => e.id);

  
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);


  useEffect(() => {
    dispatch(getListMemberInWorkspace());
    dispatch(getListMemberOfProject(projectId));
  }, []);

  const handleChangeQuery = (value) => {
    setQuery(value);
  };

  const handleChangeOpen = (value) => {
    if (account?.role === 3) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("You do not have permission to perform this operation");
      return;
    }
    setOpenModal(value);
  }

  useEffect(() => {
    dispatch(getListMemberOfProject(projectId, query, roleOption.id));
  }, [query, roleOption]);


  return (
    <div className="member-content-wrapper">
      <div className="title d-flex">
        <div>Project Members ({members?.length} members)</div>
      </div>
      <div className="add-member-btn">
        <button onClick={() => handleChangeOpen(true)}>Add member</button>
      </div>
      <div className="filter-member d-flex">
        <div className="text-1">Filter staff</div>
        <div className="search-input d-flex">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search in userId, Name, Email"
            value={query}
            onChange={(e) => handleChangeQuery(e.target.value)}
          />
          <i
            className="fa-solid fa-x"
            onClick={() => handleChangeQuery("")}
          ></i>
        </div>
        <div className="text-2">
          <ButtonDropDown
            options={roleOptions}
            onChangeOption={setRoleOption}
          ></ButtonDropDown>
        </div>
      </div>
      <div className="filter-result-table">
        <div className="header">
          <div className="member-name">Nick Name</div>
          <div className="mail">Email Address</div>
          <div className="role">Role</div>
          <div className="join">Join on</div>
          <div className="remove">Remove</div>
        </div>
        <div className="body">
          {members?.map((e, index) => {
            return (
              <div className="item" key={index}>
                <div className="member-name">{e?.name}</div>
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
      {openAlert ? (
        <Alerts
          text={textAlert}
          status={statusAlert}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      ) : null}
      {openModal ? 
      <AddMemberModal open={openModal} handleClose={() => setOpenModal(false)} projectId={projectId} hasIds={hasIds} /> : null}
    </div>
  );
}
export default MemberSetting;


const roleOptions = [
  {
    id: 0,
    value: "All",
  },
  {
    id: 1,
    value: "Admin",
  },
  {
    id: 2,
    value: "PM",
  },
  {
    id: 3,
    value: "member",
  },
];
