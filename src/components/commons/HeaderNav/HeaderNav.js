import React, { useState } from "react";
import "../styles/HeaderNav/HeaderNav.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import ReactTooltip from "react-tooltip";

function HeaderNav(props) {
  const [showDropDownUser, setShowDropDownUser] = useState(false);

  const userRef = useRef();

  const account = useSelector((state) => state.auth.account);

  const history = useHistory();

  const handleRedirectPage = (pageUrl) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        history.push(`/${pageUrl}`);
      }
    } catch (e) {
      window.alert("You must be login for this function");
      history.push(`/`);
    }
  };

  const renderDropdownUser = () => {
    return (
      <div className="dropdown-user-wrapper">
        <div>Hello + User Name</div>
        <div>Activity</div>
        <div>Personal Settings</div>
        <div>Space Settings</div>
      </div>
    );
  };

  const useOutsideAccount = (userRef) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          userRef.current &&
          !userRef.current.contains(event.target) &&
          !showDropDownUser
        ) {
          setShowDropDownUser(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [userRef]);
  };

  useOutsideAccount(userRef);

  return (
    <div className="header-nav-wrapper">
      <div className="nav-bar left d-flex">
        <div className="org-icon">
          <i className="fa-sharp fa-solid fa-building"></i>
        </div>
        <div className="dashboard d-flex align-items-center">Dashboard</div>
      </div>
      <div className="nav-bar right d-flex">
        <div className="member" data-tip="" data-for="icon-member">
          <i className="fa-solid fa-users"></i>
          <ReactTooltip
            type="dark"
            effect="solid"
            place="bottom"
            id="icon-member"
          >
            Member
          </ReactTooltip>
        </div>
        <div className="notification" data-tip="" data-for="icon-noti">
          <i className="fa-solid fa-bell"></i>
          <ReactTooltip
            type="dark"
            effect="solid"
            place="bottom"
            id="icon-noti"
          >
            Notification
          </ReactTooltip>
        </div>
        <div
          className="current-user d-flex"
          data-tip=""
          data-for="icon-user"
          ref={userRef}
          onClick={() => setShowDropDownUser(!showDropDownUser)}
        >
          <i className="fa-solid fa-user"></i>
          <i class="fa-solid fa-caret-down"></i>
          <ReactTooltip
            type="dark"
            effect="solid"
            place="bottom"
            id="icon-user"
          >
            User
          </ReactTooltip>
          {showDropDownUser ? renderDropdownUser() : null}
        </div>
      </div>
    </div>
  );
}
export default HeaderNav;
