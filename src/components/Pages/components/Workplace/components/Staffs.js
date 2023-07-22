import React from "react";
import "../styles/Staff.scss";
import { useState } from "react";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import { useHistory } from "react-router-dom";
import { USER_ROLE } from "../../../../../commons/Commons";
import { useDispatch } from "react-redux";
import { createMemberForWorkspace } from "../actions/WorkplaceActionCallApi";
import Alerts from "../../../../../commons/Alert";

function Staffs(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState(USER_ROLE.MEMBER);

    
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const handleValidateEmail = (mail) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      return false;
    }
    return true;
  };

  const handleAddUser = () => {
    if(passWord !== rePassword) {
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
      passWord,
      password_confirmation: rePassword,
      role
    };
    dispatch(createMemberForWorkspace(request)).then(res => {
      console.log("check res :", res);
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
                  value={passWord}
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
          <button onClick={() => handleAddUser()}>Create new member</button>
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
        <div>Staffs (4 members)</div>
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
          <div className="name">Nick Name</div>
          <div className="mail">Email Address</div>
          <div className="role">Role</div>
          <div className="join">Join on</div>
          <div className="remove">Remove</div>
        </div>
        <div className="body">
          {[0, 1, 2, 3]?.map((e) => {
            return (
              <div className="item" onClick={() => history.push("/my-profile")}>
                <div className="name">Vu Duc Tuyen</div>
                <div className="mail">vutuyenkt2000@gmail.com</div>
                <div className="role">Administrator</div>
                <div className="join">Aug. 25, 2022</div>
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
