import { Box, Button } from "@mui/material";
import React from "react";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useState } from "react";
import "./button.scss";
import { useRef } from "react";
import { useEffect } from "react";

function ButtonDropDown(props) {
  const { options } = props;
  console.log("Check options :", options);
  const [show, setShow] = useState(false);

  const [optionSelect, setOptionSelect] = useState(options?.[0]);

  const buttonRef = useRef();

  const handleShow = () => {
    setShow(!show);
  };

  const useOutsideAccount = (buttonRef) => {
    useEffect(() => {
    
      function handleClickOutside(event) {
        if (
          buttonRef.current &&
          !buttonRef.current.contains(event.target)
        ) {
          setShow(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [buttonRef]);
  };

  useOutsideAccount(buttonRef);

  return (
    <Box className="button-dropdown-wrapper" ref={buttonRef}>
      <Button endIcon={<ArrowDropDownOutlinedIcon />}
       onClick={() => handleShow()}>
        {optionSelect?.value || ''}
       </Button>
      {show ? (
        <Box className="list-options">
          {options?.map((option, index) => {
            return (
              <Box key={index} className="item" onClick={() => {setOptionSelect(option); setShow(false) }}>
                {option?.value}
              </Box>
            );
          })}
        </Box>
      ) : null}
    </Box>
  );
}
ButtonDropDown.defaultProps = {
  options: [],
};
export default ButtonDropDown;
