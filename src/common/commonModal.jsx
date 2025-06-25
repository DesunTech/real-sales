import { Box, Modal, useMediaQuery } from "@mui/material";
import React from "react";
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
  p: { xs: 1, sm: 2 },
  borderRadius: "10px",
};

const CommonModal = (props) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const modalWidth = isMobile ? '90vw' : (props?.width || 400);

  return (
    <Modal data-aos="fade-down" open={props?.open} onClose={props?.onClose} className="outline-none">
      <Box
        sx={{
          ...style,
          width: modalWidth,
          maxWidth: '95vw',
          minWidth: isMobile ? 'unset' : 320,
        }}
      >
        <div
          onClick={props?.onClose}
          className="z-10 cursor-pointer bg-red-500 rounded-full h-6 w-6 flex items-center justify-center absolute -top-3 -right-3"
          style={isMobile ? { top: 8, right: 8, position: 'absolute' } : {}}
        >
          <CloseOutlinedIcon className="!text-[16px] text-white" />
        </div>
        <div className="overflow-y-auto overflow-x-hidden h-full max-h-[80vh] px-2">
          {props?.children}
        </div>
      </Box>
    </Modal>
  );
};

export default CommonModal;
