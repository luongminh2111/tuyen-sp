import React from "react";
import "../styles/Staff.scss";
import { useState } from "react";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import { useHistory } from "react-router-dom";
import { USER_ROLE, USER_ROLE_TEXT } from "../../../../../commons/Commons";
import { useDispatch, useSelector } from "react-redux";
import { createMemberForWorkspace } from "../actions/WorkplaceActionCallApi";
import Alerts from "../../../../../commons/Alert";
import { useEffect } from "react";
import { createNewMember } from "../actions/WorkplaceActionRedux";
import { getListMemberInWorkspace } from "../../ProjectSetting/actions/ProjectActionCallApi";

function Staffs(props) {

  const staffs = useSelector(state => state.staffs.items);

  const history = useHistory();
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState(USER_ROLE.MEMBER);

    
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  useEffect(() => {
    dispatch(getListMemberInWorkspace());
  }, []);

  const handleValidateEmail = (mail) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      return false;
    }
    return true;
  };

  const handleAddUser = () => {
    if(password !== rePassword) {
      setOpenAlert(true);
      setTextAlert("password incorrect, try again!");
      setStatusAlert("error");
    }

    if(handleValidateEmail(email)){
      setOpenAlert(true);
      setTextAlert("Email is not in the correct format!");
      setStatusAlert("error");
    }
    
    const request = {
      name: userName,
      email,
      password,
      password_confirmation: rePassword,
      role
    };
    dispatch(createMemberForWorkspace(request)).then(res => {
      console.log("check res :", res);
      if(res?.status === 201 && res?.data?.user) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res.data.message);
        dispatch(createNewMember(res.data.user));
        setTimeout(() => {
          setIsEdit(false);
        }, [1500]);
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res.data.message);
      }
    });
  }

  const renderEditUser = () => {
    return (
      <div className="add-user-content-wrapper">
        <div
          className="title d-flex"
          style={{ color: "#666", fontWeight: "600" }}
        >
          <div>Edit User </div>
          <div>
            <i className="fa-sharp fa-solid fa-circle-question"></i>
          </div>
        </div>
        <div
          className="back-to-edit"
          onClick={() => setIsEdit(false)}
          style={{ marginTop: "12px", fontSize: "13px" }}
        >
          <i
            className="fa-sharp fa-solid fa-arrow-left"
            style={{ marginRight: "8px" }}
          ></i>
          Back
        </div>
        <hr />
        <div className="add-user-content">
          <div className="info">User Information</div>
          <div className="add-item">
            <div className="input-name">
              <div className="label">
                <span>Username</span>
                <span>*</span>
              </div>
              <div>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-email mt-3">
              <div className="label">
                <span>Email Address</span>
                <span>*</span>
              </div>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input-pass mt-3">
              <div className="label">
                <span>Password</span>
                <span>*</span>
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                />
              </div>
            </div>
            <div className="input-pass mt-3">
              <div className="label">
                <span>Confirm password</span>
                <span>*</span>
              </div>
              <div>
                <input
                  type="password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </div>
            </div>
            <div className="input-role mt-3">
              <div>
                <label for="role_select">
                  <span>Role</span>
                  <span>*</span>
                </label>
                <select id="role_select" name="role_select" onChange={(e) => setRole(e.target.value)}>
                  <option value={USER_ROLE.MEMBER} style={{height: '36px'}} >Member</option>
                  <option value={USER_ROLE.PM}>Project manager</option>
                </select>
              </div>
            </div>
            <div className="input-avatar mt-3">
              <div className="label">
                <span>Avatar</span>
                <span>*</span>
              </div>
              <div className="avatar">
                <img src={ORG_IMAGE_DEFAULT}></img>
              </div>
            </div>
            
          </div>
        </div>
        <div className="d-flex justify-content-center submit-btn">
          <button onClick={() => handleAddUser()} style={{width: '200px'}}>Create new member</button>
        </div>
      </div>
    );
  };

  if (isEdit) {
    return renderEditUser();
  }

  return (
    <div className="staff-content-wrapper">
      <div className="title d-flex">
        <div>Staffs ({staffs?.length || 0} members)</div>
      </div>
      <div className="btn-add-user">
        <button onClick={() => setIsEdit(true)}>Add User</button>
      </div>
      <div className="filter-member d-flex">
        <div className="text-1">Filter staff</div>
        <div className="search-input d-flex">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" />
          <i className="fa-solid fa-x"></i>
        </div>
      </div>
      <div className="filter-result-table">
        <div className="header">
          <div className="name">Username</div>
          <div className="mail">Email Address</div>
          <div className="role">Role</div>
          <div className="active">Active status</div>
          <div className="join">Join on</div>
          <div className="remove">Remove</div>
        </div>
        <div className="body">
          {staffs?.map((e, index) => {
            return (
              <div className="item" onClick={() => history.push("/my-profile")} key={index}>
                <div className="name">{e?.name}</div>
                <div className="mail">{e?.email}</div>
                <div className="role">{USER_ROLE_TEXT[e?.role]}</div>
                <div className={e?.is_active === 1 ? 'activated' : 'unactivated'}>{e?.is_active === 1 ? 'activated' : 'unactivated'}</div>
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
    </div>
  );
}
export default Staffs;
