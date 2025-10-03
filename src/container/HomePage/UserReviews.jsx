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
<div className="home-bg min-h-[80vh] flex items-center relative">
  <div className="page-container mx-auto container px-4 py-16 flex flex-col gap-8 items-center w-full">
    <div className="w-full h-full z-10 flex justify-center relative">
      {/* Left Arrow */}
     <button
  onClick={() =>
    setValue((prev) =>
      prev === 0 ? eviewsArr.length - 1 : prev - 1
    )
  }
  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#FFDE5A] shadow-md p-3 rounded-full hover:bg-yellow-400 transition z-20 flex items-center justify-center"
>
  <ArrowRight className="rotate-180" stroke="#060606" width={20} height={20} />
</button>


      {/* Review Card */}
      {eviewsArr
        .filter((v, i) => i === value)
        .map((val, idx) => (
          <div
            key={idx}
            className="rounded-[20px] bg-white shadow-[10px_10px_30px_0px_#0000004D] p-8 lg:w-[50%] w-full h-fit flex flex-col items-center gap-4"
          >
            <div className="flex lg:flex-row flex-col items-center gap-2">
              <Highlighter highlight={"Reviews"} className={`!rounded-full`} />
              <div className="lg:flex hidden items-center gap-2">
                <hr className="w-12 border border-[#060606]" />
                <div className="h-3 w-3 bg-[#060606] rotate-45"></div>
              </div>
              <Rating
                name="text-feedback"
                value={val?.rating || 5}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="medium" />}
              />
            </div>
            <h1 className="m-plus-rounded-1c-light text-[#060606] text-[20px] text-center">
              Valuable Reviews:
              <br />
              of our&nbsp;
              <span className="m-plus-rounded-1c-regular text-[25px]">{val?.name}</span>
            </h1>
            <div className="flex items-start gap-4 lg:mt-5 mt-0">
              <Image
                src={invertedComa}
                alt="invertedComa"
                className="-mt-5 w-16 h-16 lg:flex hidden"
              />
              <p className="m-plus-rounded-1c-regular text-[#060606] text-[15px]">{val?.review}</p>
            </div>
          </div>
        ))}

      {/* Right Arrow */}
    <button
  onClick={() =>
    setValue((prev) =>
      prev === eviewsArr.length - 1 ? 0 : prev + 1
    )
  }
  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#FFDE5A] shadow-md p-3 rounded-full hover:bg-yellow-400 transition z-20 flex items-center justify-center"
>
  <ArrowRight stroke="#060606" width={20} height={20} />
</button>

    </div>
  </div>
</div>





  );
};

export default UserReviews;
