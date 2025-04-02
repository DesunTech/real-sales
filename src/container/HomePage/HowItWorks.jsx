import React from "react";
import Pollygon from "../../common/pollygon";
import LoanProcessing from "../../../public/assets/icons/LoanProcessing.svg";
import StepCard from "../../common/stepCard";
import rightRoundArrow from "../../../public/assets/icons/rightRoundArrow.svg";
import leftRoundArrow from "../../../public/assets/icons/leftRoundArrow.svg";
import Image from "next/image";

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
    {
      id: 7,
      icon: LoanProcessing,
      label: "Loan Processing",
      document: "Lorem is simply dummy text of the printing ....",
    },
    {
      id: 8,
      icon: LoanProcessing,
      label: "Loan Processing",
      document: "Lorem is simply dummy text of the printing ....",
    },
  ];
  return (
    <div className="page-container mx-auto container px-4 py-8 flex flex-col gap-8 items-center">
      <h1 className="text-7xl text-[#060606E5] m-plus-rounded-1c-regular">
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
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <StepCard />
          <Image src={rightRoundArrow} alt="rightRoundArrow" />
          <StepCard />
          <Image src={rightRoundArrow} alt="rightRoundArrow" />
          <StepCard />
        </div>
        <div className="flex items-center gap-4">
          <StepCard />
          <Image src={leftRoundArrow} alt="leftRoundArrow" />
          <StepCard />
          <Image src={leftRoundArrow} alt="leftRoundArrow" />
          <StepCard />
        </div>
      </div>
      <hr className="border-[#06060626] w-full" />
    </div>
  );
};

export default HowItWorks;
