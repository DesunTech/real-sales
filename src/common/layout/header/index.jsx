import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Colorlogonobackground from "../../../../public/assets/images/RealSales-official-logo/For Web/png/Color logo - no background.png";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import BookAdemo from "../../../common/bookAdemo";
import { useRouter } from "next/router";
import persona_plant from "../../../../public/assets/images/RealSales-user-images/persona-plant.png";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import DemoMeeting from "../../modals/DemoMeeting";
import { useDispatch } from "react-redux";
import { DemoMeetingValue } from "../../../redux/OpenModal";
import TryRealsales from "../../modals/TryRealsales";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openIndustry, setOpenIndustry] = useState(false);

  console.log(openIndustry, "openIndustry");
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="main-header sticky top-0 z-50 bg-[#060606] h-[70px]">
      <div className="page-container mx-auto px-4 container">
        <nav className="main-nav flex justify-between items-center py-4">
          <Link href="/" className="logo">
            <Image
              src={Colorlogonobackground}
              alt="RealSales Logo"
              width={150}
              height={50}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="header-links hidden md:block">
            <ul className="flex space-x-6">
              <div>
                <Link
                  href="/"
                  className={`text-white leading-1 hover:underline ${
                    router?.pathname === "/" ? `underline` : ``
                  }`}
                >
                  Home
                </Link>
              </div>
              <div>
                <Link
                  href="/about"
                  className={`text-white leading-1 hover:underline ${
                    router?.pathname === "/about" ? `underline` : ``
                  }`}
                >
                  About
                </Link>
              </div>
              <div className="relative">
                <Link
                  href="#"
                  onClick={() => setOpenIndustry(!openIndustry)}
                  className={`text-white leading-1`}
                >
                  Industries&nbsp;
                  <ArrowDropDownOutlinedIcon
                    className={`${
                      openIndustry ? `rotate-0` : `rotate-180`
                    } transform duration-300`}
                  />
                </Link>
                {openIndustry ? (
                  <Link
                    href={`#`}
                    className="absolute flex items-start justify-between top-12 bg-[#FFFFFFCC] shadow-lg p-4 w-[280%]"
                  >
                    <Image
                      src={persona_plant}
                      alt="persona_plant"
                      width={96}
                      className="w-24 h-auto !max-w-auto"
                    />
                    <div className="flex flex-col items-start gap-4">
                      <div>
                        <p>Industry</p>
                        <div className="flex items-center gap-2.5">
                          <hr className="w-16 border border-black" />
                          <div className="h-2.5 w-2.5 bg-black rotate-45" />
                        </div>
                      </div>
                      <p>Food & Beverage</p>
                    </div>
                  </Link>
                ) : null}
              </div>
              <div>
                <Link
                  href="/faq"
                  className={`text-white leading-1 hover:underline ${
                    router?.pathname === "/faq" ? `underline` : ``
                  }`}
                >
                  FAQ
                </Link>
              </div>
            </ul>
          </div>

          {/* Call to Action Buttons */}
          <div className="header-btn hidden md:flex items-center space-x-4">
            <BookAdemo
              onClick={() => dispatch(DemoMeetingValue(true))}
              icon={<AddIcCallIcon style={{ fontSize: "16px" }} />}
            />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-toggle md:hidden" onClick={toggleMobileMenu}>
            <span className="menu-bar block w-6 h-0.5 bg-white my-1"></span>
            <span className="menu-bar block w-6 h-0.5 bg-white my-1"></span>
            <span className="menu-bar block w-6 h-0.5 bg-white my-1"></span>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu fixed top-0 left-0 w-full h-full bg-[#060606] z-50">
              <div className="flex justify-between p-4">
                <Image
                  src={Colorlogonobackground}
                  alt="RealSales Logo"
                  width={120}
                  height={40}
                />
                <button
                  onClick={toggleMobileMenu}
                  className="text-2xl text-white"
                >
                  &times;
                </button>
              </div>
              <ul className="px-4">
                <li className="py-2 border-b text-white">
                  <Link href="/">Home</Link>
                </li>
                <li className="py-2 border-b text-white">
                  <Link href="/about">About</Link>
                </li>
                <li className="py-2 border-b text-white">
                  <Link href="#">Industries</Link>
                </li>
                <li className="py-2 border-b text-white">
                  <Link href="/faq">FAQ</Link>
                </li>
                <li className="py-4">
                  <BookAdemo
                    link={`#`}
                    onClick={() => dispatch(DemoMeetingValue(true))}
                    icon={<AddIcCallIcon style={{ fontSize: "16px" }} />}
                  />
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
