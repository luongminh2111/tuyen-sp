import React from "react";

function Status(props) {
  return (
    <div className="status-wrapper">
      <div className="status-label">Status</div>
      <div className="status-content">
        <div className="graph--bar -w-full">
          <div className="graph--bar__fig">
            <div className="graph--process"></div>
            <div className="graph--bar__numbers">0% closed</div>
          </div>
        </div>
        <div className="graph--bar__info">
          <div className="graph--bar__info-wrapper open">
            <div className="label">Open</div>
            <div className="graph--bar__info-number">
              {" "}
              <p>3</p>
            </div>
          </div>
          <div className="graph--bar__info-wrapper in-progress">
            <div className="label">In Progress</div>
            <div className="graph--bar__info-number">
              {" "}
              <p>3</p>
            </div>
          </div>
          <div className="graph--bar__info-wrapper resolved">
            <div className="label">Resolved</div>
            <div className="graph--bar__info-number">
              <p>3</p>
            </div>
          </div>
          <div className="graph--bar__info-wrapper closed">
            <div className="label">Closed</div>
            <div className="graph--bar__info-number">
              {" "}
              <p>3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Status;
