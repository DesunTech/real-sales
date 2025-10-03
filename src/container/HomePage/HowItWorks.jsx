import React from "react";
import Image from "next/image";
import Pollygon from "../../common/pollygon";
import StepCard from "../../common/stepCard";
import rightRoundArrow from "../../../public/assets/icons/rightRoundArrow.svg";
import leftRoundArrow from "../../../public/assets/icons/leftRoundArrow.svg";
import secoundNature from "../../../public/assets/icons/secoundNature.svg";
import pitchMonster from "../../../public/assets/icons/pitchMonster.svg";
import luster from "../../../public/assets/icons/luster.svg";
import quantifiedCommunications from "../../../public/assets/icons/quantifiedCommunications.svg";
import SimpleCard from "../../common/simpleCard";
import blackLogoNoBackground from "../../../public/assets/images/RealSales-official-logo/For Web/png/Black logo - no background.png";
import LoanProcessing from "../../../public/assets/icons/LoanProcessing.svg";
import bi_cash_coin from "../../../public/assets/icons/bi_cash-coin.svg";
import game_icons_face_to_face from "../../../public/assets/icons/game-icons_face-to-face.svg";
import lets_icons_done_ring_round from "../../../public/assets/icons/lets-icons_done-ring-round.svg";
import material_symbols_light_order_approve_outline_sharp from "../../../public/assets/icons/material-symbols-light_order-approve-outline-sharp.svg";
import ph_note_light from "../../../public/assets/icons/ph_note-light.svg";

const HowItWorks = (props) => {
  const HowItWorksArr = [
    {
      id: 1,
      icon: LoanProcessing,
      label: "Loan Processing",
      document: "Lorem is simply dummy text of the printing ....",
    },
    {
      id: 2,
      icon: ph_note_light,
      label: "Underwriting",
      document: "Lorem is simply dummy text of the printing ....",
    },
    {
      id: 3,
      icon: material_symbols_light_order_approve_outline_sharp,
      label: "Conditionally Approved",
      document: "Lorem is simply dummy text of the printing ....",
    },
    {
      id: 4,
      icon: lets_icons_done_ring_round,
      label: "Clear to Close",
      document: "Lorem is simply dummy text of the printing ....",
    },
    {
      id: 5,
      icon: game_icons_face_to_face,
      label: "Closing",
      document: "Lorem is simply dummy text of the printing ....",
    },
    {
      id: 6,
      icon: bi_cash_coin,
      label: "Loan Founded",
      document: "Lorem is simply dummy text of the printing ....",
    },
  ];
  return (
    <div className=" w-full h-full">
   <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-10.png)] bg-cover bg-center bg-no-repeat py-20">
  <div className="page-container mx-auto container px-4 flex flex-col gap-16 items-center">
    
    {/* Section Heading */}
    <h1 className="lg:text-6xl md:text-5xl text-3xl font-bold text-[#060606E5] text-center m-plus-rounded-1c-regular">
      How It Works
    </h1>

    {/* Desktop View */}
    <div className="lg:flex hidden flex-col items-center gap-2">
      <div className="flex items-center gap-12">
        <StepCard
          steps={`1`}
          heading={`Select the Scenario`}
          description={`Choose from a variety of AI buyer personas that represent your target customers, each with unique needs, pain points and decision-making process. Pick the preferred sales scenario among (prospecting, discovery or closing).`}
          className="min-h-[460px] p-10 text-xl leading-relaxed w-[340px]"
        />
        <Image src={rightRoundArrow} alt="rightRoundArrow" className="w-14 h-14" />
        <StepCard
          steps={`2`}
          heading={`Handle Objections & Sales`}
          description={`Participate in realistic sales dialogue within the chosen scenario, practicing your communication style, value selling techniques and ability to identify needs. Receive coaching report to highlight areas of improvements and overall effectiveness.`}
          className="min-h-[460px] p-10 text-xl leading-relaxed w-[340px]"
        />
        <Image src={rightRoundArrow} alt="rightRoundArrow" className="w-14 h-14" />
        <StepCard
          steps={`3`}
          heading={`Access & Track Performance`}
          description={`Access RealSales dashboard and monitor usage, performance and sales capabilities development, either for yourself as sales rep or for your team as sales manager.`}
          className="min-h-[460px] p-10 text-xl leading-relaxed w-[340px]"
        />
      </div>
    </div>

    {/* Tablet View */}
    <div className="lg:hidden md:flex hidden items-start gap-8 flex-wrap">
      <StepCard
        width={"48%"}
        steps={`1`}
        heading={`Select the Scenario`}
        description={`Choose from a variety of AI buyer personas that represent your target customers, each with unique needs, pain points and decision-making process. Pick the preferred sales scenario among (prospecting, discovery or closing).`}
        className="min-h-[420px] p-8 text-lg leading-relaxed"
      />
      <StepCard
        width={"48%"}
        steps={`2`}
        heading={`Handle Objections & Sales`}
        description={`Participate in realistic sales dialogue within the chosen scenario, practicing your communication style, value selling techniques and ability to identify needs. Receive coaching report to highlight areas of improvements and overall effectiveness.`}
        className="min-h-[420px] p-8 text-lg leading-relaxed"
      />
      <StepCard
        width={"100%"}
        steps={`3`}
        heading={`Access & Track Performance`}
        description={`Access RealSales dashboard and monitor usage, performance and sales capabilities development, either for yourself as sales rep or for your team as sales manager.`}
        className="min-h-[420px] p-8 text-lg leading-relaxed"
      />
    </div>

    {/* Mobile View */}
    <div className="md:hidden flex flex-col items-center gap-8 w-full">
      <StepCard
        width={"100%"}
        steps={`1`}
        heading={`Select the Scenario`}
        description={`Choose from a variety of AI buyer personas that represent your target customers, each with unique needs, pain points and decision-making process. Pick the preferred sales scenario among (prospecting, discovery or closing).`}
        className="min-h-[400px] p-6 text-base leading-relaxed"
      />
      <StepCard
        width={"100%"}
        steps={`2`}
        heading={`Handle Objections & Sales`}
        description={`Participate in realistic sales dialogue within the chosen scenario, practicing your communication style, value selling techniques and ability to identify needs. Receive coaching report to highlight areas of improvements and overall effectiveness.`}
        className="min-h-[400px] p-6 text-base leading-relaxed"
      />
      <StepCard
        width={"100%"}
        steps={`3`}
        heading={`Access & Track Performance`}
        description={`Access RealSales dashboard and monitor usage, performance and sales capabilities development, either for yourself as sales rep or for your team as sales manager.`}
        className="min-h-[400px] p-6 text-base leading-relaxed"
      />
    </div>

    <hr className="border-[#06060626] w-full" />
  </div>
</div>

      {/* <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-3.png)] bg-cover bg-center bg-no-repeat">
        <div className="page-container mx-auto container px-4 py-8 flex flex-col gap-5">
          <h1 className="text-[28px] text-[#060606] m-plus-rounded-1c-regular text-center">
            At Glance: How we Different from our Competitors Landscapes
          </h1>
          <div className="relative flex items-center lg:flex-row flex-col">
            <div className="absolute lg:flex hidden left-[25%] border-r border-solid border-[#0606064D] h-full" />
            <div className="relative lg:w-1/2 w-full h-full flex flex-wrap">
              <div className="absolute top-[50%] border-b border-solid border-[#0606064D] w-full" />
              <div className="w-1/2 h-full flex flex-col gap-5 lg:p-5 p-2.5">
                <Image
                  src={secoundNature}
                  alt="secoundNature"
                  className="h-10 w-auto"
                />
                <p className="text-[#060606B2] text-[12px] sora-regular text-center">
                  Generic Al personas not built on real industry data; primarily
                  focused on tech and SaaS sales.
                </p>
              </div>
              <div className="w-1/2 h-full flex flex-col gap-5 lg:p-5 p-2.5">
                <Image
                  src={pitchMonster}
                  alt="pitchMonster"
                  className="h-10 w-auto"
                />
                <p className="text-[#060606B2] text-[12px] sora-regular text-center">
                  Generic Al personas not built on real industry data; primarily
                  focused on tech and SaaS sales.
                </p>
              </div>
              <div className="w-1/2 h-full flex flex-col gap-5 lg:p-5 p-2.5">
                <Image src={luster} alt="luster" className="h-10 w-auto" />
                <p className="text-[#060606B2] text-[12px] sora-regular text-center">
                  Generic Al personas not built on real industry data; primarily
                  focused on tech and SaaS sales.
                </p>
              </div>
              <div className="w-1/2 h-full flex flex-col gap-5 lg:p-5 p-2.5">
                <Image
                  src={quantifiedCommunications}
                  alt="quantifiedCommunications"
                  className="h-10 w-auto"
                />
                <p className="text-[#060606B2] text-[12px] sora-regular text-center">
                  Generic Al personas not built on real industry data; primarily
                  focused on tech and SaaS sales.
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 w-full h-full flex flex-col lg:px-8 px-0 lg:border-l-2 border-l-0 lg:border-t-0 border-t-2 border-dashed border-[#0606064D]">
              <div className="my-4 w-full flex items-center justify-center">
                <Image
                  src={blackLogoNoBackground}
                  alt="blackLogoNoBackground"
                  className="h-auto w-[200px]"
                />
              </div>
              <div className="flex lg:flex-row flex-col">
                <SimpleCard
                  className={`w-full flex flex-col gap-2 mx-[1%] mb-[1%]`}
                >
                  <h1 className="text-[12px] text-[#060606E5] sora-semibold text-center">
                    Industry-Specific Al Personas
                  </h1>
                  <p className="text-[#060606B2] text-[11px] sora-regular text-center">
                    Competitors use generic AI role-play; we train AI personas
                    on real buyer behavior per industry.
                  </p>
                </SimpleCard>
                <SimpleCard
                  className={`w-full flex flex-col gap-2 ml-[1%] mb-[1%]`}
                >
                  <h1 className="text-[12px] text-[#060606E5] sora-semibold text-center">
                    Focus on Cross- Selling & Upselling
                  </h1>
                  <p className="text-[#060606B2] text-[11px] sora-regular text-center">
                    Most tools train on basic sales, but RealSales helps reps
                    handle complex portfolios and ....
                  </p>
                </SimpleCard>
              </div>
              <div className="flex lg:flex-row flex-col">
                <SimpleCard
                  className={`w-full flex flex-col gap-2 mx-[1%] my-[1%]`}
                >
                  <h1 className="text-[12px] text-[#060606E5] sora-semibold text-center">
                    Real-World Prospecting, Not Just Coaching
                  </h1>
                  <p className="text-[#060606B2] text-[11px] sora-regular text-center">
                    Competitors refine scripts; we simulate real prospecting,
                    sales, and closing with industry data.
                  </p>
                </SimpleCard>
                <SimpleCard
                  className={`w-full flex flex-col gap-2 ml-[1%] my-[1%]`}
                >
                  <h1 className="text-[12px] text-[#060606E5] sora-semibold text-center">
                    Al-Adaptive Learning for Each Rep
                  </h1>
                  <p className="text-[#060606B2] text-[11px] sora-regular text-center">
                    Our platform adapts to each rep's skills, ensuring growth
                    through real-world objections.
                  </p>
                </SimpleCard>
              </div>
              <SimpleCard
                className={`w-full flex flex-col gap-2 mx-[1%] mt-[1%]`}
              >
                <h1 className="text-[12px] text-[#060606E5] sora-semibold text-center">
                  More Than Training - A Revenue Acceleration Tool
                </h1>
                <p className="text-[#060606B2] text-[11px] sora-regular text-center">
                  While competitors emphasize "training," we accelerate sales
                  maturity -helping companies onboard reps faster, increase
                  opportunity identification, and improve closing rates.
                </p>
              </SimpleCard>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HowItWorks;
