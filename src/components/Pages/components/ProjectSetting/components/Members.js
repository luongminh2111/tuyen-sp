import React from "react";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import "../styles/Member.scss";

function MemberSetting(props) {
  return (
    <div className="member-content-wrapper">
      <div className="title d-flex">
        <div>Project Members (1 members)</div>
      </div>
      <div className="filter-member d-flex">
        <div className="text-1">Filter users</div>
        <div className="search-input d-flex">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" />
          <i className="fa-solid fa-x"></i>
        </div>
        <div className="role-btn">
          <ButtonDropDown options={["a", "b"]} />
        </div>
        <div className="user-btn">
          <ButtonDropDown options={["a", "b"]} />
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
              <div className="item">
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
    </div>
  );
}
export default MemberSetting;
