"use client";

import React, { useState, useEffect } from "react";
import Highlighter from "../../common/highlighter";
import Image from "next/image";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import invertedComa from "../../../public/assets/icons/invertedComa.svg";
import user_3 from "../../../public/assets/images/RealSales-user-images/user-3.png";
import persona_plant_new from "../../../public/assets/images/RealSales-user-images/persona-plant-new.png";
import persona_extra from "../../../public/assets/images/RealSales-user-images/persona-extra.png";
import persona_food_new from "../../../public/assets/images/RealSales-user-images/persona-food-new.png";
import user_2 from "../../../public/assets/images/RealSales-user-images/user-2.png";
import persona_plant from "../../../public/assets/images/RealSales-user-images/persona-plant.png";

const UserReviews = () => {
  const [value, setValue] = useState(0);

  const reviewsArr = [
    {
      image: user_3,
      name: "User 1",
      review:
        "As sales manager at a B2C company,  using RealSales I was finally able to identify and address my team gaps. In our case CRM alone was not enough to explain the difference in performance among our sales reps. Ultimately we have been improving our conversion rate.",
      rating: 5,
    }
    // {
    //   image: persona_plant_new,
    //   name: "User 2",
    //   review:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, and more recently with desktop publishing software like Aldus PageMaker.",
    //   rating: 4.5,
    // },
    // {
    //   image: persona_extra,
    //   name: "User 3",
    //   review:
    //     "Lorem Ipsum is simply dummy text that has been the industry’s standard since the 1500s. It was popularized with the release of Letraset sheets containing Lorem Ipsum passages.",
    //   rating: 5,
    // },
    // {
    //   image: persona_food_new,
    //   name: "User 4",
    //   review:
    //     "Lorem Ipsum is simply dummy text used in the printing industry. It has been used for centuries and is still widely used as placeholder text today.",
    //   rating: 4.5,
    // },
    // {
    //   image: user_2,
    //   name: "User 5",
    //   review:
    //     "Lorem Ipsum is standard dummy text that has stood the test of time. It was originally taken from classical Latin literature from 45 BC.",
    //   rating: 5,
    // },
    // {
    //   image: persona_plant,
    //   name: "User 6",
    //   review:
    //     "Lorem Ipsum continues to be the industry standard for dummy text, used by designers, typesetters, and developers alike.",
    //   rating: 4.5,
    // },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev === reviewsArr.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [reviewsArr.length]);

  return (
    <div className="home-bg py-16 w-full">
      <div className="page-container mx-auto container px-4 flex flex-col gap-8 items-center w-full">
        {/* Desktop layout */}
        <div className="hidden sm:flex w-full min-h-[70vh] relative items-center justify-center">
          <div className="w-full h-full flex items-center justify-center relative">
            {reviewsArr.map((val, idx) => (
              <div
                key={idx}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white shadow-[10px_10px_30px_0px_#0000004D] p-10 lg:w-[60%] md:w-[70%] sm:w-[80%] flex flex-col items-center gap-6 text-center transition-opacity duration-700 ease-in-out ${
                  idx === value ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Highlighter highlight="Reviews" className="!rounded-full" />
                  <Rating
                    name="text-feedback"
                    value={val?.rating || 5}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="medium" />}
                  />
                </div>
                <div className="flex items-start justify-center gap-4 mt-3 text-left w-full">
                  <Image
                    src={invertedComa}
                    alt="invertedComa"
                    className="w-10 h-10 sm:w-16 sm:h-16 -mt-2 hidden sm:block shrink-0"
                  />
                  <p className="m-plus-rounded-1c-regular text-[#060606] text-[15px] leading-relaxed w-full">
                    {val?.review}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Left/Right Arrows */}
          <button
            onClick={() => setValue((prev) => (prev === 0 ? reviewsArr.length - 1 : prev - 1))}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#FFDE5A] shadow-md p-3 rounded-full hover:bg-yellow-400 transition z-20 flex items-center justify-center"
          >
            <ArrowRight className="rotate-180" stroke="#060606" width={20} height={20} />
          </button>
          <button
            onClick={() => setValue((prev) => (prev === reviewsArr.length - 1 ? 0 : prev + 1))}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#FFDE5A] shadow-md p-3 rounded-full hover:bg-yellow-400 transition z-20 flex items-center justify-center"
          >
            <ArrowRight stroke="#060606" width={20} height={20} />
          </button>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col items-center sm:hidden w-full gap-6">
          {reviewsArr.map((val, idx) => (
            <div
              key={idx}
              className={`rounded-[20px] bg-white shadow-[6px_6px_20px_0px_#0000002D] p-6 w-full flex flex-col items-center gap-3 text-center transition-opacity duration-700 ease-in-out ${
                idx === value ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <Highlighter highlight="Reviews" className="!rounded-full" />
                <Rating
                  name="text-feedback"
                  value={val?.rating || 5}
                  readOnly
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="small" />}
                />
              </div>
              <h1 className="m-plus-rounded-1c-light text-[#060606] text-[18px]">
                Valuable Reviews of our{" "}
                <span className="m-plus-rounded-1c-regular text-[20px]">{val?.name}</span>
              </h1>
              <p className="m-plus-rounded-1c-regular text-[#060606] text-[14px] leading-relaxed mt-2 text-left w-full">
                {val?.review}
              </p>
            </div>
          ))}

          {/* Arrows below for mobile */}
          <div className="flex items-center justify-center gap-6 mt-2">
            <button
              onClick={() => setValue((prev) => (prev === 0 ? reviewsArr.length - 1 : prev - 1))}
              className="bg-[#FFDE5A] shadow-md p-3 rounded-full hover:bg-yellow-400 transition"
            >
              <ArrowRight className="rotate-180" stroke="#060606" width={18} height={18} />
            </button>
            <button
              onClick={() => setValue((prev) => (prev === reviewsArr.length - 1 ? 0 : prev + 1))}
              className="bg-[#FFDE5A] shadow-md p-3 rounded-full hover:bg-yellow-400 transition"
            >
              <ArrowRight stroke="#060606" width={18} height={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
