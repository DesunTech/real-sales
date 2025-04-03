import React from "react";
import BookAdemo from "./bookAdemo";
import Image from "next/image";

const InteractionCard = (props) => {
  return (
    <div className="bg-[url(../../public/assets/images/aboutus/PersonaCardImg.png)] shadow-md bg-cover bg-center bg-no-repeat  w-full">
      <div className="relative bg-gradient-to-r from-white/50 to-white/0 py-4 px-8 w-full flex items-center justify-between flex-col">
        <div className="flex flex-row items-start justify-between gap-2">
          <div className="lg:w-28 w-20 lg:h-28 h-20 rounded-full overflow-hidden bg-gray-100">
            <Image
              src={props?.image}
              alt={props?.title || "InteractionCardImage"}
            />
          </div>
          <div className="w-[70%]">
            <h1 className="lg:text-[18px] text-[14px] m-plus-rounded-1c-regular text-[#060606]">
              {props?.title}
            </h1>
            <p className="lg:text-[14px] text-[12px] m-plus-rounded-1c-regular text-[#060606CC]">
              {props?.description}
            </p>
          </div>
        </div>
        <BookAdemo
          BookaDemo={"CHOOSE IT"}
          className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit uppercase absolute -bottom-4 left-[30%]`}
        />
      </div>
    </div>
  );
};

export default InteractionCard;
