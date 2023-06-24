import { Radio } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../styles/FilterData/FilterSale.scss";
import React from "react";
import { useState } from "react";
import { useMemo } from "react";

function FilterSale(props) {

  const {sales} = props;

  const [saleSelect, setSaleSelect] = useState(0);

  const handleSelectRadio = (e) => {
    setSaleSelect(e.target.value);
  };

  const saleArr = useMemo(() => {
    const saleModel = sales?.filter(e => e > 0)?.map((item, index) => {
      return {
        value: item, 
        id: index
      }
    } )
    return saleModel;
  }, [sales]);

  console.log("check saleArr : ", saleArr);

  console.log("check saleSelect :", saleSelect);

  return (
    <div className={`sale-wrapper`}>
      <div className="title">Hot Sale</div>
      <div className="sale-list">
        {saleArr?.map((e, index) => {
          return (
            <div className={`sale-item`} key={index}>
              <FormControlLabel
                value={e.value}
                control={
                  <Radio
                    checked={e.value === Number(saleSelect)}
                    onChange={(e) => handleSelectRadio(e)}
                  />
                }
                label={`${e.value}$`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default FilterSale;
