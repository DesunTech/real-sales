import React from "react";
import Highlighter from "./highlighter";

const StepCard = (props) => {
  return (
    <div className={`${props?.width ? `w-[${props?.width}]` : `w-[33.33%]`}`}>
      <Highlighter
        // className={`absolute top-5 !z-10 !px-3 !py-1.5`}
        highlight={`Step 1`}
      />
      <h1 className="text-[22px] text-[#060606E5] m-plus-rounded-1c-regular">
        Select an AI
        <br />
        <span className="text-[120%]">Buyer Personas</span>
      </h1>
      <p className="text-[12px] shadow-[0px_5px_10px_0px_#0000001A] p-4 rounded-[5px] border border-solid border-[#CCCCCC] bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_18.18%,rgba(227,227,227,0.85)_50%)]">
        Choose from a variety of customizable Al buyer personas that represent
        your target customers, each with unique needs, pain points, and
        decision- making processes.
      </p>
    </div>
  );
};

export default StepCard;
