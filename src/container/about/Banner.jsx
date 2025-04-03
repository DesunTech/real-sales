 import Image from "next/image";
import aboutBanner from "../../../public/assets/images/banner/about-banner.png";

const Banner = () => {
  return (
    <div className="relative h-full bg-[url(../../public/assets/images/RealSales-backgrounds/bg-3.png)] bg-cover bg-center bg-no-repeat">
      <div className="page-container mx-auto px-4 py-8 container flex flex-col gap-16 w-full h-full">
        <div className="flex lg:flex-row flex-col items-center justify-between gap-8">
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
          <div className="lg:w-[50%] w-full flex items-center justify-center">
            <Image
              src={aboutBanner}
              alt="aboutBanner"
              width={1920}
              height={1080}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
