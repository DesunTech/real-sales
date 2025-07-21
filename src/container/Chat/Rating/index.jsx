import { FormControlLabel, Radio, Rating, Slider, styled } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import selJoye from "../../../../public/assets/icons/selJoye.svg";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import happy from "../../../../public/assets/icons/happy.svg";
import angry from "../../../../public/assets/icons/angry.svg";
import solar_pen_bold from "../../../../public/assets/icons/solar_pen_bold.svg";
import StarIcon from "@mui/icons-material/Star";
import BookAdemo from "../../../common/bookAdemo";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowRight from "../../../../public/assets/icons/arrowRight";
import cil_audio from "../../../../public/assets/icons/cil_audio.svg";
import pdfIcon from "../../../../public/assets/icons/pdfIcon.svg";
import { useRouter } from "next/router";
import { apis } from "../../../utils/apis";
import { useApi } from "../../../hooks/useApi";

const RatingContainer = () => {
  const [rating, setRating] = useState(0);
  const { Get } = useApi();
  const { feedback } = apis;

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

  const ChatHistoryArr = [
    {
      chat1: "Good Morning ! How ar",
      chat2: "Lorem Ipsum is the simply dummy text of t",
      rating: 5,
    },
    {
      chat1: "Hello.. ! Nice to hear you",
      chat2: "Lorem Ipsum is the simply dummy text of t",
      rating: 5,
    },
    {
      chat1: "Congrats, you receive th",
      chat2: "Lorem Ipsum is the simply dummy text of t",
      rating: 5,
    },
  ];

  const SalesStrategy = [
    { title: "User confidence was good, but a slightly slower pace." },
    { title: "My Customer provided solid product knowledge today." },
  ];

  useEffect(() => {
    let user_id = localStorage.getItem("user");
    const getFeedBack = async () => {
      let data = await Get(`${feedback}user/${user_id}`);
      if (data?.feedback_id) {
        setRating(data?.rating);
      }
      try {
      } catch (error) {
        console.log(error, "_error_");
      }
    };
    if (user_id) {
      getFeedBack();
    }
  }, []);

  return (
    <div className="w-full flex lg:flex-row flex-col items-start justify-center gap-8 px-[8%]">
      <div className="lg:w-[65%] w-full flex flex-col gap-4">
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
            readOnly={true}
            onChange={(e, newValue) => handleRatingChange(newValue)}
            value={rating}
            precision={0.5}
            sx={{ gap: 2 }}
          />
          <div className="flex items-center gap-4">
            <Image src={angry} alt="angry" className="w-10 h-10" />
            <Slider
              className="!text-[#63E5FFB2]"
              value={rating}
              disabled={true}
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
      <div className="lg:w-[35%] w-full flex flex-col items-start gap-4">
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
          label={<p className="sora-semithin text-lg">Your Chat History:</p>}
          sx={{
            cursor: "default",
            color: "#FFFFFF", // label text color
          }}
        />
        <div className="flex flex-col gap-4">
          {ChatHistoryArr?.length
            ? ChatHistoryArr.map((v, i) => (
                <div className="flex items-start gap-2.5">
                  <p
                    key={i}
                    className="bg-[#14558C] p-4 w-10 h-10 leading-0 rounded-full flex items-center justify-center sora-semibold text-base text-white"
                  >
                    {i + 1}
                  </p>
                  <div className="bg-[linear-gradient(-90deg,rgba(20,85,140,0.3)_0%,rgba(20,85,140,0)_63.5%)] border-r-4 border-solid border-[#14558CB2]">
                    <h1 className="text-white m-plus-rounded-1c-regular text-[22px] truncate w-60">
                      {v?.chat1}
                    </h1>
                    <div className="flex items-center gap-2">
                      <hr className="border-white w-8" />
                      <div className="bg-white w-2.5 h-2.5 rotate-45" />
                      <Rating
                        size="small"
                        readOnly={true}
                        value={v?.rating}
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </div>
                    <div className="flex items-start gap-2">
                      <Image src={solar_pen_bold} alt="solar_pen_bold" />
                      <p className="sora-semilight text-white text-[14px] truncate w-[85%]">
                        {v?.chat2}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : null}
          <p className="sora-regular text-white underline text-[14px] text-right cursor-pointer">
            View all
          </p>

          <div className="relative bg-[linear-gradient(180deg,rgba(17,24,43,0.3)_0%,rgba(255,255,255,0.09)_100%)] rounded-[10px] p-4 flex flex-col items-start gap-4">
            <div
              // onClick={props?.onClose}
              className="z-10 cursor-pointer bg-red-500 rounded-full h-6 w-6 flex items-center justify-center absolute -top-2.5 -right-1.5"
            >
              <CloseOutlinedIcon className="!text-[16px] text-white" />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-white m-plus-rounded-1c-medium text-lg">
                Upgrade
              </p>
              <div className="flex items-start">
                <p className="text-white m-plus-rounded-1c-semilight text-[22px]">
                  Get Access upto 3 Personas
                </p>
                <div className="p-2 rounded-[10px] bg-[#060606] w-fit">
                  <Image src={cil_audio} alt="cil_audio" />
                </div>
              </div>
              <p className="text-white sora-regular text-[15px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's.
              </p>
            </div>
            <BookAdemo
              BookaDemo={`upgrade your plan`}
              link={`/pricing`}
              className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit`}
              icon={<ArrowRight stroke={`#FFDE5A`} />}
            />
            <p className="text-white m-plus-rounded-1c-regular text-[12px]">
              *Note: Lorem Ipsum is simply dummy text of printing.
            </p>
          </div>

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
              <p className="sora-semithin text-lg">
                Download your Feedback Report:
              </p>
            }
            sx={{
              cursor: "default",
              color: "#FFFFFF", // label text color
            }}
          />
          <div className="w-full flex items-center justify-center">
            <div className="bg-[#CF2427] rounded-[5px] px-4 py-2 flex items-center gap-2 w-fit cursor-pointer">
              <Image src={pdfIcon} alt="pdfIcon" className="w-8 h-10" />
              <p className="m-plus-rounded-1c-regular text-white text-xl">
                Download PDF
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingContainer;
