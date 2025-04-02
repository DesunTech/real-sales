import Image from "next/image";
import bgImage from "../../../public/assets/images/RealSales-backgrounds/bg-3.png";
import bannerImg from "../../../public/assets/images/banner/BANNER-IMG.png";
import BookAdemo from "../../common/bookAdemo";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CommonButton from "../../common/commonButton";
import ArrowRight from "../../../public/assets/icons/arrowRight";

const Banner = () => {
  return (
    // <div className="relative h-[calc(100vh-70px)]">
    <div className="relative h-full">
      <Image
        src={bgImage}
        alt="bgImage"
        width={1920}
        height={1080}
        className="w-full h-full"
      />
      <div className="absolute top-[0] w-full h-full">
        <div className="page-container mx-auto px-4 py-8 container flex justify-between gap-[5%]">
          <div className="w-1/2 flex flex-col items-start justify-between">
            <div className="flex flex-col gap-4">
              <p className="text-[16px] text-[#060606] sora-regular">
                RealSales accelerate
                <br />
                your sales team performance
              </p>
              <h1 className="text-4xl text-[#060606E5] m-plus-rounded-1c-regular">
                Welcome to
                <br />
                <span className="text-[200%]">REALSALES AI</span>
              </h1>
              <hr className="border-[#06060640] mr-[8%] mb-1 mt-2" />
              <p className="text-[40px] text-[#060606E5] m-plus-rounded-1c-regular">
                Supercharging your sales
                <br />
                teams with AI-Driven Selling
              </p>
            </div>

            <div className="flex items-center gap-4">
              <BookAdemo
                className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit`}
                icon={<AddIcCallIcon style={{ fontSize: "16px" }} />}
              />
              <div className="border-r-[2px] border-dashed border-[#000000] h-15"/>
              <CommonButton
                className={`!border-[2px] !border-[#060606] !text-[#060606] !px-5 !py-1 !text-[15px] flex !items-center gap-2 h-fit`}
                buttontext={"TRY REALSALES"}
                icon={<ArrowRight width={19} height={13} />}
              />
            </div>
          </div>
          <div className="w-[45%]">
            <Image src={bannerImg} alt="bannerImg" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
