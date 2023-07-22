import React, { useEffect } from "react";
import "../styles/ListProjects.scss";
import { useState } from "react";
import CreateNewProject from "./modals/CreateProjectModal";
import { useDispatch, useSelector } from "react-redux";

function ListProject(props) {
  
  const projects = useSelector(state => state.projects.items);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="list-project-content-wrapper">
      <div className="title d-flex">
        <div>List of Projects</div>
        <div>
            <i className="fa-sharp fa-solid fa-circle-question"></i>
          </div>
      </div>
      <div className="btn-add-project">
       <button onClick={() => setOpenModal(true)}>Add Project</button>
      </div>
      <div className="filter-project d-flex">
        <div className="text-1">Filter project</div>
        <div className="search-input d-flex">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search in project name or project key" />
          <i className="fa-solid fa-x"></i>
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
              <div className="item" key={index}>
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
      {openModal ?
       <CreateNewProject 
       open={openModal} 
       handleClose={() => setOpenModal(false)}
       /> 
       : null}
    </div>
  );
}
export default ListProject;
