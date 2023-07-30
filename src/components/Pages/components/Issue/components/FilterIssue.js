import React, { useMemo, useState } from "react";
import "../styles/Filter.scss";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import { taskOptions } from "../../AddIssue/commons/DataCommon";
import { useSelector } from "react-redux";

function FilterIssue(props) {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState({});
  const [milestone, setMilestone] = useState({});
  const [assignee, setAssignee] = useState({});
  const members = useSelector(state => state.projects.members);
  const milestones = useSelector(state => state.projects.milestone);

  
  const memberOptions = useMemo(() => {
    const newMembers = members?.map(e => {
      return {
        ...e, 
        value: e?.name
      }
    });
    return newMembers;
  }, [members]);

  
  const mileStoneOptions = useMemo(() => {
    const newMileStones = milestones?.map(e => {
      return {
        ...e, 
        value: e?.name
      }
    });
    return newMileStones;
  }, [milestones]);

  return (
    <div className="issues-filter-wrapper">
      <div className="filter-select-list d-flex">
        <div className="issue-type" style={{marginRight: '16px'}}>
          <div className="label mb-1">Status</div>
          <ButtonDropDown options={statusOptions} onChangeOption={setStatus} />
        </div>
        <div className="milestone" style={{marginRight: '16px'}}>
          <div className="label mb-1">Milestone</div>
          <ButtonDropDown options={mileStoneOptions} onChangeOption={setMilestone} />
        </div>
        <div className="assignee" style={{marginRight: '16px'}}>
          <div className="label mb-1">Assignee</div>
          <ButtonDropDown options={memberOptions} onChangeOption={setAssignee} />
        </div>
        <div className="keyword-input">
          <div className="label mb-1">Keyword</div>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter keyword"
          />
        </div>
      </div>
    </div>
  );
}
export default FilterIssue;

const statusOptions = [
  {
    id: 1,
    value: "Open",
  },
  {
    id: 2,
    value: "In Progress",
  },
  {
    id: 3,
    value: "Resolve",
  },
  {
    id: 4,
    value: "Closed",
  },
];
