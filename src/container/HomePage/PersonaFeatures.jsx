import React from "react";
import Highlighter from "../../common/highlighter";
import cil_audio from "../../../public/assets/icons/cil_audio.svg";
import mdi_video from "../../../public/assets/icons/mdi_video.svg";
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
      icon: basil_eye_outline,
      heading_p1: "Real AI-Driven",
      heading_p2: "Buyer Personas",
      about: "Accelerator solutions of RealSales",
      content:
        "Al-powered buyer personas built from real industry experts that mimic real customer interactions, allowing sales reps to ....",
    },
    {
      icon: mdi_hard_hat,
      heading_p1: "AI",
      heading_p2: "Sales Coaching",
      about: "Accelerator solutions of RealSales",
      content:
        "Al-powered coaches that provide guidance to sales reps on handling objections, closing deals, and ....",
    },
    {
      icon: mdi_target,
      heading_p1: "Realtime Tracking",
      heading_p2: "Performance",
      about: "Accelerator solutions of RealSales",
      content:
        "Instant feedback and analytics that help sales reps track their progress, identify areas for improvement, & continuously....",
    },
  ];

  return (
    <div className="page-container mx-auto container px-4 flex justify-between">
      <div className="flex flex-col items-center gap-4 w-full py-12">
        <Highlighter highlight={"Persona Features"} />
        <p className="text-[30px] text-[#060606E5] m-plus-rounded-1c-regular">
          Sales approach with data-driven insights
        </p>
        <h1 className="text-7xl text-[#060606E5] m-plus-rounded-1c-regular">
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

        <div className="flex w-full">
          {FeaturesArr.map((val, idx) => (
            <div
              key={idx}
              className="w-1/4 p-6 flex flex-col items-start gap-2 odd:bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(227,227,227,0.85)_100%)] even:bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(99,229,255,0.3)_100%)]"
            >
              <div className="border border-solid border-[#0606064D] rounded-[5px] w-fit py-2 px-3">
                <Image src={val?.icon} alt={val?.heading_p1} className="w-12 h-12"/>
              </div>
              <h1 className="text-[22px] text-[#060606E5] m-plus-rounded-1c-regular">
                {val?.heading_p1}<br />
                <span className="text-[130%]">{val?.heading_p2}</span>
              </h1>
              <p className="text-[15px] text-[#060606] sora-regular">{val?.about}</p>
              <div className="border-l-2 border-solid border-[#060606B2] bg-gradient-to-r from-[rgba(255,222,90,0.3)] to-[rgba(255,222,90,0)] to-64% py-2 px-3">
                <p className="text-[11px] text-[#060606] sora-regular">{val?.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonaFeatures;
