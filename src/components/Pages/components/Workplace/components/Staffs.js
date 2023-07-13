import React from "react";
import "../styles/Staff.scss";

function Staffs(props) {
  return (
    <div className="staff-content-wrapper">
      <div className="title d-flex">
        <div>Staffs (4 members)</div>
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
              <div className="item">
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
