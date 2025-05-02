import React from "react";
import trade from "../../../public/assets/images/aboutus/trade.png";
import sales from "../../../public/assets/images/aboutus/sales.png";
import selectloc from "../../../public/assets/images/aboutus/selectloc.png";
import aiGirl from "../../../public/assets/images/aboutus/aiGirl.png";
import aiPen from "../../../public/assets/images/aboutus/aiPen.png";
import calculating from "../../../public/assets/images/aboutus/calculating.png";
import Image from "next/image";
import { Rating } from "@mui/material";
import Highlighter from "../../common/highlighter";
import StarIcon from "@mui/icons-material/Star";
import RightPointer from "../../../public/assets/icons/rightPointer";
import bg_11 from "../../../public/assets/images/RealSales-backgrounds/bg-11.png";
import bg_12 from "../../../public/assets/images/RealSales-backgrounds/bg-12.png";

const AboutUs = () => {
  // bg-[url(../../public/assets/images/RealSales-backgrounds/bg-11.png)] bg-cover bg-center bg-no-repeat
  return (
    <div className="bg-gradient-to-b from-[#11182B]/90 to-[#060606]/90">
      <div className="flex justify-between flex-col">
        <div className="z-10 page-container mx-auto container px-4 flex justify-between items-center lg:gap-4 gap-8 lg:flex-row flex-col-reverse py-12">
          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col lg:items-start items-center gap-5">
              <Highlighter />
              <div className="flex items-center gap-4">
                <div className="lg:flex hidden items-center gap-4">
                  <hr className="w-16 border border-white" />
                  <div className="h-3.5 w-3.5 bg-white rotate-45"></div>
                </div>
                <Rating
                  name="text-feedback"
                  value={5}
                  readOnly
                  precision={1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="small" />
                  }
                />
              </div>
              <p className="text-[35px] text-[#ffffff] m-plus-rounded-1c-regular">
                No more Generic AI
                <br />
                Train faster with
              </p>
              <h1 className="lg:text-[65px] text-3xl text-[#ffffff] m-plus-rounded-1c-regular">
                Real Buyer Personas
              </h1>
              <p className="text-[15px] text-[#ffffff] sora-regular w-[90%]">
                Unlike generic Al models, our platform is powered by Al personas
                modeled after{" "}
                <span className="sora-semibold">
                  real industry decision-makers
                </span>
                <br />
                -&nbsp;ensuring that sales reps practice and refine their skills
                in authentic, high-stakes scenarios.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex lg:justify-end justify-center">
            <Image src={aiGirl} alt="aiGirl" className="w-[70%] h-full" />
          </div>
        </div>

        <div className="relative flex items-center justify-between">
          <Image
            src={bg_11}
            alt="bg_11"
            className="absolute right-0 -top-[563px] max-w-[664px]"
          />
          <div className="lg:flex none"></div>
          <hr className="border-[#FFFFFF33] border-1 lg:w-1/2 w-full" />
        </div>

        <div className="z-10 page-container mx-auto container px-4 flex justify-between items-center lg:gap-4 gap-8 lg:flex-row-reverse flex-col-reverse py-12">
          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col lg:items-end items-center gap-5">
              <Highlighter />
              <div className="flex items-center gap-4">
                <div className="lg:flex hidden items-center gap-4">
                  <hr className="w-16 border border-white" />
                  <div className="h-3.5 w-3.5 bg-white rotate-45"></div>
                </div>
                <Rating
                  name="text-feedback"
                  value={5}
                  readOnly
                  precision={1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="small" />
                  }
                />
              </div>
              <p className="text-[35px] text-[#ffffff] m-plus-rounded-1c-regular">
              <span className="m-plus-rounded-1c-extrabold">RealSales</span>&nbsp;turns
                <br />
                sales teams into
              </p>
              <h1 className="lg:text-[65px] text-3xl text-[#ffffff] m-plus-rounded-1c-regular">
                Top Performers
              </h1>
              <p className="text-[15px] text-[#ffffff] lg:text-end items-start sora-regular w-[90%]">
                Our Al-powered interactive platform helps sales teams to
                <span className="sora-semibold">go beyond the pitch</span>
                &nbsp;and master the art of connection, cross-selling, and deal-
                closing.&nbsp;
                <span className="sora-semibold">
                  Developing real sales skills in real- world scenarios...
                </span>
                <br />
                <br />
                <span className="sora-semibold">
                  We accelerate your company sales growth
                </span>
                &nbsp;by helping your reps to become productive faster,
                generating more opportunities per account and improving win
                rates.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex lg:justify-start justify-center">
            <Image src={aiPen} alt="aiPen" className="w-[70%] h-full" />
          </div>
        </div>

        <div className="relative flex items-center justify-between lg:flex-row-reverse flex-col-reverse">
          <Image
            src={bg_12}
            alt="bg_11"
            className="absolute left-0 -top-[563px] max-w-[664px]"
          />
          <div className="lg:flex none"></div>
          <hr className="border-[#FFFFFF33] border-1 lg:w-1/2 w-full" />
        </div>

        <div className="z-10 page-container mx-auto container px-4 flex justify-between items-center lg:gap-4 gap-8 lg:flex-row flex-col-reverse py-12">
          <div className="lg:w-1/2 w-full">
            <div className="flex lg:items-start items-center flex-col gap-5">
              <Highlighter />
              <div className="flex items-center gap-4">
                <div className="lg:flex hidden items-center gap-4">
                  <hr className="w-16 border border-white" />
                  <div className="h-3.5 w-3.5 bg-white rotate-45"></div>
                </div>
                <Rating
                  name="text-feedback"
                  value={5}
                  readOnly
                  precision={1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="small" />
                  }
                />
              </div>
              <p className="text-[32px] text-[#ffffff] m-plus-rounded-1c-regular">
                <span className="m-plus-rounded-1c-extrabold">RealSales</span>&nbsp;is the answer to
                <br />
                Common problem is Sales team Impacting
              </p>
              <h1 className="lg:text-[65px] text-3xl text-[#ffffff] m-plus-rounded-1c-regular">
                Performance
              </h1>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 py-3 px-4 border-l border-solid border-[#14558CB2] bg-[linear-gradient(90deg,rgba(20,85,140,0.3)_0%,rgba(20,85,140,0)_63.5%)]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#14558C] sora-semibold text-white text-[16px]">
                      1
                    </div>
                    <p className="text-[16px] text-[#ffffff] sora-regular w-[95%]">
                      Transactional selling instead of Solution Selling.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-10">
                    <RightPointer />
                    <p className="text-[13px] text-[#ffffff] sora-thin w-[95%]">
                      Pushing products rather than solving problems. Poor
                      cross-selling.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 py-3 px-4 border-l border-solid border-[#14558CB2] bg-[linear-gradient(90deg,rgba(20,85,140,0.3)_0%,rgba(20,85,140,0)_63.5%)]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#14558C] sora-semibold text-white text-[16px]">
                      2
                    </div>
                    <p className="text-[16px] text-[#ffffff] sora-regular w-[95%]">
                      Lack of Understanding of real customer pain points
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-10">
                    <RightPointer />
                    <p className="text-[13px] text-[#ffffff] sora-thin w-[95%]">
                      Failing to ask the right questions and identify customer
                      needs.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 py-3 px-4 border-l border-solid border-[#14558CB2] bg-[linear-gradient(90deg,rgba(20,85,140,0.3)_0%,rgba(20,85,140,0)_63.5%)]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#14558C] sora-semibold text-white text-[16px]">
                      3
                    </div>
                    <p className="text-[16px] text-[#ffffff] sora-regular w-[95%]">
                      Failure to connect the right product to the right need.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-10">
                    <RightPointer />
                    <p className="text-[13px] text-[#ffffff] sora-thin w-[95%]">
                      Inability of Navigating complex portfolio and propose
                      appropriate product.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex lg:justify-end justify-center">
            <Image
              src={calculating}
              alt="calculating"
              className="w-[70%] h-full"
            />
          </div>
        </div>
        <div className="relative flex items-center justify-between">
          <Image
            src={bg_11}
            alt="bg_11"
            className="absolute right-0 -top-[563px] max-w-[664px]"
          />
          <div className="lg:flex none"></div>
          {/* <hr className="border-[#FFFFFF33] border-1 lg:w-1/2 w-full" /> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
