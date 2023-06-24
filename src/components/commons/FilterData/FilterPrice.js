import React from "react";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import "../styles/FilterData/FilterPrice.scss";
import { Button } from "@mui/material";

function FilterPrice(props) {
  const [value, setValue] = useState([0, 10]);

  const valuetext = (value) => {
    return `${value}$`;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="filter-price-range">
      <div className="label">Price Ranger($) </div>
      <div className="value mb-2">
        <span>${value[0] * 10}</span>
        &nbsp; - &nbsp;
        <span>${value[1] * 10}</span>
      </div>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <div className="d-flex justify-content-center mt-4 mb-2">
        <Button variant="contained" >Search</Button>
      </div>

    </div>
  );
}
export default FilterPrice;
