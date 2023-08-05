import React, {useState} from "react";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import "../styles/BoardFilter.scss";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateFilterTask } from "../../ProjectSetting/actions/ProjectActionRedux";

function BoardFilter(props) {
  const { members, milestones, setMilestone, setAssignee, statusSelect, setStatusSelect } = props;

  const dispatch = useDispatch();
  const [key, setKey] = useState("");


  const handleSelectStatus = (value) => {
    setStatusSelect(value);
  }

  const handleChangeKey = (value) => {
    setKey(value);
    setTimeout(() => {
      dispatch(updateFilterTask(value));
    }, [600]);
  }

  const memberOptions = useMemo(() => {
    const newMembers = members?.map((e) => {
      return {
        ...e,
        value: e?.name,
      };
    });
    return newMembers;
  }, [members]);

  const mileStoneOptions = useMemo(() => {
    const newMileStones = milestones?.map((e) => {
      return {
        ...e,
        value: e?.name,
      };
    });
    return newMileStones;
  }, [milestones]);
  return (
    <div className="board-filter-wrapper">
      <div className={`filter-header`}>
        <div className="header-left">
          <div className="title">Board</div>
        </div>
      </div>
      <div className="filter-expand">
        <div className="filter-buttons d-flex">
          <div style={{fontWeight: '600', color: '#0F1824'}}>Status</div>
          <div className="status-filter d-flex" style={{marginLeft: '24px'}}>
            <div className={`${statusSelect === 'Open' ? 'active' : ''} `} onClick={() => handleSelectStatus('Open')}>Open</div>
            <div className={`${statusSelect === 'In Progress' ? 'active' : ''} `} onClick={() => handleSelectStatus('In Progress')}>In Progress</div>
            <div className={`${statusSelect === 'Resolved' ? 'active' : ''}`}onClick={() => handleSelectStatus('Resolved')}>Resolved</div>
            <div className={`${statusSelect === 'Closed' ? 'active' : ''}`}onClick={() => handleSelectStatus('Closed')}>Closed</div>
          </div>
        </div>
        <div className="filter-select-list">
          <div className="milestone">
            <div className="label">Milestone</div>
            <ButtonDropDown
              options={mileStoneOptions}
              onChangeOption={setMilestone}
            />
          </div>
          <div className="assignee">
            <div className="label">Assignee</div>
            <ButtonDropDown
              options={memberOptions}
              onChangeOption={setAssignee}
            />
          </div>
          <div className="keyword-input" style={{marginTop: '0'}}>
          <div className="label mb-1">Keyword</div>
          <input
            type="text"
            value={key}
            onChange={(e) => handleChangeKey(e.target.value)}
            placeholder="Enter keyword"
          />
        </div>
        </div>
      </div>
    </div>
  );
}
export default BoardFilter;
