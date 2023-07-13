import React from "react";
import "../styles/ListProjects.scss";

function ListProject(props) {
  return (
    <div className="list-project-content-wrapper">
      <div className="title d-flex">
        <div>List of Projects</div>
        <div>
            <i class="fa-sharp fa-solid fa-circle-question"></i>
          </div>
      </div>
      <div className="btn-add-project">
       <button>Add Project</button>
      </div>
      <div className="filter-project d-flex">
        <div className="text-1">Filter project</div>
        <div className="search-input d-flex">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search in project name or project key" />
          <i class="fa-solid fa-x"></i>
        </div>
      </div>
      <div className="filter-result-table">
        <div className="header">
          <div className="name">Project Name</div>
          <div className="remove">Remove</div>
        </div>
        <div className="body">
          {[0, 1, 2, 3]?.map((e) => {
            return (
              <div className="item">
                <div className="name">Project {e}</div>
                <div className="remove">
                  <i class="fa-solid fa-x"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ListProject;
