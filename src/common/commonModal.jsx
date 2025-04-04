import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #00000000",
  boxShadow: 24,
  outline: "none",
  p: 2,
  borderRadius: "10px",
};

const CommonModal = (props) => {
  return (
    <Modal open={props?.open} onClose={props?.onClose} className="outline-none">
      <Box
        sx={{
          ...style,
          width: props?.width || 400,
        }}
      >
        <div onClick={props?.onClose} className="z-10 cursor-pointer bg-red-500 rounded-full h-6 w-6 flex items-center justify-center absolute -top-3 -right-3">
          <CloseOutlinedIcon className="!text-[16px] text-white" />
        </div>
        <div className="overflow-y-auto overflow-x-hidden h-full max-h-[70vh] px-2">
          {props?.children}
        </div>
      </Box>
    </Modal>
  );
};

export default CommonModal;
