import * as React from "react";
import Pagination from "@mui/material/Pagination";
import "../styles/PaginationCommon.scss";
import { useDispatch } from "react-redux";

function PaginationCommon(props) {
  const { filter } = props;
  const dispatch = useDispatch();

  const handleChangeFilterPage = (newPage) => {
    dispatch({type: 'CHANGE_FILTER_PAGE_HOTEL', data: newPage})
  }

  return (
    <div className="pagination-wrapper">
      <div className="show-total">Total result: {filter.total}</div>
      <div className="show-page">
        <Pagination count={Math.round(filter.total / filter.limit)} variant="outlined" shape="rounded" onChange={(value, page) => handleChangeFilterPage(page)} />
      </div>
    </div>
  );
}
export default PaginationCommon;
