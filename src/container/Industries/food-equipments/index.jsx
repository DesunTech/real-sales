import React from "react";
import Image from "next/image";

const FoodEquipments = () => {
  return (
    <div className="page-container mx-auto px-4 py-8 container flex flex-col gap-16 w-full h-full">
      {/* Heading */}
      <div className="w-full flex flex-col items-center justify-center text-center sm:py-4 py-8">
        <h1 className="sora-bold text-3xl sm:text-4xl max-w-4xl">
          Industry-Specific AI Personas built on Real Customers
        </h1>
        <p className="sora-regular text-gray-600 text-lg mt-6 max-w-5xl leading-relaxed">
          RealSales platform uses AI personas modeled after REAL and carefully selected
          decision-makers from the food and beverage manufacturing
          industry, like Plant Manager, Maintenance Leaders and
          Engineers. This to simulate real industry challenges,
          overcome specific objections and help sales team to shift
          from transactional selling to solution-based selling tailored to
          the needs of your real customers.
        </p>
      </div>

      {/* Cards */}
      <div className="flex items-center justify-center flex-wrap lg:flex-nowrap lg:gap-0 gap-2">
        <div className="relative lg:h-[290px] lg:hover:h-[290px] h-[200px] hover:h-[210px] w-[200px] hover:w-[210px] duration-300 cursor-pointer lg:perspective-[200px] rounded-[20px]">
          <Image
            src="/assets/images/RealSales-user-images/persona-engg.png"
            alt="persona-engg"
            width={200}
            height={290}
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
            src="/images/Manager.jpg"
            alt="persona-plant-new"
            width={200}
            height={250}
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
            src="/images/Engineer.webp"
            alt="persona-plant"
            width={220}
            height={230}
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
            src="/assets/images/RealSales-user-images/persona-food.png"
            alt="persona-food"
            width={200}
            height={250}
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
            src="/assets/images/RealSales-user-images/persona-food-mgmt.png"
            alt="persona-food-mgmt"
            width={200}
            height={290}
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
                  Texas, USA
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodEquipments;
