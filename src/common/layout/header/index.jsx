import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Colorlogonobackground from "../../../../public/assets/images/RealSales-official-logo/For Web/png/Color logo - no background.png";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import BookAdemo from "../../../common/bookAdemo";
import { useRouter } from "next/router";
import persona_plant from "../../../../public/assets/images/RealSales-user-images/persona-plant.png";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import DemoMeeting from "../../modals/DemoMeeting";
import { useDispatch, useSelector } from "react-redux";
import { DemoMeetingValue, TryRealsalesValue } from "../../../redux/OpenModal";
import TryRealsales from "../../modals/TryRealsales";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogout } from "../../../hooks/useLogout";
import { AddAuth, AddUser } from "../../../redux/AuthReducer";
import { ClickAwayListener } from "@mui/material";
import { useApi } from "../../../hooks/useApi";
import { apis } from "../../../utils/apis";
import { useCalendly } from "../../../common/CalendlyWidget";

const Header = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.auth);
  const { Get } = useApi();
  const { openCalendlyPopup } = useCalendly();
  const { auth_me } = apis;

  let [user, setUser] = useState({});
  const [industriesSubmenuOpen, setIndustriesSubmenuOpen] = useState(false);

  useEffect(() => {
    const GetUser = async () => {
      try {
        let data = await Get(auth_me);
        if (data?.role) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.log(error, "error");
      }
    };
    if (token) {
      GetUser();
    }
  }, [token]);

  console.log(user?.role?.name, "__user__");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openIndustry, setOpenIndustry] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="main-header sticky top-0 z-50 bg-[#060606] h-[60px] flex items-center justify-center">
      <div className="page-container mx-auto px-4 container">
        <nav className="main-nav flex justify-between items-center ">
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
            <ul className="flex lg:gap-16 gap-8">
              <div>
                <Link
                  href="/"
                  className={`text-white leading-1 border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300 ${
                    router?.pathname === "/" ? `nav-underline-yellow` : ""
                  }`}
                >
                  Home
                </Link>
              </div>
              <div>
                <Link
                  href="/about"
                  className={`text-white leading-1 border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300 ${
                    router?.pathname === "/about" ? `nav-underline-yellow` : ``
                  }`}
                >
                  About
                </Link>
              </div>
              <div className="relative">
                {/* Container that keeps dropdown open on hover */}
                <div className="group inline-block relative">
                  {/* Main Link */}
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()} // prevents navigation
                    className={`text-white leading-1 border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300 ${
                      router?.pathname === "/industries"
                        ? `nav-underline-yellow`
                        : ``
                    }`}
                  >
                    Case Study & Industries
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className="absolute left-0 top-full mt-2 w-48 bg-[#060606] rounded shadow-lg opacity-0 invisible 
                 group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                    style={{ transitionDelay: "0.15s" }} // keeps dropdown visible a little longer
                  >
                    <Link
                      href="/industries/food-equipments"
                      className="block px-4 py-2 text-white hover:bg-[#FFDE5A] hover:text-[#060606] transition-colors duration-200"
                    >
                      Food & Beverage Equipment
                    </Link>
                    <Link
                      href="/industries/industry2"
                      className="block px-4 py-2 text-white hover:bg-[#FFDE5A] hover:text-[#060606] transition-colors duration-200 cursor-not-allowed"
                    >
                      Healthcare -{" "}
                      <span className="text-gray-400 italic">coming soon</span>
                    </Link>

                    {/* <Link
        href="/industries/industry3"
        className="block px-4 py-2 text-white hover:bg-[#FFDE5A] hover:text-[#060606] transition-colors duration-200"
      >
        Industry 3
      </Link> */}
                  </div>
                </div>
              </div>

              {/* <div className="relative">
                <ClickAwayListener onClickAway={() => setOpenIndustry(false)}>
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
                </ClickAwayListener>

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
              </div> */}
              {/* <div>
                <Link
                  href="/pricing"
                  className={`text-white leading-1 border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300 ${
                    router?.pathname === "/pricing" ? `nav-underline-yellow` : ``
                  }`}
                >
                  Pricing
                </Link>
              </div> */}
              <div>
                <Link
                  href="/faq"
                  className={`text-white leading-1 border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300 ${
                    router?.pathname === "/faq" ? `nav-underline-yellow` : ``
                  }`}
                >
                  FAQ
                </Link>
              </div>
              {token !== "" ? (
                <div>
                  {user?.role?.name === "super_admin" ? (
                    <Link
                      href={`https://admin.real-sales.com?token=${token}`}
                      // target="_blank"
                      className={`text-white leading-1 hover:underline ${
                        router?.pathname === `/dashboard`
                          ? `nav-underline-yellow`
                          : ``
                      }`}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href={`https://dashboard.real-sales.com/overview?token=${token}`}
                      // target="_blank"
                      className={`text-white leading-1 hover:underline ${
                        router?.pathname === `/dashboard`
                          ? `nav-underline-yellow`
                          : ``
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                </div>
              ) : null}
            </ul>
          </div>
          {/* Call to Action Buttons */}
          <div className="header-btn hidden md:flex items-center space-x-4">
            {token !== "" ? (
              <div
                onClick={() => {
                  useLogout({ final: router.push("/") });
                  dispatch(AddAuth(""));
                  dispatch(AddUser({}));
                }}
                className="border border-solid border-white rounded p-0.5 px-4 cursor-pointer text-white"
              >
                <LogoutIcon className="text-white" />
                &nbsp;Logout
              </div>
            ) : (
              <div
                onClick={() => {
                  dispatch(TryRealsalesValue(true));
                }}
                className="border border-solid border-white rounded p-0.5 px-4 cursor-pointer text-white"
              >
                Signin&nbsp;/&nbsp;Signup
              </div>
            )}
            <BookAdemo
              className={`!text-[14px] !bg-[#FFDE5A] !text-[#060606] !border-white hover:!bg-[#FFDE5A] hover:-translate-y-0.5 transition-transform duration-200`}
              onClick={openCalendlyPopup}
              icon={<AddIcCallIcon style={{ fontSize: "16px" }} />}
            />
          </div>

          {/* Mobile Menu Toggle */}
          <div
            className="mobile-toggle md:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          >
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
                  className="text-2xl text-white cursor-pointer"
                >
                  &times;
                </button>
              </div>
              <ul className="px-4">
                <li className="py-2 border-b text-white">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li className="py-2 border-b text-white">
                  <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                    About
                  </Link>
                </li>
                <li className="py-2 border-b text-white">
                  <div
                    onClick={() =>
                      setIndustriesSubmenuOpen(!industriesSubmenuOpen)
                    }
                    className="flex justify-between items-center cursor-pointer select-none"
                  >
                    Case Study & Industries
                    <span
                      className={`transition-transform duration-300 ${
                        industriesSubmenuOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      ▼
                    </span>
                  </div>

                  {/* Smooth slide-down submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      industriesSubmenuOpen ? "max-h-40 mt-2" : "max-h-0"
                    }`}
                  >
                    <ul className="flex flex-col gap-2 ml-4">
                      <li>
                        <Link
                          href="/industries/food-equipments"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setIndustriesSubmenuOpen(false);
                          }}
                          className="text-white hover:text-yellow-400 transition-colors"
                        >
                          Food & Beverage Equipment
                        </Link>
                      </li>
                      <li>
                        <div className="text-gray-400 italic cursor-not-allowed">
                          Healthcare - coming soon
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* <li className="py-2 border-b text-white">
                  <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                    Pricing
                  </Link>
                </li> */}
                <li className="py-2 border-b text-white">
                  <Link href="/faq" onClick={() => setMobileMenuOpen(false)}>
                    FAQ
                  </Link>
                </li>
                {token !== "" ? (
                  <li className="py-2 border-b text-white">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : null}
                <li className="py-4 flex flex-col gap-4">
                  {token !== "" ? (
                    <div
                      onClick={() => {
                        useLogout({ final: router.push("/") });
                        dispatch(AddAuth(""));
                        dispatch(AddUser({}));
                      }}
                      className="border border-solid border-white rounded p-0.5 px-4 cursor-pointer text-white"
                    >
                      <LogoutIcon className="text-white" />
                      &nbsp;Logout
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        dispatch(TryRealsalesValue(true));
                      }}
                      className="border border-solid border-white rounded p-0.5 px-4 cursor-pointer text-white"
                    >
                      Signin&nbsp;/&nbsp;Signup
                    </div>
                  )}
                  <BookAdemo
                    link={`#`}
                    onClick={openCalendlyPopup}
                    className={`!bg-[#FFDE5A] !text-[#060606] !border-white hover:!bg-[#FFDE5A] hover:-translate-y-0.5 transition-transform duration-200`}
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
