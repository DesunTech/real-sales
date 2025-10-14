import React from "react";
import trade from "../../../public/assets/images/aboutus/trade.png";
import sales from "../../../public/assets/images/aboutus/sales.png";
import selectloc from "../../../public/assets/images/aboutus/selectloc.png";
import aiGirl from "../../../public/assets/images/aboutus/aiGirl.png";
import aiPen from "../../../public/assets/images/aboutus/aiPen.png";
import calculating from "../../../public/assets/images/aboutus/calculating.png";
import Image from "next/image";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RightPointer from "../../../public/assets/icons/rightPointer";
import bg_11 from "../../../public/assets/images/RealSales-backgrounds/bg-11.png";
import bg_12 from "../../../public/assets/images/RealSales-backgrounds/bg-12.png";

const AboutUs = () => {
  return (
<div className="bg-[#212326]">
  {/* Section 1 */}
  <div className="z-10 page-container mx-auto container px-4 flex justify-between items-center lg:gap-4 gap-8 lg:flex-row flex-col-reverse py-12">
    <div data-aos="fade-right" className="lg:w-1/2 w-full">
      <div className="flex flex-col lg:items-start items-center gap-5 text-center lg:text-left">
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
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="small" />}
          />
        </div>

        <p className="text-[35px] text-white m-plus-rounded-1c-regular">
          No more Generic AI
        </p>
        <h1 className="lg:text-[65px] text-3xl text-white m-plus-rounded-1c-regular">
          Real Buyer Persona for Real Sales
        </h1>
        <p className="text-[15px] text-white sora-regular lg:w-[90%] w-full">
          Unlike generic AI models, our platform is powered by AI personas modeled after
          <span className="sora-semibold"> real industry decision-makers</span> — ensuring
          that sales reps practice and refine their skills in authentic, high-stakes scenarios.
        </p>
      </div>
    </div>
    <div data-aos="fade-up" className="lg:w-1/2 w-full flex lg:justify-end justify-center">
      <Image src={aiGirl} alt="aiGirl" className="w-[70%] h-full" />
    </div>
  </div>

  {/* Divider */}
  <div className="relative flex items-center justify-between">
    <Image
      src={bg_11}
      alt="bg_11"
      className="absolute right-0 -top-[563px] max-w-[664px] lg:block hidden"
    />
    <hr className="border-[#FFFFFF33] border-1 lg:w-1/2 w-full" />
  </div>

  {/* Section 2 */}
  <div className="z-10 page-container mx-auto container px-4 flex justify-between items-center lg:gap-4 gap-8 lg:flex-row-reverse flex-col-reverse py-12">
    <div data-aos="fade-left" className="lg:w-1/2 w-full">
      <div className="flex flex-col lg:items-end items-center gap-5 text-center lg:text-right">
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
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="small" />}
          />
        </div>

        <p className="text-[35px] text-white m-plus-rounded-1c-regular">
          Accelerate your
          <br />
          Company Growth
        </p>
        <h1 className="lg:text-[65px] text-3xl text-white m-plus-rounded-1c-regular">
          Transform your Sales Team into
          <br />
          Top Performer
        </h1>
        <p className="text-[15px] text-white sora-regular lg:text-end text-center lg:w-[90%] w-full">
          Our AI-powered interactive platform helps sales teams to
          <span className="sora-semibold"> go beyond the pitch</span> and master the art of
          connection, cross-selling, and deal-closing.
          <span className="sora-semibold">
            &nbsp;Developing real sales skills in real-world scenarios...
          </span>
        </p>
      </div>
    </div>
    <div data-aos="fade-up" className="lg:w-1/2 w-full flex lg:justify-start justify-center">
      <Image src={aiPen} alt="aiPen" className="w-[70%] h-full" />
    </div>
  </div>

  {/* Divider 2 */}
  <div className="relative flex items-center justify-between lg:flex-row-reverse flex-col-reverse">
    <Image
      src={bg_12}
      alt="bg_12"
      className="absolute left-0 -top-[563px] lg:max-w-[664px] w-full lg:block hidden"
    />
    <hr className="border-[#FFFFFF33] border-1 lg:w-1/2 w-full" />
  </div>

  {/* Section 3 */}
  <div className="z-10 page-container mx-auto container px-4 flex justify-between items-center lg:gap-4 gap-8 lg:flex-row flex-col-reverse py-12">
    <div data-aos="fade-right" className="lg:w-1/2 w-full">
      <div className="flex flex-col lg:items-start items-center gap-5 text-center lg:text-left">
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
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="small" />}
          />
        </div>

        <p className="text-[32px] text-white m-plus-rounded-1c-regular">
          <span className="m-plus-rounded-1c-extrabold">RealSales</span> is the answer to
          <br />
          Common problems impacting Sales Team Performance
        </p>

        {/* <h1 className="lg:text-[65px] text-3xl text-white m-plus-rounded-1c-regular">
          Performance
        </h1> */}

        <div className="flex flex-col gap-5 w-full lg:w-[95%]">
          {[
            {
              title: "Transactional selling instead of Solution Selling.",
              desc: "Pushing products rather than solving problems. Poor cross-selling.",
            },
            {
              title: "Lack of Understanding of real customer pain points",
              desc: "Failing to ask the right questions and identify customer needs.",
            },
            {
              title: "Failure to connect the right product to the right need.",
              desc: "Inability to navigate complex portfolios and propose appropriate products.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 py-3 px-4 border-l border-solid border-[#14558CB2] bg-[linear-gradient(90deg,rgba(20,85,140,0.3)_0%,rgba(20,85,140,0)_63.5%)]"
            >
              <div className="flex items-center gap-2">
                <p className="text-[16px] text-white sora-thin w-[95%]">{item.title}</p>
              </div>
              <div className="flex items-center gap-2 ml-5">
                <RightPointer />
                <p className="text-[13px] text-white sora-regular w-[95%]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div data-aos="fade-up" className="lg:w-1/2 w-full flex lg:justify-end justify-center">
      <Image src={calculating} alt="calculating" className="w-[70%] h-full" />
    </div>
  </div>
</div>

  );
};

export default AboutUs;
