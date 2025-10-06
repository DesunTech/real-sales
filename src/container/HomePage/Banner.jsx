import Image from "next/image";
import attachment7 from "../../../public/assets/images/banner/attachment7.png";
import bannerImg from "../../../public/assets/images/banner/BANNER-IMG.png";
import bannerImg2 from "../../../public/assets/images/banner/BANNER-IMG2.png";
import aboutBanner from "../../../public/assets/images/banner/about-banner.png";
import bannersub_img from ".././../../public/assets/images/banner/bannersub-img.png";
import BookAdemo from "../../common/bookAdemo";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CommonButton from "../../common/commonButton";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import { useDispatch } from "react-redux";
import { DemoMeetingValue, TryRealsalesValue } from "../../redux/OpenModal";
import bannerBottom1 from "../../../public/assets/images/banner/bannerBottom1.png";
import bannerBottom2 from "../../../public/assets/images/banner/bannerBottom2.png";
import bannerBottom3 from "../../../public/assets/images/banner/bannerBottom3.png";
import bannerBottom4 from "../../../public/assets/images/banner/bannerBottom4.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Banner = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const doTryRealSale = () => {
    const userId = localStorage.getItem("user");
    if (userId && userId !== "") {
      router.push("/pricing");
    } else {
      dispatch(TryRealsalesValue(true));
    }
  };

  const bannerBottomCardRoot =
    "w-full flex gap-4 p-4 rounded-[20px] bg-[url(../../public/assets/images/banner/bannerBottomBg.png)] bg-cover bg-center bg-no-repeat";
  const bannerBottomCardp1 = "m-plus-rounded-1c-light text-white text-[18px]";
  const bannerBottomCardp2 =
    "m-plus-rounded-1c-regular text-[#FFFFFFE5] text-[22px]";
  const bannerBottomCardp3 = "sora-regular text-white text-[14px]";
  const bannerBottomCardImage = "w-[80px] h-[110px]";

  return (
    <div className="relative h-full">
      <div className="flex flex-col w-full h-full">
        {/* top section */}
        <div className="py-8 bg-[url(../../public/assets/images/RealSales-backgrounds/bg-3.png)] bg-cover bg-center bg-no-repeat">
          <div className="page-container mx-auto px-4 container flex lg:flex-row flex-col-reverse items-center justify-center gap-8">
            {/* LEFT SIDE (Text Section) */}
            <div className="lg:w-1/2 w-full flex flex-col lg:items-start items-center justify-center gap-6">
              <div
                data-aos="fade-right"
                className="flex flex-col lg:gap-4 gap-2 w-full"
              >
                <h1 className="lg:text-4xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular text-center lg:text-left">
                  Supercharge your Sales Team with
                  <br />
                  <span className="lg:text-[180%] text-[130%] m-plus-rounded-1c-medium capitalize">
                    Realsales AI
                  </span>
                </h1>
              </div>

              <div
                data-aos="fade-left"
                className="flex md:flex-row flex-col items-center gap-4 w-full justify-center lg:justify-start"
              >
                <BookAdemo
                  onClick={() => dispatch(DemoMeetingValue(true))}
                  className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit lg:w-fit w-full`}
                  icon={<AddIcCallIcon style={{ fontSize: "16px" }} />}
                />
                <div className="lg:flex hidden border-r-[2px] border-dashed border-[#000000] h-15" />
                <CommonButton
                  onClick={() => doTryRealSale()}
                  className={`!border-[2px] !border-[#060606] !text-[#060606] !lg:px-5 !px-3 !lg:py-1 !py-0.5 !text-[15px] flex !items-center gap-2 h-fit lg:w-fit w-full`}
                  buttontext={"TRY REALSALES"}
                  icon={<ArrowRight width={19} height={13} />}
                />
              </div>
            </div>

            {/* RIGHT SIDE (Image Section) */}
            <div
              data-aos="fade-down"
              className="lg:w-[45%] w-full flex justify-center items-center"
            >
              <Image
                src={aboutBanner}
                alt="bannerImg"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* bottom section */}
        {/* <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-3o.png)] bg-cover bg-center bg-no-repeat">
          <div className="page-container mx-auto px-4 container flex lg:flex-row flex-col items-center justify-between gap-10">
            <div
              data-aos="fade-right"
              className="lg:w-[55%] w-full flex md:flex-row flex-col-reverse md:items-start items-center justify-center gap-4"
            >
              <div className="flex flex-col gap-4 w-full">
                <div className={`${bannerBottomCardRoot}`}>
                  <Image
                    src={bannerBottom1}
                    alt="bannersub_img"
                    width={1920}
                    height={1080}
                    className={`${bannerBottomCardImage}`}
                  />
                  <div>
                    <p className={`${bannerBottomCardp1}`}>Track Sales</p>
                    <p className={`${bannerBottomCardp2}`}>
                      Access & Track Maturity
                    </p>
                    <p className={`${bannerBottomCardp3}`}>
                      Of Sales Team/ Sales Org.
                    </p>
                  </div>
                </div>
                <div className={`${bannerBottomCardRoot}`}>
                  <Image
                    src={bannerBottom2}
                    alt="bannersub_img"
                    width={1920}
                    height={1080}
                    className={`${bannerBottomCardImage}`}
                  />
                  <div>
                    <p className={`${bannerBottomCardp1}`}>Make Performance</p>
                    <p className={`${bannerBottomCardp2}`}>
                      Best Practices & Easy Win
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col items-center">
                  <h1 className="text-[#060606CC] text-6xl m-plus-rounded-1c-medium">
                    RealSales
                  </h1>
                  <p className="text-[#060606CC] text-[28px] sora-regular text-center">
                    Comprehensive Solution
                  </p>
                </div>
                <div className={`${bannerBottomCardRoot}`}>
                  <Image
                    src={bannerBottom3}
                    alt="bannersub_img"
                    width={1920}
                    height={1080}
                    className={`${bannerBottomCardImage}`}
                  />
                  <div>
                    <p className={`${bannerBottomCardp1}`}>Sales Accelerator</p>
                    <p className={`${bannerBottomCardp2}`}>
                      Accelerate Onboarding
                    </p>
                  </div>
                </div>
                <div className={`${bannerBottomCardRoot}`}>
                  <Image
                    src={bannerBottom4}
                    alt="bannersub_img"
                    width={1920}
                    height={1080}
                    className={`${bannerBottomCardImage}`}
                  />
                  <div>
                    <p className={`${bannerBottomCardp1}`}>
                      Real Coaching Trainer
                    </p>
                    <p className={`${bannerBottomCardp2}`}>
                      Effective Coaching
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="p-8 lg:w-[45%] w-full bg-[url(../../public/assets/images/RealSales-abstracts/about-net.png)] bg-cover bg-center bg-no-repeat"
            >
              <div className="flex flex-col items-start gap-4">
                <h1 className="lg:text-4xl text-2xl text-[#060606] m-plus-rounded-1c-regular">
                  What
                  <br />
                  <span className="lg:text-[200%] text-[150%]">WE DO?</span>
                </h1>
                <p className="text-[16px] text-[#060606] sora-regular">
                  RealSales is an industry-focuses
                  <br />
                  Sales Accelerator platform
                </p>
                <p className="lg:text-[34px] text-[20px] text-[#060606] m-plus-rounded-1c-regular">
                  "We accelerate sales teams performance by leading them beyond
                  traditional and costly training approach."
                </p>
                <div className="border-l-4 border-[#060606B2] bg-[linear-gradient(90deg,#FFF5CD_0%,rgba(255,222,90,0)_63.5%)] py-4 px-6">
                  <h2 className="lg:text-[15px] text-[12px] text-[#060606] sora-semibold">
                    Our Al-powered interactive platform helps sales teams to go
                    beyond the pitch and master the art of connection,
                    cross-selling, and deal- closing. Developing real sales
                    skills in real- world scenarios...
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <section className="relative bg-[url('../../public/assets/images/RealSales-backgrounds/bg-3o.png')] bg-cover bg-center bg-no-repeat py-20">
          <div className="container mx-auto px-6 flex flex-col items-center">
            {/* Heading */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-center max-w-3xl mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#060606] leading-snug">
                Beyond Traditional{" "}
                <span className="text-[#060606] underline decoration-[#FFE66D] underline-offset-8">
                  Sales Training
                </span>
              </h2>
              <p className="mt-6 text-lg text-[#060606CC] sora-regular">
                <span className="font-bold">RealSales</span> is an
                industry-tailored solution for sales organizations that want to
                improve performance and increase revenue.
              </p>
            </div>

            {/* Content */}
            <div className="grid lg:grid-cols-2 gap-16 w-full max-w-6xl">
              {/* For Sales Managers */}
              <div data-aos="fade-right" className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-[#060606] relative inline-flex items-center">
                  <span className="bg-[#FFE66D] px-3 py-1.5 rounded-md leading-none align-middle">
                    RealSales for Sales Managers
                  </span>
                </h3>

                <ul className="space-y-4 text-[#060606] text-lg leading-relaxed">
                  <li>
                    ✔️ Assess Team Capabilities & Identify development areas
                  </li>
                  <li>✔️ Accelerate new reps onboarding</li>
                  <li>
                    ✔️ Improve team performance (win-rate, cross-selling,
                    value-selling)
                  </li>
                  <li>
                    ✔️ Track progress with access to performance dashboard
                  </li>
                </ul>
              </div>

              {/* For Sales Reps */}
              <div data-aos="fade-left" className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-[#060606] relative inline-block">
                  <span className="bg-[#FFE66D] px-3 py-1 rounded-md">
                    RealSales for Sales Reps
                  </span>
                </h3>
                <ul className="space-y-4 text-[#060606] text-lg leading-relaxed">
                  <li>✔️ Improve sales skills in real-world scenarios</li>
                  <li>✔️ Access live sales coaching</li>
                  <li>
                    ✔️ Go beyond sales pitch by mastering cross-selling &
                    deal-closing
                  </li>
                  <li>
                    ✔️ Track progress with a personal performance dashboard
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Banner;
