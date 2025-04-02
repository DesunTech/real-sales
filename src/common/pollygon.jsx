import Image from "next/image";
import React from "react";
import Highlighter from "./highlighter";

const Pollygon = (props) => {
  return (
    <div key={props?.key} className="flex flex-col items-center justify-center relative">
      <Highlighter
        className={`absolute top-5 !z-10 !px-3 !py-1.5`}
        highlight={`${props?.id}`}
      />
      <div
        className="relative bg-gray-100 w-48 h-48 flex flex-col items-center gap-2 justify-center text-center shadow-[0px_0px_6px_1px_rgba(0,0,0,0.75)]"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        <h2 className="text-[18px] text-[#060606E5] sora-semibold w-[60%]">
          {props?.label}
        </h2>
        <p className="text-[14px] w-[90%] text-[#060606B2] sora-regular mb-10">
          {props?.document}
        </p>

        {/* Icon */}
        <div className="absolute bottom-2.5 border-t-[1px] border-x-[1px] border-[#0606061A] rounded-t-[15px] px-5 p-3.5 flex items-center justify-center">
          <Image src={props?.icon} alt="Icon" className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Pollygon;
