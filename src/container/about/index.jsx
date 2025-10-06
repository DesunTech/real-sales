import React from "react";
import Banner from "./Banner";
import QuickSearch from "./QuickSearch";
import Highlighter from "../../common/highlighter";
import MeetPerfectPersona from "./MeetPerfectPersona";
import HowItWorks from "../HomePage/HowItWorks";

const About = () => {
  return (
    <>
      <Banner />
      {/* <div className="page-container mx-auto px-4 py-8 container flex items-center justify-center flex-col lg:gap-4 gap-2">
        <Highlighter highlight={`All Personas`} />
        <p className="lg:text-2xl text-[16px] text-center sora-light text-[#060606] w-full">
          Search suitable Personas for Meetings
        </p>
        <h1 className="lg:text-6xl text-3xl text-center text-[#060606] m-plus-rounded-1c-regular">
          Persona Search Filters
        </h1>
      </div> */}
      {/* <QuickSearch /> */}
      <HowItWorks offPollygon={true} />
      <MeetPerfectPersona />
    </>
  );
};

export default About;
