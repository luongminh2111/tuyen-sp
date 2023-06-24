import React, { useState } from "react";
import "../styles/SearchStyle.scss";
import { Button, Input } from "@material-ui/core";
import { GridSearchIcon } from "@mui/x-data-grid";

function Search(props) {
  const [searchItem, setSearchItem] = useState("hotel");

  const renderLabel = () => {
    switch (searchItem) {
      case "hotel":
        return <div>Hotel</div>;
      case "tour":
        return <div>City / Country</div>;
      case "vehicle":
        return <div>One Way / Round Trip / Airport Transfers</div>;
      default:
        return;
    }
  };

  return (
    <div className="search-wrapper">
      <div className="list-options-search">
        <div className="item hotel" onClick={() => setSearchItem("hotel")}>
          <div className="icon">
            <i
              className="fa-solid fa-hotel"
              style={{ fontSize: "30px", marginRight: "8px" }}
            ></i>
          </div>
          <div className="text">Hotel</div>
        </div>
        <div className="item tour" onClick={() => setSearchItem("tour")}>
          <div className="icon">
            <i
              className="fa-solid fa-plane-departure"
              style={{ fontSize: "30px", marginRight: "8px" }}
            ></i>
          </div>
          <div className="text">Tour</div>
        </div>
        <div className="item car" onClick={() => setSearchItem("vehicle")}>
          <div className="icon">
            <i
              className="fa-solid fa-car"
              style={{ fontSize: "30px", marginRight: "8px" }}
            ></i>
          </div>
          <div className="text">Vehicle</div>
        </div>
      </div>
      <div className="search-input">
        <div className="input-wrapper">
          <div className={`arrow-top ${searchItem}`}></div>
          <div className="label">{renderLabel()}</div>

          <div className="search-btn d-flex">
            <Input placeholder="where are you going?" />
            <Button
              startIcon={<GridSearchIcon />}
              variant="contained"
              color="#0088FF"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Search;
