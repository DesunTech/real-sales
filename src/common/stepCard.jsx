import React from "react";
import Highlighter from "./highlighter";

const StepCard = (props) => {
  return (
    <div
      data-aos="zoom-in"
      className={`${
        props?.width ? `w-[${props?.width}]` : `w-[33.33%]`
      } h-full flex flex-col gap-4`}
    >
      {/* Step Label */}
      <Highlighter highlight={`Step ${props?.steps}`} />

      {/* Heading */}
      <h1 className="text-[26px] font-semibold text-[#060606E5] m-plus-rounded-1c-regular whitespace-nowrap">
        {props?.heading}
        {props?.title && (
          <span className="block text-[20px] text-[#333] mt-1">
            {props?.title}
          </span>
        )}
      </h1>

      {/* Description */}
      <p className="text-[16px] leading-relaxed shadow-[0px_5px_12px_0px_#0000001A] p-6 rounded-[10px] border border-solid border-[#CCCCCC] bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_10%,rgba(227,227,227,0.9)_90%)] h-[250px] flex items-start">
        {props?.description}
      </p>
    </div>
  );
};

export default StepCard;
