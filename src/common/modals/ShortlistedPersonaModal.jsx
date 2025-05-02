import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../commonModal";
import Image from "next/image";
import CommonButton from "../commonButton";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import persona_plant from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import persona_food_old from "../../../public/assets/images/RealSales-user-images/persona-food.png";
import persona_plant_new from "../../../public/assets/images/RealSales-user-images/persona-plant-new.png";
import persona_engg from "../../../public/assets/images/RealSales-user-images/persona-engg.png";
import { ShortlistedPersonaValue } from "../../redux/OpenModal";

const ShortlistedPersonaModal = ({ onNext }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.openModal.shortlistedPersonaValue);
  const [shortedPersona, setShortedPersona] = useState("");

  const shortlistedPersonaArr = [
    {
      image: persona_plant,
      title: "Operations Manager",
      state: "Nevada, USA",
    },
    {
      image: persona_food_old,
      title: "Food Specialist",
      state: "Quebec, Canada",
    },
    {
      image: persona_plant_new,
      title: "Plant Manager",
      state: "Oaxaca, Mexico",
    },
    {
      image: persona_engg,
      title: "Project Engineer",
      state: "Arizona, USA",
    },
  ];

  const onSetShortedPersona = (type) => {
    {
      if (shortedPersona !== type) {
        setShortedPersona(type);
      } else {
        setShortedPersona("");
      }
    }
  };

  return (
    <CommonModal
      open={open}
      onClose={() => dispatch(ShortlistedPersonaValue(false))}
      width={"52%"}
    >
      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-col items-start">
          <h2 className="lg:text-[22px] text-[16px] m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-start">
            Your Shortlisted Personas
          </h2>
          <p className="lg:text-[30px] text-[16px] m-plus-rounded-1c-regular text-[#060606E5]">
            (Choose any one):
          </p>
        </div>
        <div className="w-full flex items-center justify-center flex-col py-4">
          <div className="w-full flex lg:flex-row flex-col lg:flex-wrap flex-nowrap lg:items-start items-center justify-between gap-5">
            {shortlistedPersonaArr?.length
              ? shortlistedPersonaArr.map((v, i) => (
                  <div
                    key={i}
                    className={`relative lg:w-[48%] md:w-[70%] w-full h-[270px] rounded-[20px] overflow-hidden cursor-pointer ${
                      shortedPersona === v?.title
                        ? `shadow-md`
                        : `hover:shadow-md`
                    } shadow-[#ffe942] duration-300`}
                    onClick={() => onSetShortedPersona(v?.title)}
                  >
                    <Image
                      src={v?.image}
                      alt={v?.title}
                      className="w-full h-full"
                    />
                    <div className="absolute top-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/60 to-black/0 w-full h-full p-4">
                      <div className="cursor-pointer bg-[#FFFFFF33] w-fit h-fit p-2 rounded-full">
                        <div className="h-5 w-5 rounded-full border-2 border-solid border-[#FFFFFF] flex items-center justify-center">
                          {shortedPersona === v?.title ? (
                            <div className="h-3 w-3 rounded-full bg-[#FFFFFF]" />
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <h1 className="m-plus-rounded-1c-regular lg:text-2xl text-xl text-[#FFDE5A]">
                          {v?.title}
                        </h1>
                        <div className="border-l-4 border-solid border-[#FFDE5A80] bg-gradient-to-r from-[#FFDE5A00] to-[#FFDE5A26] px-3 py-1">
                          <p className="sora-regular text-white lg:text-[16px] text-[12px]">
                            State:&nbsp;
                            <span className="sora-thin">{v?.state}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <CommonButton
            className={`!mt-8 !border-[2px] !border-[#060606] !text-[#060606] !font-[500] !px-6 !py-1] !text-[16px] !capitalize flex !items-center gap-2 w-fit h-fit`}
            icon={<ArrowRight stroke={`#060606`} width={19} height={13} />}
            disabled={shortedPersona === "" ? true : false}
            onClick={shortedPersona === "" ? undefined : onNext}
            buttontext={"Save & Proceed"}
          />
        </div>
      </div>
    </CommonModal>
  );
};

export default ShortlistedPersonaModal;
