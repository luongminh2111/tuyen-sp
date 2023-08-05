import React, { useState, useRef, useEffect } from "react";
import { Box, Button } from "@mui/material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "./button.scss";

function ButtonDropDown(props) {
  const { options, onChangeOption, curOption } = props;
  const [show, setShow] = useState(false);

  const [optionSelect, setOptionSelect] = useState(curOption || {});

  const buttonRef = useRef();

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    if(onChangeOption){
      onChangeOption(optionSelect);
    }
  }, []);

  const handleSelect = (value) => {
    onChangeOption(value);
    setOptionSelect(value);
    setShow(false);
  }

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
        {curOption?.value || optionSelect?.value || ''}
       </Button>
      {show ? (
        <Box className="list-options">
          {options?.map((option, index) => {
            return (
              <Box key={index} className="item" onClick={() => handleSelect(option)}>
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
