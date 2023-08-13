import React, { useMemo, useState } from "react";
import "../styles/Filter.scss";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearFilterTask, updateFilterTask } from "../../ProjectSetting/actions/ProjectActionRedux";

function FilterIssue(props) {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState({});
  const [milestone, setMilestone] = useState({});
  const [assignee, setAssignee] = useState({});
  const members = useSelector((state) => state.projects.members);
  const milestones = useSelector((state) => state.projects.milestone);
  const [statusSelect, setStatusSelect] = useState("");

  const dispatch = useDispatch();

  const memberOptions = useMemo(() => {
    const newMembers = members?.map((e) => {
      return {
        ...e,
        value: e?.name,
      };
    });
    return newMembers;
  }, [members]);

  useEffect(() => {
    if (status?.id) {
      dispatch(updateFilterTask("status", status?.value));
    }
    if (milestone?.id > 0) {
      dispatch(updateFilterTask("milestone_id", milestone.id));
    }
    if (assignee?.id > 0) {
      dispatch(updateFilterTask("assignee_id", assignee.id));
    }
  }, [status, milestone, assignee]);

  const handleChangeKey = (value) => {
    setKey(value);
    setTimeout(() => {
      dispatch(updateFilterTask("key", value));
    }, 1000);
  };

  const mileStoneOptions = useMemo(() => {
    const newMileStones = milestones?.map((e) => {
      return {
        ...e,
        value: e?.name,
      };
    });
    return newMileStones;
  }, [milestones]);

  const handleSelectStatus = (value) => {
    setStatusSelect(value);
    dispatch(updateFilterTask("status", value));
  };

  const handleClear = () => {
    dispatch(clearFilterTask());
    setStatus({});
    setMilestone({});
    setAssignee({});
    setKey('');
  }

  return (
    <div className="issues-filter-wrapper">
        <div className="filter-buttons d-flex">
          <div style={{ fontWeight: "600", color: "#0F1824" }}>Status</div>
          <div className="status-filter d-flex" style={{ marginLeft: "24px" }}>
            <div
              className={`${statusSelect === "Open" ? "active" : ""} `}
              onClick={() => handleSelectStatus("Open")}
            >
              Open
            </div>
            <div
              className={`${statusSelect === "In Progress" ? "active" : ""} `}
              onClick={() => handleSelectStatus("In Progress")}
            >
              In Progress
            </div>
            <div
              className={`${statusSelect === "Resolved" ? "active" : ""}`}
              onClick={() => handleSelectStatus("Resolved")}
            >
              Resolved
            </div>
            <div
              className={`${statusSelect === "Closed" ? "active" : ""}`}
              onClick={() => handleSelectStatus("Closed")}
            >
              Closed
            </div>
            <div
              className={`${statusSelect === "Not_Closed" ? "active" : ""}`}
              onClick={() => handleSelectStatus("Not_Closed")}
            >
              Not Closed
            </div>
          </div>
        </div>
      <div className="filter-select-list d-flex">
        {/* <div className="issue-type" style={{ marginRight: "16px" }}>
          <div className="label mb-1">Status</div>
          <ButtonDropDown options={statusOptions} onChangeOption={setStatus} />
        </div> */}
        <div className="milestone" style={{ marginRight: "16px" }}>
          <div className="label mb-1">Milestone</div>
          <ButtonDropDown
            options={mileStoneOptions}
            onChangeOption={setMilestone}
          />
        </div>
        <div className="assignee" style={{ marginRight: "16px" }}>
          <div className="label mb-1">Assignee</div>
          <ButtonDropDown
            options={memberOptions}
            onChangeOption={setAssignee}
          />
        </div>
        <div className="keyword-input">
          <div className="label mb-1">Keyword</div>
          <input
            type="text"
            value={key}
            onChange={(e) => handleChangeKey(e.target.value)}
            placeholder="Enter keyword"
          />
        </div>
        <div className="clear-filter">
          <div>
            <button onClick={() => handleClear()}>Clear</button>
          </div>
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
    value: "Resolved",
  },
  {
    id: 4,
    value: "Closed",
  },
];
////todo, in progress, done code, review, testing, debug, done, pending, cancel
