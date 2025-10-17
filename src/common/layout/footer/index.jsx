import React from "react";
import whiteLogoNoBackground from "../../../../public/assets/images/RealSales-official-logo/For Web/png/White logo - no background.png";
import Image from "next/image";
import CommonButton from "../../../common/commonButton";
import ArrowRight from "../../../../public/assets/icons/arrowRight";
import Link from "next/link";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import whatsapp from "../../../../public/assets/icons/whatsapp.svg";
import facebook from "../../../../public/assets/icons/facebook.svg";
import instagram from "../../../../public/assets/icons/instagram.svg";
import copyright from "../../../../public/assets/icons/copyright.svg";
import { DemoMeetingValue } from "../../../redux/OpenModal";
import { useDispatch } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useCalendly } from "../../../common/CalendlyWidget";

const Footer = () => {
  const dispatch = useDispatch();
  const { openCalendlyPopup } = useCalendly();

  const LinksArr = [
    {
      heading: "Get Started",
      links: [
        { name: "Home", link: "/" },
        { name: "About Us", link: "/about" },
        { name: "Our Services", link: "/our-services" },
        { name: "Chatbot Services", link: "/chatbot-services" },
        { name: "Resources", link: "/resources" },
      ],
    },
    {
      heading: "Our Products",
      links: [
        { name: "AI Audio", link: "/ai-audio" },
        { name: "AI Video", link: "/ai-chatbot" },
        { name: "AI Chatbot", link: "/ai-chatbot" },
        { name: "Automation", link: "/automation" },
        { name: "Free Consulting", link: "/free-consulting" },
      ],
    },
    {
      heading: "Useful Links",
      links: [
        { name: "Our Mission", link: "/our-mission" },
        { name: "Our Vision", link: "/our-Vision" },
        { name: "Our Teams", link: "/our-teams" },
        { name: "Custom AI", link: "/custom-ai" },
      ],
    },
    {
      // heading: "Contact Us",
      links: [
        // { name: "Privacy Policy", link: "/privacy-policy" },
        // { name: "Terms & Conditions", link: "/terms-conditions" },
        { name: "FAQ's", link: "/faq" },
        { name: "Pricing", link: "/pricing" },
        // { name: "Contact Us", link: "/contact-us" },
        // { name: "Register", link: "/register" },
      ],
    },
  ];

  const FooterLinks = ({ heading, linkArr }) => {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-white m-plus-rounded-1c-medium text-[15px]">
          {heading}
        </h1>
        {linkArr?.map((v, i) => (
          <Link
            key={i}
            href={v?.link}
            className="group hover:text-[#FFDE5A] text-[#FFFFFF] text-[12px] sora-regular flex items-center gap-2"
          >
            <div className="border border-solid group-hover:border-[#FFE942] border-[#FFFFFF] rounded-full w-fit h-fit p-0.5">
              <div className="border border-solid group-hover:border-[#FFE942] border-[#FFFFFF] rounded-full w-fit h-fit p-1"></div>
            </div>
            {v?.name}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-6.png)] bg-cover bg-center bg-no-repeat">
        <div className="w-full h-full bg-[#060606E5]">
          <div className="page-container mx-auto container px-4 py-10 flex lg:flex-row flex-col lg:gap-[5%] gap-8 items-start">
            <div className="lg:w-[100%] w-full flex flex-col items-start gap-4">
              <Image
                src={whiteLogoNoBackground}
                alt="whiteLogoNoBackground"
                className="h-10 w-auto"
              />
              <p className="text-white m-plus-rounded-1c-regular text-[14px]">
                RealSales is an AI-powered Sales Accelerator Platform that gives
                sales teams and managers real-time visibility into sales
                capability and team maturity—enabling continuous, on-the-job
                coaching and performance improvement through realistic
                simulations and live interactions with real-word buyer
                personas.​
              </p>
              <div className="flex flex-row items-center gap-4 flex-wrap">
                <CommonButton
                  onClick={openCalendlyPopup}
                  className={`!border-[2px] !border-[#FFDE5A] !text-[#FFDE5A] 
      !px-4 sm:!px-5 
      !py-1 
      !text-[13px] sm:!text-[15px] 
      flex !items-center gap-2 h-fit whitespace-nowrap`}
                  buttontext={
                    <p className="m-plus-rounded-1c-light">Book a Demo</p>
                  }
                  icon={
                    <ArrowRight stroke={`#FFDE5A`} width={18} height={12} />
                  }
                />

                <button
                  onClick={() =>
                    window.open("mailto:contact@real-sales.com", "_blank")
                  }
                  className="bg-[#FFDE5A] text-[#060606] 
      px-5 sm:px-7.5 
      py-1 
      text-[15px] sm:text-[18px] 
      m-plus-rounded-1c-bold border-2 border-[#FFDE5A] rounded 
      flex items-center justify-center gap-2 h-fit 
      hover:bg-[#FFE942] transition-colors duration-200 whitespace-nowrap"
                >
                  CONTACT US
                </button>
              </div>
            </div>
            <div className="lg:w-[65%] w-full">
              {/* <div className="flex items-start justify-between flex-wrap lg:gap-4 gap-8 px-4 pb-6">
                <FooterLinks
                  heading={LinksArr[0]?.heading}
                  linkArr={LinksArr[0]?.links}
                />
                <FooterLinks
                  heading={LinksArr[1]?.heading}
                  linkArr={LinksArr[1]?.links}
                />
                <FooterLinks
                  heading={LinksArr[2]?.heading}
                  linkArr={LinksArr[2]?.links}
                />
               </div> */}
              {/* <hr className="border-[#FFFFFF99] w-full" /> */}
              <div className="flex items-start justify-start px-4 pt-10 flex-wrap lg:gap-30 gap-10">
                <FooterLinks
                  heading={LinksArr[3]?.heading}
                  linkArr={LinksArr[3]?.links}
                />
                <div className="flex flex-col gap-4 -mt-0.5">
                  <h1 className="text-white m-plus-rounded-1c-medium text-[15px]">
                    {/* Address info. */}
                  </h1>
                  {/* <Link
                    href={`https://maps.app.goo.gl/CiWCu9wTthRDfeex5`}
                    target="_blank"
                    className="flex items-center gap-2 text-white group hover:text-[#FFE942]"
                  >
                    <LocationOnOutlinedIcon />
                    <p className="text-[11px] sora-regular">
                      Address:
                      <br />
                      <span className="text-[110%]">29, ABC Street, USA</span>
                    </p>
                  </Link>
                  <Link
                    href={`tel:+123 1234567890`}
                    className="flex items-center gap-2 text-white group hover:text-[#FFE942]"
                  >
                    <CallIcon />
                    <p className="text-[11px] sora-regular">
                      Mobile no.:
                      <br />
                      <span className="text-[110%]">+123 1234567890</span>
                    </p>
                  </Link> */}
                  <Link
                    href={`mailto:contact@real-sales.com​`}
                    className="flex items-center gap-2 text-white group hover:text-[#FFE942]"
                  >
                    <EmailIcon />
                    <p className="text-[11px] sora-regular">
                      Email:
                      <br />
                      <span className="text-[110%]">
                        contact@real-sales.com​
                      </span>
                    </p>
                  </Link>
                </div>
                {/* <div className="h-full flex md:flex-col flex-row items-end justify-between gap-15">
                  <div className="flex flex-col items-center gap-4">
                    <h1 className="text-white m-plus-rounded-1c-medium text-[15px]">
                      Follow Us on:
                    </h1>
                    <div className="flex items-center gap-4">
                      <Link href={`#`}>
                        <Image
                          src={facebook}
                          alt="facebook"
                          className="h-9 w-9"
                        />
                      </Link>
                      <Link href={`#`}>
                        <Image
                          src={instagram}
                          alt="instagram"
                          className="h-9 w-9"
                        />
                      </Link>
                      <Link href={`#`}>
                        <Image
                          src={whatsapp}
                          alt="whatsapp"
                          className="h-9 w-9"
                        />
                      </Link>
                    </div>
                  </div>
                  <div
                    onClick={()=> window.scrollTo(0, 0)}
                    className="bg-[#FFDE5A] rounded-[5px] px-2.5 pb-1.5 pt-4 cursor-pointer"
                  >
                    <ArrowBackIosIcon className="rotate-90" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-header sticky top-0 z-50 bg-[#FFDE5A] lg:py-4 py-2 flex justify-center">
        <div className="flex items-center gap-2 lg:gap-1">
          <span className="text-[#060606] lg:text-[20px] text-[16px] relative -top-[2px]">
            &copy;
          </span>
          <span className="text-[#060606] lg:text-[16px] text-[12px] sora-regular">
            Copyright 2025 -&nbsp;
            <span className="sora-semibold">Real-Sales.com.</span>&nbsp;All
            Rights Reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
