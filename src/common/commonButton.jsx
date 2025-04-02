import { Button } from "@mui/material";
import React from "react";

const CommonButton = (props) => {
  return (
      <Button
        className={`m-plus-rounded-1c-regular ${props?.className}`}
        onClick={props?.onClick}
        variant={props?.variant || "outlined"}
      >
        {props?.buttontext || ""}
        {props?.icon}
      </Button>
  );
};

export default CommonButton;
