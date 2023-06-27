import React from "react";

function Milestones(props) {
  return (
    <div className="milestone-wrapper">
      <div className="milestone-label">Milestone</div>
      <div className="milestone-content">
        <div className="graph--bar -w-full">
          <div className="graph--bar-label">Milestone 1</div>
          <div className="graph--bar__fig">
            <div className="graph--process"></div>
            <div className="graph--bar__numbers">0% closed</div>
          </div>
        </div>
        <div className="graph--bar -w-full">
        <div className="graph--bar-label">Milestone 2</div>
          <div className="graph--bar__fig">
            <div className="graph--process"></div>
            <div className="graph--bar__numbers">0% closed</div>
          </div>
        </div>
        <div className="graph--bar -w-full">
        <div className="graph--bar-label">Milestone 3</div>
          <div className="graph--bar__fig">
            <div className="graph--process"></div>
            <div className="graph--bar__numbers">0% closed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Milestones;
