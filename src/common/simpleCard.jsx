import React from "react";

const SimpleCard = ({ children, className }) => {
  return <div className={`${className} bg-[#DDDDDD66] p-4`}>{children}</div>;
};

export default SimpleCard;
