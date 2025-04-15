import { FormControlLabel, Radio, Rating, Slider, styled } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import selJoye from "../../../../public/assets/icons/selJoye.svg";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import happy from "../../../../public/assets/icons/happy.svg";
import angry from "../../../../public/assets/icons/angry.svg";
import solar_pen_bold from "../../../../public/assets/icons/solar_pen_bold.svg";
import StarIcon from "@mui/icons-material/Star";

const RatingContainer = () => {
  const [rating, setRating] = useState(3.5);

  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

  const PersonalizedPerformance = [
    {
      title: "User pitch was strong, but try to personalize it more.",
    },
    {
      title:
        "User handled objections well, but softer approach might build better.",
    },
    {
      title: "Sometimes user asked great questions! Consider following up.",
    },
  ];

  const SalesStrategy = [
    { title: "User confidence was good, but a slightly slower pace." },
    { title: "My Customer provided solid product knowledge today." },
  ];

  return (
    <div className="w-full flex items-start justify-center gap-8 px-[8%]">
      <div className="w-[70%] flex flex-col gap-4">
        <div className="flex flex-col items-start">
          <h1 className="m-plus-rounded-1c-semilight text-[#FFFFFF] text-[50px] text-center">
            Thank you for your&nbsp;
            <span className="m-plus-rounded-1c-regular text-[#FFDE5A]">
              Time&nbsp;!
            </span>
          </h1>
          <p className="text-center text-white lg:text-[15px] text-[13px] sora-regular w-[75%]">
            Your Feedback helps up to improve our efforts. Our efforts is the
            result for your Experiences.
          </p>
        </div>
        <div className="flex flex-col items-start">
          <FormControlLabel
            value="end"
            control={
              <Radio
                size="small"
                checked={true}
                sx={{
                  cursor: "default",
                  color: "#FFDE5A",
                  "&.Mui-checked": {
                    color: "#FFDE5A", // checked color
                  },
                }}
              />
            }
            label={
              <div className="sora-regular text-lg flex items-center gap-1">
                Rate your Experience!&nbsp;
                <Image src={selJoye} alt="selJoye" className="w-5 h-5" />
              </div>
            }
            sx={{
              cursor: "default",
              color: "#FFFFFF", // label text color
            }}
          />
          <p className="lg:text-[15px] text-[14px] text-white text-start m-plus-rounded-1c-regular lg:w-[90%] w-full">
            Lorem Ipsum is simply dummy text of the printing there are many
            variations of passages of Lorem Ipsum available, but the majority
            have suffered alteration.
          </p>
        </div>
        <div className="lg:w-[90%] w-full flex flex-col items-center rating">
          <Rating
            size="large"
            name="half-rating"
            onChange={(e, newValue) => handleRatingChange(newValue)}
            value={rating}
            precision={0.5}
            sx={{ gap: 2 }}
          />
          <div className="flex items-center gap-4">
            <Image src={angry} alt="angry" className="w-10 h-10" />
            <Slider
              value={rating}
              onChange={(e, newValue) => handleRatingChange(newValue)}
              valueLabelDisplay="auto"
              step={0.5}
              aria-label="custom thumb label"
              max={5}
              min={0}
              sx={{
                width: "26rem",
                height: 6,
                color: "#63E5FFB2", // Custom color for the slider
              }}
            />
            <Image src={happy} alt="happy" className="w-10 h-10" />
          </div>
        </div>
        <div className="lg:w-[90%] w-full border border-solid border-white rounded-[10px] shadow-[0px_5px_20px_0px_#00000033] backdrop-blur-[5px] p-6">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-white m-plus-rounded-1c-light lg:text-4xl text-xl">
              Feedback given by Persona:
            </h1>
            <p className="text-white m-plus-rounded-1c-regular lg:text-lg text-base">
              Lorem ipsm dolor sit amet.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div class="shadow-[0px_2px_5px_0px_#0000004D] bg-white py-2 px-2.25 rounded-full w-fit h-fit">
              <ArrowForwardIosSharpIcon />
            </div>
            <p className="lg:text-[16px] text-[14px] text-white text-center sora-regular">{`Personalized Performance Insights`}</p>
          </div>
          <div className="flex flex-col gap-2 mt-4 mb-6">
            {PersonalizedPerformance.map((v, i) => (
              <div key={i} className="bg-[#FFFFFF4D] rounded-[5px] py-2 px-8">
                <p className="m-plus-rounded-1c-medium text-white lg:text-base text-sm">
                  {v?.title}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div class="shadow-[0px_2px_5px_0px_#0000004D] bg-white py-2 px-2.25 rounded-full w-fit h-fit">
              <ArrowForwardIosSharpIcon />
            </div>
            <p className="lg:text-[16px] text-[14px] text-white text-center sora-regular">{`Sales Strategy Enhancements`}</p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {SalesStrategy.map((v, i) => (
              <div key={i} className="bg-[#FFFFFF4D] rounded-[5px] py-2 px-8">
                <p className="m-plus-rounded-1c-medium text-white lg:text-base text-sm">
                  {v?.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[30%]">
        <FormControlLabel
          value="end"
          control={
            <Radio
              size="small"
              checked={true}
              sx={{
                cursor: "default",
                color: "#FFDE5A",
                "&.Mui-checked": {
                  color: "#FFDE5A", // checked color
                },
              }}
            />
          }
          label={<p className="sora-regular text-lg">Your Chat History:</p>}
          sx={{
            cursor: "default",
            color: "#FFFFFF", // label text color
          }}
        />
        <div>
          <div className="flex items-start gap-2.5">
            <div className="bg-[#14558C] px-5 py-2.5 rounded-full flex items-center justify-center sora-semibold text-xl text-white">
              1
            </div>
            <div>
              <h1 className="text-white m-plus-rounded-1c-regular text-[22px] truncate w-60">
                Good Morning ! How ar
              </h1>
              <div className="flex items-center gap-2">
                <hr className="border-white w-8" />
                <div className="bg-white w-2.5 h-2.5 rotate-45" />
                <Rating
                  size="small"
                  value={5}
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
              <div className="flex items-start">
                <Image src={solar_pen_bold} alt="solar_pen_bold" />
                <p className="sora-light">Lorem Ipsum is the simply dummy text of t ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingContainer;
