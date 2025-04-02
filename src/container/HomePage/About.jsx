import React from "react";
import aboutNet from "../../../public/assets/images/RealSales-abstracts/about-net.png";
import aboutImg from "../../../public/assets/images/RealSales-abstracts/ABOUTIMG.png";
import Image from "next/image";

const About = () => {
  return (
    <div className="page-container mx-auto container flex justify-between">
      <div className="w-1/2">
        <Image src={aboutImg} alt="aboutImg" className="w-full h-auto" />
      </div>
      <div className="w-1/2 relative">
        <Image src={aboutNet} alt="aboutNet" className="w-full h-full" />
        <div className="absolute top-0 p-4  flex flex-col items-start gap-5">
          <h1 className="text-4xl text-[#060606] m-plus-rounded-1c-regular">
            About
            <br />
            <span className="text-[200%]">REALSALES</span>
          </h1>
          <p className="text-[16px] text-[#060606] sora-regular">
            RealSales is an Industry-specific
            <br />
            Power of the sales accelerator
          </p>
          <p className="text-[40px] text-[#060606] m-plus-rounded-1c-regular">
            "We accelerate sales teams performance by leading them beyond
            traditional and costly training approach."
          </p>
          <div className="border-l-4 border-[#060606B2] bg-[linear-gradient(90deg,#FFF5CD_0%,rgba(255,222,90,0)_63.5%)] py-4 px-6">
            <h2 className="text-[15px] text-[#060606] sora-semibold">
              Our Al-powered interactive platform helps sales teams to go beyond
              the pitch and master the art of connection, cross-selling, and
              deal- closing. Developing real sales skills in real- world
              scenarios...
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
