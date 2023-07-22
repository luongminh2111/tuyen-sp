import React from "react";
import "../styles/Table.scss";

function TableIssue(props) {
  const renderHeader = () => {
    return (
      <div className="table-header">
        <div className="issue-type">Issue Type</div>
        <div className="key">Key</div>
        <div className="subject">Subject</div>
        <div className="assignee">Assignee</div>
        <div className="status">Status</div>
        <div className="category">Category</div>
        <div className="priority">Priority</div>
        <div className="version">Version</div>
        <div className="milestone">Milestone</div>
        <div className="created">Created</div>
        <div className="due-date">Due date</div>
        <div className="updateAt">Update At</div>
        <div className="register">Register By</div>
        <div className="attachment">Attachment</div>
        <div className="share-file">Share File</div>
      </div>
    );
  };

  const renderItem = () => {
    return(
      <div className="issue-item">
      <div className="item_type">
        <div>Task</div>
        </div>
       <div className="item_key">PMA_web1</div>
       <div className="item_subject">Lấy thông tin khách hàng 1</div>
       <div className="item_assignee">ohaiyou</div>
       <div className="item_status"><div>open</div></div>
       <div className="item_category">Category</div>
       <div className="item_priority"><i className="fa-solid fa-arrow-right"></i></div>
       <div className="item_version"></div>
       <div className="item_milestone">Milestone 1</div>
       <div className="item_created">Auth 26, 2023</div>
       <div className="item_due-date"></div>
       <div className="item_updateAt">June 26, 2023</div>
       <div className="item_register">Vu Duc Tuyen</div>
       <div className="item_attachment"></div>
       <div className="item_share-file"></div>
   </div>
    );
   
  }

  return (
    <>
      <div className="issues-table-wrapper">
        <div className="pagination"></div>
        {renderHeader()}
        <div className="table-content">
        {[1, 2,3, 4]?.map(e => {
          return(
          renderItem())}
        )}
        </div>
       
      </div>
    </>
  );
}
export default TableIssue;

