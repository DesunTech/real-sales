import React from "react";
import Image from "next/image";
import Pollygon from "../../common/pollygon";
import StepCard from "../../common/stepCard";
import LoanProcessing from "../../../public/assets/icons/LoanProcessing.svg";
import rightRoundArrow from "../../../public/assets/icons/rightRoundArrow.svg";
import leftRoundArrow from "../../../public/assets/icons/leftRoundArrow.svg";
import secoundNature from "../../../public/assets/icons/secoundNature.svg";
import pitchMonster from "../../../public/assets/icons/pitchMonster.svg";
import luster from "../../../public/assets/icons/luster.svg";
import quantifiedCommunications from "../../../public/assets/icons/quantifiedCommunications.svg";
import SimpleCard from "../../common/simpleCard";
import blackLogoNoBackground from "../../../public/assets/images/RealSales-official-logo/For Web/png/Black logo - no background.png";

const HowItWorks = () => {
  const HowItWorksArr = [
    {
      id: 1,
      icon: LoanProcessing,
      label: "Loan Processing",
      document: "Lorem is simply dummy text of the printing ....",
    },
    {
      id: 2,
      icon: LoanProcessing,
      label: "Loan Processing",
      document: "Lorem is simply dummy text of the printing ....",
    },
    {
      id: 3,
      icon: LoanProcessing,
      label: "Loan Processing",
      document: "Lorem is simply dummy text of the printing ....",
    },
    {
      id: 4,
      icon: LoanProcessing,
      label: "Loan Processing",
      document: "Lorem is simply dummy text of the printing ....",
    },
    {
      id: 5,
      icon: LoanProcessing,
      label: "Loan Processing",
      document: "Lorem is simply dummy text of the printing ....",
    },
    {
      id: 6,
      icon: LoanProcessing,
      label: "Loan Processing",
      document: "Lorem is simply dummy text of the printing ....",
    },
  ];
  return (
    <div className="home-bg w-full">
      <div className="page-container mx-auto container px-4 py-8 flex flex-col gap-8 items-center ">
        <h1 className="lg:text-7xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular">
          How It Works
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-4">
          {HowItWorksArr.map((v, i) => (
            <Pollygon
              key={i}
              id={v?.id}
              icon={v?.icon}
              label={v?.label}
              document={v?.document}
            />
          ))}
        </div>
        <hr className="border-[#06060626] w-[70%]" />
        <div className="lg:flex hidden flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <StepCard
              steps={`1`}
              heading={`Select an AI`}
              title={`Buyer Personas`}
              description={`Choose from a variety of customizable Al buyer personas that represent your target customers, each with unique needs, pain points, and decision- making processes.`}
            />
            <Image src={rightRoundArrow} alt="rightRoundArrow" />
            <StepCard
              steps={`2`}
              heading={`Engaged in Real-time`}
              title={`AI Powered Sales`}
              description={`Participate in realistic sales dialogues with the Al personas, practicing your communication, value selling and ability in identifying needs.`}
            />
            <Image src={rightRoundArrow} alt="rightRoundArrow" />
            <StepCard
              steps={`3`}
              heading={`Handle Objections &`}
              title={`Complex Sales`}
              description={`Participate in realistic sales dialogues with the Al personas, practicing your communication, value selling and ability in identifying needs.`}
            />
          </div>
          <div className="flex items-center gap-4">
            <StepCard
              steps={`6`}
              heading={`Receiving and track`}
              title={`Performance`}
              description={`Monitoring usage, performance, sales capability and accelerate development of top performer.(As a solo user or for your team as manager)`}
            />
            <Image src={leftRoundArrow} alt="leftRoundArrow" />
            <StepCard
              steps={`5`}
              heading={`Integrate Co.  Product`}
              title={`Knowledges`}
              description={`Leverage the Al's understanding of your company's
products, services and case studies to validate value
selling and cross-selling approach.`}
            />
            <Image src={leftRoundArrow} alt="leftRoundArrow" />
            <StepCard
              steps={`4`}
              heading={`Receive Instant Feed`}
              title={`Communication`}
              description={`Get immediate feedback and coaching from the All
system, highlighting. areas for improvement in your sales approach and overall effectiveness.`}
            />
          </div>
        </div>
        <div className="lg:hidden md:flex hidden items-center gap-4 flex-wrap">
          <StepCard
            width={"48%"}
            steps={`1`}
            heading={`Select an AI`}
            title={`Buyer Personas`}
            description={`Choose from a variety of customizable Al buyer personas that represent your target customers, each with unique needs, pain points, and decision- making processes.`}
          />
          <StepCard
            width={"48%"}
            steps={`2`}
            heading={`Engaged in Real-time`}
            title={`AI Powered Sales`}
            description={`Participate in realistic sales dialogues with the Al personas, practicing your communication, value selling and ability in identifying needs.`}
          />
          <StepCard
            width={"48%"}
            steps={`3`}
            heading={`Handle Objections &`}
            title={`Complex Sales`}
            description={`Participate in realistic sales dialogues with the Al personas, practicing your communication, value selling and ability in identifying needs.`}
          />
          <StepCard
            width={"48%"}
            steps={`4`}
            heading={`Receiving and track`}
            title={`Performance`}
            description={`Monitoring usage, performance, sales capability and accelerate development of top performer.(As a solo user or for your team as manager)`}
          />
          <StepCard
            width={"48%"}
            steps={`5`}
            heading={`Integrate Co.  Product`}
            title={`Knowledges`}
            description={`Leverage the Al's understanding of your company's
products, services and case studies to validate value
selling and cross-selling approach.`}
          />
          <StepCard
            width={"48%"}
            steps={`6`}
            heading={`Receive Instant Feed`}
            title={`Communication`}
            description={`Get immediate feedback and coaching from the All
system, highlighting. areas for improvement in your sales approach and overall effectiveness.`}
          />
        </div>
        <div className="md:hidden flex items-center gap-4 flex-wrap">
          <StepCard
            width={"100%"}
            steps={`1`}
            heading={`Select an AI`}
            title={`Buyer Personas`}
            description={`Choose from a variety of customizable Al buyer personas that represent your target customers, each with unique needs, pain points, and decision- making processes.`}
          />
          <StepCard
            width={"100%"}
            steps={`2`}
            heading={`Engaged in Real-time`}
            title={`AI Powered Sales`}
            description={`Participate in realistic sales dialogues with the Al personas, practicing your communication, value selling and ability in identifying needs.`}
          />
          <StepCard
            width={"100%"}
            steps={`3`}
            heading={`Handle Objections &`}
            title={`Complex Sales`}
            description={`Participate in realistic sales dialogues with the Al personas, practicing your communication, value selling and ability in identifying needs.`}
          />
          <StepCard
            width={"100%"}
            steps={`6`}
            heading={`Receiving and track`}
            title={`Performance`}
            description={`Monitoring usage, performance, sales capability and accelerate development of top performer.(As a solo user or for your team as manager)`}
          />
          <StepCard
            width={"100%"}
            steps={`5`}
            heading={`Integrate Co.  Product`}
            title={`Knowledges`}
            description={`Leverage the Al's understanding of your company's
products, services and case studies to validate value
selling and cross-selling approach.`}
          />
          <StepCard
            width={"100%"}
            steps={`4`}
            heading={`Receive Instant Feed`}
            title={`Communication`}
            description={`Get immediate feedback and coaching from the All
system, highlighting. areas for improvement in your sales approach and overall effectiveness.`}
          />
        </div>
        <hr className="border-[#06060626] w-full" />
        <div className="flex flex-col gap-5">
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
      </div>
    </div>
  );
};

export default HowItWorks;
