

import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import React from "react";
import "../styles/FilterData/FilterLocaton.scss";
import { useState } from "react";

function FilterLocation(props){

  const [locationValue, setLocationValue] = useState('');

  const handleFilterLocation = (e) => {
    setLocationValue(e.target.value);
  }

  return (
    <div className="filter-location-wrapper">
      <div className="title">
        Destination or name
      </div>
      <div className="input-field">
      <TextField id="standard-basic" label="Search..." variant="standard" onChange={(e) => handleFilterLocation(e)} />
      </div>
      <Button variant="contained" >Search</Button>
    </div>      
  )
}
export default FilterLocation;