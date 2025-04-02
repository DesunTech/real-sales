import React, { useState } from "react";
import Highlighter from "../../common/highlighter";
import Image from "next/image";
import testi_bg_abstract from "../../../public/assets/images/RealSales-abstracts/testi-bg-abstract.png";
import { Rating, Tab, Tabs, tabsClasses } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import invertedComa from "../../../public/assets/icons/invertedComa.svg";
import user_3 from "../../../public/assets/images/RealSales-user-images/user-3.png";
import persona_plant_new from "../../../public/assets/images/RealSales-user-images/persona-plant-new.png";
import persona_extra from "../../../public/assets/images/RealSales-user-images/persona-extra.png";
import persona_food_new from "../../../public/assets/images/RealSales-user-images/persona-food-new.png";
import user_2 from "../../../public/assets/images/RealSales-user-images/user-2.png";
import persona_plant from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import { ChevronLeft } from "@mui/icons-material";
import { ChevronRight } from "@mui/icons-material";

const UserReviews = () => {
  const [value, setValue] = useState(0);

  const handleClickFocous = (fValue) => {
    setValue(fValue);
  };

  const eviewsArr = [
    {
      image: user_3,
      name: "User 1",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      rating: 5,
    },
    {
      image: persona_plant_new,
      name: "User 2",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      rating: 4.5,
    },
    {
      image: persona_extra,
      name: "User 3",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      rating: 5,
    },
    {
      image: persona_food_new,
      name: "User 4",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      rating: 4.5,
    },
    {
      image: user_2,
      name: "User 5",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      rating: 5,
    },
    {
      image: persona_plant,
      name: "User 6",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      rating: 4.5,
    },
  ];

  return (
    <div className="page-container mx-auto container px-4 py-8 flex flex-col gap-4 items-center">
      <Highlighter highlight={"User Reviews"} />
      <p className="text-[30px] text-[#060606E5] m-plus-rounded-1c-regular text-center">
        User Reviews & Ratings
      </p>
      <h1 className="lg:text-7xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular">
        Our Testimonials
      </h1>
      <div className="absolute lg:right-[30%] mt-[10%]">
        <Image
          src={testi_bg_abstract}
          alt="testi_bg_abstract"
          className="opacity-[10%] lg:w-[450px] w-full h-auto"
        />
      </div>
      <div className="w-full h-full z-10 lg:flex-row flex-col flex items-center justify-between lg:gap-4 gap-8">
        {eviewsArr
          .filter((v, i) => i === value)
          .map((val, idx) => (
            <div
              key={idx}
              className="rounded-[20px] bg-white shadow-[10px_10px_30px_0px_#0000004D] p-8 lg:w-[45%] w-full h-fit"
            >
              <div className="flex lg:items-start items-center flex-col gap-2">
                <div className="flex lg:flex-row flex-col items-center gap-2">
                  <Highlighter
                    highlight={"Reviews"}
                    className={`!rounded-full`}
                  />
                  <div className="lg:flex hidden items-center gap-2">
                    <hr className="w-12 border border-[#060606]" />
                    <div className="h-3 w-3 bg-[#060606] rotate-45"></div>
                  </div>
                  <Rating
                    name="text-feedback"
                    value={val?.rating || 5}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="medium" />
                    }
                  />
                </div>
                <h1 className="m-plus-rounded-1c-light text-[#060606] text-[20px]">
                  Valuable Reviews:
                  <br />
                  of our&nbsp;
                  <span className="m-plus-rounded-1c-regular text-[25px]">
                    {val?.name}
                  </span>
                </h1>
                <div className="flex items-start gap-4 lg:mt-5 mt-0">
                  <Image
                    src={invertedComa}
                    alt="invertedComa"
                    className="-mt-5 w-16 h-16 lg:flex hidden"
                  />
                  <p className="m-plus-rounded-1c-regular text-[#060606] text-[15px]">
                    {val?.review}
                  </p>
                </div>
              </div>
            </div>
          ))}
        <div className="lg:w-1/2 w-full">
          <Tabs
            className="items-center"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="custom arrows tabs"
            sx={{
                "& .MuiTabs-scrollButtons": {
                  color: "white", // Arrow icon color
                  backgroundColor: "#ffffff", // Background color
                  zIndex: 10,
                  margin: "0",
                  width: 0,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                  },
                  "&.Mui-disabled": {
                    opacity: 0.3,
                  },
                },
               
              }}
            slots={{
              StartScrollButtonIcon: () => (
                <div className="bg-white w-12 h-10 z-10 flex items-center justify-center absolute left-[10px]"><ArrowRight stroke="#060606" width={19} height={13} className={`rotate-180`}/></div>
              ),
              EndScrollButtonIcon: () => (
                <div className="bg-white w-12 h-10 z-10 flex items-center justify-center absolute right-[10px]"><ArrowRight stroke="#060606" width={19} height={13} /></div>
              ),
            }}
          >
            {eviewsArr.map((val, idx) => (
              <Tab
                key={idx}
                className="!py-0 !px-1"
                onClick={() => handleClickFocous(idx)}
                label={
                  <div
                    className={`rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 w-[120px] 
                        ${
                          idx === value
                            ? `h-[520px] border-4 border-solid border-[#FFDE5A] !shadow-[0px_5px_20px_0px_#00000040]`
                            : `h-[480px]`
                        }`}
                  >
                    <Image
                      src={val?.image}
                      alt={`user_${idx}`}
                      className={`w-full h-full object-cover`}
                    />
                  </div>
                }
              />
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
