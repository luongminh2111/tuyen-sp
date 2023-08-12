import React, { useEffect } from "react";
import "../styles/ListProjects.scss";
import { useState } from "react";
import CreateNewProject from "./modals/CreateProjectModal";
import { useDispatch, useSelector } from "react-redux";
import { getListProject } from "../actions/WorkplaceActionCallApi";
import { useHistory } from "react-router-dom";
import { showDetailProject } from "../actions/WorkplaceActionRedux";
import {
  clearFilterProject,
  updateFilterProject,
} from "../../ProjectSetting/actions/ProjectActionRedux";
import Alerts from "../../../../../commons/Alert";

function ListProject(props) {
  const projects = useSelector((state) => state.projects.items);
  const filter = useSelector((state) => state.projects.filterProject);
  const account = useSelector((state) => state.auth.account);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const [openModal, setOpenModal] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  useEffect(() => {
    dispatch(getListProject());
  }, []);

  useEffect(() => {
    if (filter && filter?.key) {
      dispatch(getListProject(filter?.key));
    }
  }, [filter]);

  const handleChangeQuery = (value) => {
    setQuery(value);
    if (value?.trim() !== "") {
      setTimeout(() => {
        dispatch(updateFilterProject("key", value));
      }, 600);
    }
  };
  const handleChangeOpenModal = (value) => {
    if (account?.role !== 1) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("You do not have permission to perform this operation");
      return;
    };
    setOpenModal(value);
  }

  const handleClear = () => {
    setQuery("");
    dispatch(clearFilterProject());
    dispatch(getListProject());
  };

  const handleGoToProject = (item) => {
    dispatch(showDetailProject(item?.id));
    history.push(`/project?name=${item?.name}`);
  };

  return (
    <div className="list-project-content-wrapper">
      <div className="title d-flex">
        <div>List of Projects</div>
        <div>
          <i className="fa-sharp fa-solid fa-circle-question"></i>
        </div>
      </div>
      <div className="btn-add-project">
        <button onClick={() => handleChangeOpenModal(true)}>Add Project</button>
      </div>
      <div className="filter-project d-flex">
        <div className="text-1">Filter project</div>
        <div className="search-input d-flex">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search in project name or project key"
            value={query}
            onChange={(e) => handleChangeQuery(e.target.value)}
          />
          <i className="fa-solid fa-x" onClick={() => handleClear()}></i>
        </div>
      </div>
      <div className="filter-result-table">
        <div className="header">
          <div className="name">Project Name</div>
          <div className="key">Project key</div>
          <div className="desc">description</div>
          <div className="remove">Remove</div>
        </div>
        <div className="body">
          {projects?.map((e, index) => {
            return (
              <div
                className="item"
                key={index}
                onClick={() => handleGoToProject(e)}
              >
                <div className="name">{e?.name}</div>
                <div className="key">{e?.project_key}</div>
                <div className="desc">{e?.description}</div>
                <div className="remove">
                  <i className="fa-solid fa-x"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {openModal ? (
        <CreateNewProject
          open={openModal}
          handleClose={() => setOpenModal(false)}
        />
      ) : null}
       {openAlert ? (
        <Alerts
          text={textAlert}
          status={statusAlert}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      ) : null}
    </div>
  );
}
export default ListProject;
