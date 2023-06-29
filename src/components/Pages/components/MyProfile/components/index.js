import React from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";

function MyProfile(props) {

  const history = useHistory();
  return (
    <div className="my-profile">
      <div className="back-to-home">
          <button onClick={() =>  history.push("/")}>Back to Home Page</button>
      </div>
      <div className="profile-container">
        <div className="content">
          <div className="d-flex justify-content-center mb-3 mt-2">MY PROFILE</div>
          <div className="avatar">
            <div>V</div>
          </div>
          <div className="username">
            <div className="label">Username</div>
            <div><input type="text" /></div>
          </div>
          <div className="unique-id mt-4">
            <div className="label">Unique ID</div>
            <div><input type="text" /></div>
            <div className="note">This ID is used for @mention tags</div>
          </div>
          <div className="email mt-4">
            <div className="label">Email</div>
            <div><input type="text" /></div>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyProfile;
