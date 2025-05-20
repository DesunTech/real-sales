import React from "react";
import PersonaCardImg from "../../public/assets/images/aboutus/PersonaCardImg.png";
import BookAdemo from "./bookAdemo";

const PersonaCard = (props) => {
  console.log(props?.type, "props_type");

  return (
    <div className="bg-[url(../../public/assets/images/aboutus/PersonaCardImg.png)] shadow-md bg-cover bg-center bg-no-repeat w-full rounded-[10px]">
      <div
        className={`${props?.type
            ? `bg-gradient-to-r from-blue-200/50 to-white/0`
            : `bg-gradient-to-r from-white/50 to-white/0`
          } py-4 px-8 w-full flex flex-col items-start justify-between gap-4`}
      >
        <div className="flex flex-col items-start">
          <h2 className="lg:text-[12px] text-[10px] sora-regular text-[#060606]">
            Choose:
          </h2>
          <h1 className="lg:text-[18px] text-[14px] m-plus-rounded-1c-regular text-[#060606]">
            Select your Real-AI
          </h1>
          <p className="lg:text-[22px] text-[14px] m-plus-rounded-1c-regular text-[#060606CC]">
            {props?.title}
          </p>
        </div>

        {props?.type ? (
          <p className="lg:text-[22px] text-[14px] m-plus-rounded-1c-medium text-[#060606CC]">
            {props?.type}
          </p>
        ) : (
          <BookAdemo
            onClick={() => { props?.disabled ? null : props?.onClick() }}
            BookaDemo={"SELECT"}
            className={`!border-[#FFDE5A] ${props?.disabled ? "!bg-[#0606064e]" : "!bg-[#060606]"} !text-[#FFDE5A] !px-5 !py-1 h-fit uppercase`}
          />
        )}
      </div>
    </div>
  );
};

export default PersonaCard;
