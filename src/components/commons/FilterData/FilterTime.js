import React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "../styles/FilterData/FilterTime.scss";
import { Button } from "@mui/material";

function FilterTime(props) {
  const [dateSelect, setDateSelect] = useState(new Date());
  const dispatch = useDispatch();
  return (
    <div className="filter-time-wrapper">
      <div className="title">Time for trip</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="time-start mb-4">
          <DatePicker
            className="date__button"
            label="Start date"
            value={dateSelect}
            onChange={(newValue) => {
              setDateSelect(newValue.getTime());
              // dispatch(updatePropertiesTarget("date", newValue.getTime()));
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  "& fieldset": { border: "none" },
                }}
                {...params}
              />
            )}
          />
        </div>
        <div className="time-end">
          <DatePicker
            label="End date"
            className="date__button"
            value={dateSelect}
            onChange={(newValue) => {
              setDateSelect(newValue.getTime());
              // dispatch(updatePropertiesTarget("date", newValue.getTime()));
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  "& fieldset": { border: "none" },
                }}
                {...params}
              />
            )}
          />
        </div>
      </LocalizationProvider>
      <div className="search-btn d-flex justify-content-center">
        <Button variant="contained" className="mt-3">Search</Button>
      </div>
    </div>
  );
}
export default FilterTime;
