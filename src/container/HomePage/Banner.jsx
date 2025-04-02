import Image from "next/image";
import attachment7 from "../../../public/assets/images/banner/attachment7.png";
import bannerImg from "../../../public/assets/images/banner/BANNER-IMG.png";
import BookAdemo from "../../common/bookAdemo";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CommonButton from "../../common/commonButton";
import ArrowRight from "../../../public/assets/icons/arrowRight";

const Banner = () => {
  return (
    <div className="relative h-full bg-[url(../../public/assets/images/RealSales-backgrounds/bg-3.png)] bg-cover bg-center bg-no-repeat">
    
      <div className="page-container mx-auto px-4 py-8 container flex flex-col gap-16 w-full h-full">
        <div className="flex lg:flex-row flex-col-reverse items-center justify-between gap-8">
          <div className="lg:w-1/2 w-full flex flex-col lg:items-start items-center justify-between gap-4">
            <div className="flex flex-col gap-4">
              <p className="text-[16px] text-[#060606] sora-regular">
                RealSales accelerate
                <br />
                your sales team performance
              </p>
              <h1 className="lg:text-4xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular">
                Welcome to
                <br />
                <span className="lg:text-[200%] text-[150%]">REALSALES AI</span>
              </h1>
              <hr className="border-[#06060640] mr-[8%] mb-1 mt-2" />
              <p className="lg:text-[40px] text-[20px] text-[#060606E5] m-plus-rounded-1c-regular">
                Supercharging your sales
                <br />
                teams with AI-Driven Selling
              </p>
            </div>

            <div className="flex lg:flex-row flex-col items-center gap-4">
              <BookAdemo
                className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit`}
                icon={<AddIcCallIcon style={{ fontSize: "16px" }} />}
              />
              <div className="lg:flex hidden border-r-[2px] border-dashed border-[#000000] h-15" />
              <CommonButton
                className={`!border-[2px] !border-[#060606] !text-[#060606] !lg:px-5 !px-3 !lg:py-1 !py-0.5 !text-[15px] flex !items-center gap-2 h-fit`}
                buttontext={"TRY REALSALES"}
                icon={<ArrowRight width={19} height={13} />}
              />
            </div>
          </div>
          <div className="lg:w-[45%] w-full">
            <Image src={bannerImg} alt="bannerImg" />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col items-center justify-between gap-8">
          <div className="lg:w-[40%] w-full flex items-center justify-center">
            <Image
              src={attachment7}
              alt="attachment7"
              width={1920}
              height={1080}
              className="w-full h-full"
            />
          </div>
          <div className="lg:w-[50%] w-full">
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
                  cross-selling, and deal- closing. Developing real sales skills
                  in real- world scenarios...
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
