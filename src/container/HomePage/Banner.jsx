import Image from "next/image";
import attachment7 from "../../../public/assets/images/banner/attachment7.png";
import bannerImg from "../../../public/assets/images/banner/BANNER-IMG.png";
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
  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let useerId = localStorage.getItem("user");
      if (useerId) {
        setUser_id(useerId);
      }
    }
  }, []);

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
          <div className="page-container mx-auto px-4 container flex lg:flex-row flex-col-reverse items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full flex flex-col lg:items-start items-center justify-between gap-4">
              <div
                data-aos="fade-right"
                className="flex flex-col lg:gap-4 gap-2 w-full"
              >
                <p className="text-[16px] text-[#060606] sora-regular">
                  RealSales accelerate
                  <br />
                  your sales team performance
                </p>
                <h1 className="lg:text-4xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular">
                  Welcome to
                  <br />
                  <span className="lg:text-[180%] text-[130%] m-plus-rounded-1c-medium capitalize">
                    Realsales AI
                  </span>
                </h1>
                <hr className="border-[#06060640] mr-[8%] lg:mb-1 mb-0 lg:mt-2 mt-0" />
                <p className="lg:text-[40px] text-[20px] text-[#060606E5] m-plus-rounded-1c-regular">
                  Supercharging your sales
                  <br />
                  teams with AI-Driven Selling
                </p>
              </div>

              <div
                data-aos="fade-left"
                className="flex md:flex-row flex-col items-center gap-4 w-full"
              >
                <BookAdemo
                  onClick={() => dispatch(DemoMeetingValue(true))}
                  className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit lg:w-fit w-full`}
                  icon={<AddIcCallIcon style={{ fontSize: "16px" }} />}
                />
                <div className="lg:flex hidden border-r-[2px] border-dashed border-[#000000] h-15" />
                <CommonButton
                  onClick={() => {
                    if (user_id !== "") {
                      router.push("/pricing");
                    } else {
                      dispatch(TryRealsalesValue(true));
                    }
                  }}
                  className={`!border-[2px] !border-[#060606] !text-[#060606] !lg:px-5 !px-3 !lg:py-1 !py-0.5 !text-[15px] flex !items-center gap-2 h-fit lg:w-fit w-full`}
                  buttontext={"TRY REALSALES"}
                  icon={<ArrowRight width={19} height={13} />}
                />
              </div>
            </div>
            <div data-aos="fade-down" className="lg:w-[45%] w-full">
              <Image src={bannerImg} alt="bannerImg" />
            </div>
          </div>
        </div>

        {/* bottom section */}
        <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-3o.png)] bg-cover bg-center bg-no-repeat">
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
                    {/* <p className={`${bannerBottomCardp3}`}>Of Sales Team/ Sales Org.</p> */}
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
                    {/* <p className={`${bannerBottomCardp3}`}>Of Sales Team/ Sales Org.</p> */}
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
                    {/* <p className={`${bannerBottomCardp3}`}>Of Sales Team/ Sales Org.</p> */}
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
        </div>
      </div>
    </div>
  );
};
export default Banner;
