import React from "react";
import "../styles/FilterData/FilterData.scss"
import FilterLocation from "./FilterLocation";
import FilterPrice from "./FilterPrice";
import FilterTime from "./FilterTime";
import FilterSale from "./FilterSale";
import { memo } from "react";

function FilterData (props){

  const {sales} = props;

  return (
    <div className="filter-wrapper">
      <FilterLocation />
      <FilterPrice />
      <FilterTime />
      { sales?.filter(e => e && e > 0)?.length > 0?
      <FilterSale sales={sales}/> : null }
    </div>
  )
}
export default memo(FilterData);