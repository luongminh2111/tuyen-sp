import React from "react";
import "../styles/Staff.scss";
import { useState } from "react";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import { useHistory } from "react-router-dom";


function Staffs(props) {

  const history = useHistory();

  const [isEdit, setIsEdit] = useState(false);

  const renderEditUser = () => {
    return (
      <div className="add-user-content-wrapper">
        <div className="title d-flex" style={{color: '#666', fontWeight: '600'}}>
          <div>Edit User </div>
          <div>
            <i class="fa-sharp fa-solid fa-circle-question"></i>
          </div>
        </div>
        <div className="back-to-edit" onClick={() => setIsEdit(false)} style={{marginTop: '12px', fontSize: '13px'}}>
          <i class="fa-sharp fa-solid fa-arrow-left" style={{marginRight: '8px'}}></i>
          Back
        </div>
        <hr />
        <div className="add-user-content">
          <div className="info">User Information</div>
          <div className="add-item">
            <div className="input-name">
              <div className="label">
                <span>Full name</span>
                <span>*</span>
              </div>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className="input-name mt-3">
              <div className="label">
                <span>Email Address</span>
                <span>*</span>
              </div>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className="input-name mt-3">
              <div className="label">
                <span>Avatar</span>
                <span>*</span>
              </div>
              <div className="avatar">
                <img src={ORG_IMAGE_DEFAULT} ></img>
              </div>
            </div>
            <div className="input-name mt-3">
              <div className="label">
                <span>Role</span>
                <span>*</span>
              </div>
              <div>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center submit-btn">
          <button>Add</button>
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
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" />
          <i class="fa-solid fa-x"></i>
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
                  <i class="fa-solid fa-x"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Staffs;
