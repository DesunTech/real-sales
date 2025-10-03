import React from "react";
import Banner from "./Banner";
import About from "./About";
import AboutUs from "./AboutUs";
import PersonaFeatures from "./PersonaFeatures";
import QuickSearch from "./QuickSearch";
import UserReviews from "./UserReviews";
import HowItWorks from "./HowItWorks";

const HomePage = () => {
  return (
    <>
      <Banner />
      {/* <About /> */} {/* working on this component */}
      <AboutUs />
      <PersonaFeatures />
      {/* <QuickSearch /> */}
      <UserReviews />
      {/* <HowItWorks /> */}
    </>
  );
};

export default HomePage;
