import React from "react";
import Highlighter from "../../common/highlighter";
import cil_audio from "../../../public/assets/icons/cil_audio.svg";
import mdi_video from "../../../public/assets/icons/mdi_video.svg";
import Persona from "../../../public/assets/icons/avatar.svg";
import Image from "next/image";
import clarity_block_line from "../../../public/assets/icons/aisalesPersonaFeatures/clarity_block-line.svg";
import basil_eye_outline from "../../../public/assets/icons/aisalesPersonaFeatures/basil_eye-outline.svg";
import mdi_hard_hat from "../../../public/assets/icons/aisalesPersonaFeatures/mdi_hard-hat.svg";
import mdi_target from "../../../public/assets/icons/aisalesPersonaFeatures/mdi_target.svg";

const PersonaFeatures = () => {
  const FeaturesArr = [
    {
      icon: clarity_block_line,
      heading_p1: "Immersive",
      heading_p2: "Sales Practice",
      about: "Accelerator solutions of RealSales",
      content:
        "Video avatars that create real-time, immersive sales scenarios for reps to turn training into real-world practice.",
    },
    {
      icon: Persona,
      heading_p1: "Real AI-Driven",
      heading_p2: "Buyer Personas",
      about: "Accelerator solutions of RealSales",
      content:
        "Al-powered buyer personas built from real industry experts that mimic real customer interactions.",
    },
    {
      // icon: mdi_hard_hat,
      icon: basil_eye_outline,
      heading_p1: "AI",
      heading_p2: "Sales Coaching",
      about: "Accelerator solutions of RealSales",
      content:
        "Al-powered coaches that provide guidance to sales reps on handling objections, closing deals.",
    },
    {
      icon: mdi_target,
      heading_p1: "Realtime Tracking",
      heading_p2: "Performance",
      about: "Accelerator solutions of RealSales",
      content:
        "Instant feedback and analytics that help sales reps track their progress, identify areas for improvement.",
    },
  ];

  return (
    <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-3.png)] bg-cover bg-center bg-no-repeat">
      <div className="page-container mx-auto container px-4 flex justify-between">
        <div className="flex flex-col items-center gap-4 w-full py-12">
          {/* <Highlighter highlight={"Persona Features"} /> */}
          {/* <p className="text-[30px] text-center text-[#060606E5] m-plus-rounded-1c-regular">
            Sales approach with data-driven insights
          </p> */}
          <h1 className="lg:text-7xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular text-center">
            Our Platform Features
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-[16px] text-[#060606E5] sora-regular">
              Our Session mode:
            </p>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="p-2 rounded-[10px] bg-[#060606] w-fit">
                  <Image src={cil_audio} alt="cil_audio" />
                </div>
                <p className="text-[14px] text-[#060606E5] sora-regular">
                  Audio
                  <br />
                  Mode
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="p-2 rounded-[10px] bg-[#060606] w-fit">
                  <Image src={mdi_video} alt="mdi_video" />
                </div>
                <p className="text-[14px] text-[#060606E5] sora-regular">
                  Video
                  <br />
                  Mode
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-wrap lg:gap-0 gap-2">
            {FeaturesArr.map((val, idx) => (
              <div
                data-aos="zoom-out"
                key={idx}
                className="lg:w-1/4 w-full odd:bg-[url(../../public/assets/images/RealSales-backgrounds/bg-13.png)] even:bg-[url(../../public/assets/images/RealSales-backgrounds/bg-14.png)] bg-cover bg-center bg-no-repeat flex flex-col items-start gap-2 p-6"
              >
                <div className="border border-solid border-[#0606064D] rounded-[5px] w-fit py-2 px-3">
                  <Image
                    src={val?.icon}
                    alt={val?.heading_p1}
                    className="w-12 h-12"
                  />
                </div>
                <h1 className="text-[22px] text-[#060606E5] m-plus-rounded-1c-regular">
                  {val?.heading_p1}
                  <br />
                  <span className="text-[130%]">{val?.heading_p2}</span>
                </h1>
                {/* <p className="text-[15px] text-[#060606] sora-regular">
                  {val?.about}
                </p> */}
                <div className="border-l-2 border-solid border-[#060606B2] bg-gradient-to-r from-[rgba(255,222,90,0.3)] to-[rgba(255,222,90,0)] to-64% py-2 px-3">
                  <p className="text-[15px] text-[#060606] sora-regular">
                    {val?.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaFeatures;
