import { Button } from "@mui/material";
import React from "react";

const CommonButton = (props) => {
  return (
    <Button
      className={`m-plus-rounded-1c-regular ${
        props?.disabled ? "opacity-60" : ""
      } ${props?.className}`}
      onClick={props?.onClick}
      variant={props?.variant || "outlined"}
      disabled={props?.disabled}
    >
      {props?.buttontext || ""}
      {props?.icon}
    </Button>
  );
};

export default CommonButton;
