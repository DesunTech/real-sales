import Image from "next/image";
import React from "react";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import persona_engg from "../../../public/assets/images/RealSales-user-images/persona-engg.png";
import persona_plant from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import persona_plant_new from "../../../public/assets/images/RealSales-user-images/persona-plant-new.png";
import persona_food from "../../../public/assets/images/RealSales-user-images/persona-food.png";
import persona_food_mgmt from "../../../public/assets/images/RealSales-user-images/persona-food-mgmt.png";
import CommonButton from "../../common/commonButton";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useRouter } from "next/router";

const QuickSearch = () => {

  const router = useRouter();

  return (
    <div className="relative">
      <div className="w-full h-full bg_image">
        <div className="bg-[#06060666]">
          <div className="page-container mx-auto px-4 py-8 container flex flex-col items-center gap-6">
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

            <div className="flex items-center justify-center flex-wrap lg:flex-nowrap lg:gap-0 gap-2">
              <div className="relative lg:h-[290px] lg:hover:h-[290px] h-[200px] hover:h-[210px] w-[200px] hover:w-[210px] duration-300 cursor-pointer lg:perspective-[200px] rounded-[20px]">
                <Image
                  src={persona_engg}
                  alt="persona-plant-new"
                  className="absolute lg:left-[12%] left-0 w-full h-full rounded-[20px] bg-[rgba(100,100,100,0.5)] transform-gpu rotate-y-[10deg]"
                />
                <div className="absolute lg:left-[12%] left-0 bottom-0 flex flex-col items-start justify-end gap-2 p-4 w-full h-3/4 rounded-b-[20px] bg-[linear-gradient(16.26deg,#000000_18.18%,rgba(0,0,0,0)_81.35%)] transform-gpu rotate-y-[10deg]">
                  <h1 className="text-[#FFDE5A] m-plus-rounded-1c-regular text-[20px]">
                    Project Engineer
                  </h1>
                  <div className="border-l-2 border-solid border-[#FFDE5A80] bg-gradient-to-r from-[#FFDE5A00] to-[#FFDE5A26] px-2 py-1">
                    <p className="sora-regular text-white text-[14px]">
                      State:&nbsp;
                      <span className="sora-thin text-[12px]">
                        Florida, USA
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="z-10 relative lg:h-[250px] lg:hover:h-[260px] h-[200px] hover:h-[210px] w-[200px] hover:w-[210px] duration-300 cursor-pointer lg:perspective-[200px] rounded-[20px]">
                <Image
                  src={persona_plant_new}
                  alt="persona-plant-new"
                  className="absolute lg:left-[8%] left-0 w-full h-full rounded-[20px] bg-[rgba(100,100,100,0.5)] transform-gpu rotate-y-[10deg]"
                />
                <div className="absolute lg:left-[8%] left-0 bottom-0 flex flex-col items-start justify-end gap-2 p-4 w-full h-3/4 rounded-b-[20px] bg-[linear-gradient(16.26deg,#000000_18.18%,rgba(0,0,0,0)_81.35%)] transform-gpu rotate-y-[10deg]">
                  <h1 className="text-[#FFDE5A] m-plus-rounded-1c-regular text-[20px]">
                    Plant Manager
                  </h1>
                  <div className="border-l-2 border-solid border-[#FFDE5A80] bg-gradient-to-r from-[#FFDE5A00] to-[#FFDE5A26] px-2 py-1">
                    <p className="sora-regular text-white text-[14px]">
                      State:&nbsp;
                      <span className="sora-thin text-[12px]">
                        Pennsylvania, USA
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative lg:h-[230px] lg:hover:h-[240px] h-[200px] hover:h-[210px] lg:w-[220px] lg:hover:w-[230px] w-[200px] hover:w-[210px] duration-300 cursor-pointer lg:perspective-[200px] rounded-[20px]">
                <Image
                  src={persona_plant}
                  alt="persona-plant-new"
                  className="absolute w-full h-full rounded-[20px] bg-[rgba(100,100,100,0.5)] transform-gpu rotate-y-[0deg]"
                />
                <div className="absolute bottom-0 flex flex-col items-start justify-end gap-2 p-4 w-full h-3/4 rounded-b-[20px] bg-[linear-gradient(16.26deg,#000000_18.18%,rgba(0,0,0,0)_81.35%)] transform-gpu rotate-y-[0deg]">
                  <h1 className="text-[#FFDE5A] m-plus-rounded-1c-regular text-[20px]">
                    Operations Manager
                  </h1>
                  <div className="border-l-2 border-solid border-[#FFDE5A80] bg-gradient-to-r from-[#FFDE5A00] to-[#FFDE5A26] px-2 py-1">
                    <p className="sora-regular text-white text-[14px]">
                      State:&nbsp;
                      <span className="sora-thin text-[12px]">Nevada, USA</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="z-10 relative lg:h-[250px] lg:hover:h-[260px] h-[200px] hover:h-[210px] w-[200px] hover:w-[210px] duration-300 cursor-pointer lg:perspective-[200px] rounded-[20px]">
                <Image
                  src={persona_food}
                  alt="persona-plant-new"
                  className="absolute lg:right-[8%] right-0 w-full h-full rounded-[20px] bg-[rgba(100,100,100,0.5)] transform-gpu -rotate-y-[10deg]"
                />
                <div className="absolute lg:right-[8%] right-0 bottom-0 flex flex-col items-start justify-end gap-2 p-4 w-full h-3/4 rounded-b-[20px] bg-[linear-gradient(16.26deg,#000000_18.18%,rgba(0,0,0,0)_81.35%)] transform-gpu -rotate-y-[10deg]">
                  <h1 className="text-[#FFDE5A] m-plus-rounded-1c-regular text-[20px]">
                    Food Specialist
                  </h1>
                  <div className="border-l-2 border-solid border-[#FFDE5A80] bg-gradient-to-r from-[#FFDE5A00] to-[#FFDE5A26] px-2 py-1">
                    <p className="sora-regular text-white text-[14px]">
                      State:&nbsp;
                      <span className="sora-thin text-[12px]">
                        Ottawa, Canada
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative lg:h-[290px] lg:hover:h-[290px] h-[200px] hover:h-[210px] w-[200px] hover:w-[210px] duration-300 cursor-pointer lg:perspective-[200px] rounded-[20px]">
                <Image
                  src={persona_food_mgmt}
                  alt="persona-plant-new"
                  className="absolute lg:right-[12%] right-0 w-full h-full rounded-[20px] bg-[rgba(100,100,100,0.5)] transform-gpu -rotate-y-[10deg]"
                />
                <div className="absolute lg:right-[12%] right-0 bottom-0 flex flex-col items-start justify-end gap-2 p-4 w-full h-3/4 rounded-b-[20px] bg-[linear-gradient(16.26deg,#000000_18.18%,rgba(0,0,0,0)_81.35%)] transform-gpu -rotate-y-[10deg]">
                  <h1 className="text-[#FFDE5A] m-plus-rounded-1c-regular text-[20px]">
                    Supervisor
                  </h1>
                  <div className="border-l-2 border-solid border-[#FFDE5A80] bg-gradient-to-r from-[#FFDE5A00] to-[#FFDE5A26] px-2 py-1">
                    <p className="sora-regular text-white text-[14px]">
                      State:&nbsp;
                      <span className="sora-thin text-[12px]">
                        Cancún, Mexico
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CommonButton
              className={`!border-[2px] !border-[#ffffff00] !text-[#ffffff] !px-5 !py-1 lg:!text-[16px] !text-[12px] !capitalize flex !items-center gap-2 h-fit`}
              onClick={()=> router.push(`/about#custom`)}
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
