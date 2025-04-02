import React from "react";
import Highlighter from "./highlighter";

const StepCard = (props) => {
  return (
    <div className={`${props?.width ? `w-[${props?.width}]` : `w-[33.33%]`} h-full`}>
      <Highlighter
        highlight={`Step ${props?.steps}`}
      />
      <h1 className="text-[22px] text-[#060606E5] m-plus-rounded-1c-regular">
        {props?.heading}
        <br />
        <span className="text-[120%]">{props?.title}</span>
      </h1>
      <p className="h-auto text-[12px] shadow-[0px_5px_10px_0px_#0000001A] p-4 rounded-[5px] border border-solid border-[#CCCCCC] bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_18.18%,rgba(227,227,227,0.85)_50%)]">
        {props?.description}
      </p>
    </div>
  );
};

export default StepCard;
