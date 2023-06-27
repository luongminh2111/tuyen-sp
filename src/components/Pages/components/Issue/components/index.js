import React from "react";
import ToggleNav from "../../../../../commons/ToggleNav";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import HeaderIssue from "./HeaderIssue";
import FilterIssue from "./FilterIssue";
import TableIssue from "./TableIssue";
import "../styles/index.scss";
import { useSelector } from "react-redux";

function Issues(props) {

  const isExpand = useSelector(state => state.global.isExpand);
  return (
    <>
      <ToggleNav />
      <div className={`issues-wrapper ${isExpand ? 'menu-expand' : ''}`}>
        <HeaderNav />
        <div className="issues-content">
          <HeaderIssue />
          <FilterIssue />
          <TableIssue />
        </div>
      </div>
    </>
  );
}
export default Issues;
