import React from "react";
import CommonModal from "../commonModal";
import { SessionModesValue } from "../../redux/OpenModal";
import { useDispatch, useSelector } from "react-redux";
import CommonButton from "../commonButton";
import persona_food_old from "../../../public/assets/images/RealSales-user-images/persona-food.png";
import persona_plant from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import Image from "next/image";

const SessionModes = () => {
  const dispatch = useDispatch();

  const sessionModesValue = useSelector(
    (state) => state.openModal.sessionModesValue
  );

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
  ];

  return (
    <>
      <CommonModal
        open={sessionModesValue}
        onClose={() => dispatch(SessionModesValue(false))}
        width={"40%"}
      >
        <div className="flex flex-col gap-4 items-start">
          <div class="flex flex-col items-start">
            <h2 class="lg:text-[22px] text-[16px] m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-start">
              Choose your Dream Session Modes
            </h2>
            <p class="lg:text-[30px] text-[16px] m-plus-rounded-1c-regular text-[#060606E5]">
              (Choose any one):
            </p>
          </div>

          <div className="w-full flex items-center justify-center flex-col py-4">
            <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-5">
              {shortlistedPersonaArr?.length
                ? shortlistedPersonaArr.map((v, i) => (
                    <div
                      key={i}
                      className={`relative lg:w-[48%] md:w-[70%] w-full h-[270px] rounded-[20px] overflow-hidden`}
                    >
                      <Image
                        src={v?.image}
                        alt={v?.title}
                        className="w-full h-full"
                      />
                      <div className="absolute top-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/60 to-black/0 w-full h-full p-4">
                        <div className="cursor-pointer bg-[#FFFFFF33] w-fit h-fit p-2 rounded-full">
                          <div className="h-5 w-5 rounded-full border-2 border-solid border-[#FFFFFF]" />
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
              onClick={() => {
                // router?.push("/pricing");
                // setShortlistedPersona(false);
              }}
              buttontext={"Save & Proceed"}
            />
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default SessionModes;
