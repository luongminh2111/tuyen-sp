import React from "react";
import "../styles/Member.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUserInProject, getListMemberInWorkspace, getListMemberOfProject } from "../actions/ProjectActionCallApi";
import { useState } from "react";
import AddMemberModal from "./AddMemberModal";
import { USER_ROLE_TEXT } from "../../../../../commons/Commons";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import Alerts from "../../../../../commons/Alert";
import { DialogContent, Dialog } from "@mui/material";
import { UPDATE_LIST_MEMBER_IN_PROJECT } from "../actions/ProjectActionType";

function MemberSetting(props) {

  const { projectId, account } = props;

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");
  const [roleOption, setRoleOption] = useState({});
  const members = useSelector(state => state.projects.members);
  const hasIds = members?.map(e => e.id);

  const [open1, setOpen1] = useState(false);
  const [idSelect, setIdSelect] = useState("");
  
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

  const handleDeleteUser = (id) => {
    dispatch(deleteUserInProject(id)).then(res => {
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res.data?.message);
        setOpen1(false);
        setIdSelect("");
        dispatch({type: UPDATE_LIST_MEMBER_IN_PROJECT, id: idSelect});
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res.data?.message);
      }
    });
  };

  const renderAlert = () => {
    return (
      <Dialog open={open1} className="dialog-delete-member" maxWidth="lg">
        <DialogContent>
          <div className="contents-add d-flex justify-content-between">
          All information related to this user in this project will be deleted. Are you sure delete?
          </div>
          <div className="list-action-member d-flex justify-content-end" style={{marginTop: '16px'}}>
            <button style={{background: '#FF4d4d', marginRight: '16px'}} onClick={() => setOpen1(false)}>Cancel</button>
            <button onClick={() => handleDeleteUser(idSelect)}>Delete</button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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
                  <i className="fa-solid fa-x" onClick={() => {setOpen1(true); setIdSelect(e.id)}}></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {open1 ? renderAlert() : null}
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
    value: "Workspace Admin",
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
