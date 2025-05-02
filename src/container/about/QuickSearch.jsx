import Image from "next/image";
import React from "react";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import persona_engg from "../../../public/assets/images/RealSales-user-images/persona-engg.png";
import persona_plant from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import persona_plant_new from "../../../public/assets/images/RealSales-user-images/persona-plant-new.png";
import persona_food from "../../../public/assets/images/RealSales-user-images/persona-food.png";
import persona_food_mgmt from "../../../public/assets/images/RealSales-user-images/persona-food-mgmt.png";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CommonButton from "../../common/commonButton";
import { useRouter } from "next/router";

const QuickSearch = () => {
  const router = useRouter();

  return (
    <div className="relative">
      <div className="w-full h-full bg_image">
        <div className="bg-[#06060666]">
          <div className="page-container mx-auto px-4 py-16 container flex flex-col items-center gap-6">
            <div className="lg:w-[70%] w-full flex flex-col gap-4 items-center">
              <h1 className="lg:text-[50px] text-[25px] text-center m-plus-rounded-1c-light text-white">
                Quick Search Feature&nbsp;
                <span className="m-plus-rounded-1c-regular text-[#FFDE5A]">
                  for Persona
                </span>
              </h1>
              <p className="text-[14px] text-center sora-light text-white pb-2 lg:w-[80%] w-full">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
              <div className="bg-[#FFFFFF66] p-2 pl-2 rounded-full flex justify-between items-center lg:w-[80%] w-full">
                <input
                  placeholder="Search personas by their name, id, score etc.."
                  className="border-0 outline-0 !py-1.5 !px-4 w-full text-white m-plus-rounded-1c-regular"
                />
                <div className="flex items-center gap-2 !text-[#060606] !bg-[#FFE942] m-plus-rounded-1c-medium !capitalize !py-1.5 !px-4 !rounded-full cursor-pointer">
                  Proceed&nbsp;Now <ArrowRight width={19} height={13} />
                </div>
              </div>
            </div>
            <CommonButton
              className={`!border-[2px] !border-[#ffffff00] !text-[#ffffff] !px-5 !py-1 lg:!text-[16px] !text-[12px] !capitalize flex !items-center gap-2 h-fit`}
              onClick={()=> router.push(`#custom`)}

              buttontext={"Or you can also Use Custom Filters"}
              icon={<KeyboardDoubleArrowRightIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
