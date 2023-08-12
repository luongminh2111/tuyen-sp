import React, { useState } from "react";
import "../styles/HeaderNav/HeaderNav.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { EMPTY_USER, ORG_IMAGE_DEFAULT } from "../../../commons/image";
import { logout } from "../../Pages/actions/AccountActionCallApi";
import NotificationPopup from "./NotificationPopup";
import { getNotiCount } from "../../Pages/actions/NotiActionCallApi";

function HeaderNav(props) {
  const [showDropDownUser, setShowDropDownUser] = useState(false);

  const userRef = useRef();
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const [showNoti, setShowNoti] = useState(false);
  const workspace = useSelector(state => state.workplace?.workspace);

  const account = useSelector((state) => state.auth.account);

  const history = useHistory();

  useEffect(() => {
    dispatch(getNotiCount()).then((res) => {
      if (res?.data > 0) {
        setCount(res.data);
      }
    });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch({ type: "RESET_AUTH" });
    sessionStorage.removeItem("token_admin");
    localStorage.removeItem("user");
    history.push("/sign-in");
  };

  const renderDropdownUser = () => {
    return (
      <div className="dropdown-user-wrapper">
        <div onClick={() => history.push("/my-profile")}>My Profile</div>
        <div onClick={() => handleLogout()}>Logout</div>
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

  const handleRedirectToMember = () => {
    history.push("workplace-setting?id=staff");
  };

  return (
    <div className="header-nav-wrapper">
      <div
        className="nav-bar left d-flex"
        onClick={() => history.push("/dashboard")}
      >
        <div className="org-icon">
          <img src={workspace?.avatar || ORG_IMAGE_DEFAULT} alt="avatar" style={{borderRadius: '4px'}} />
        </div>
        <div className="dashboard d-flex align-items-center">Dashboard</div>
      </div>
      <div className="nav-bar right d-flex">
        <div className="member" onClick={() => handleRedirectToMember()}>
          <i
            className="fa-solid fa-users"
            data-tip=""
            data-for="icon-member"
          ></i>
          <ReactTooltip
            type="dark"
            effect="solid"
            place="bottom"
            id="icon-member"
          >
            Member
          </ReactTooltip>
        </div>

        <div className="notification">
          <i
            className="fa-solid fa-bell"
            data-tip=""
            data-for="icon-noti "
            onClick={() => setShowNoti(true)}
          ></i>
          {count > 0 ? (
            <div className="count" style={{fontSize: '11px'}}>
              {count}
            </div>
          ) : null}
          {showNoti ? <NotificationPopup setShowNoti={setShowNoti} count={count} setCount={setCount} /> : null}
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
          ref={userRef}
          onClick={() => setShowDropDownUser(!showDropDownUser)}
        >
            <img src={account?.avatar || EMPTY_USER}  alt="avatar-user"style={{width: '30px', height: '30px', borderRadius: '50%'}} />
          <i className="fa-solid fa-caret-down"></i>
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
