import Image from "next/image";
import logo from "../../../public/images/realsales.png";

const Banner = () => {
  return (
    <div className="relative h-full bg-[url(../../public/assets/images/RealSales-backgrounds/bg-3.png)] bg-cover bg-center bg-no-repeat">
      <div className="page-container mx-auto px-4 py-8 container flex flex-col gap-16 w-full h-full">
        <div className="flex lg:flex-row flex-col items-center justify-between gap-8">
          {/* LEFT SIDE CONTENT */}
          <div data-aos="fade-right" className="lg:w-[50%] w-full">
            <div className="flex flex-col items-start gap-4">
              <h1 className="lg:text-4xl text-2xl text-[#060606] m-plus-rounded-1c-regular">
                About
                <br />
                <span className="lg:text-[200%] text-[150%]">RealSales</span>
              </h1>
              {/* <p className="text-[16px] text-[#060606] sora-regular">
                RealSales is an industry-focuses
                <br />
                Sales Accelerator platform
              </p> */}
              <p className="lg:text-[34px] text-[20px] text-[#060606] m-plus-rounded-1c-regular">
                "We accelerate sales teams performance by leading them beyond
                traditional and costly training approach."
              </p>
              {/* <div className="border-l-4 border-[#060606B2] bg-[linear-gradient(90deg,#FFF5CD_0%,rgba(255,222,90,0)_63.5%)] py-4 px-6">
                <h2 className="lg:text-[15px] text-[12px] text-[#060606] sora-semibold">
                  Our Al-powered interactive platform helps sales teams to go
                  beyond the pitch and master the art of connection,
                  cross-selling, and deal- closing. Developing real sales skills
                  in real- world scenarios...
                </h2>
              </div> */}
            </div>
          </div>

          {/* RIGHT SIDE CONTENT (CARDS UI) */}
        <div
  data-aos="fade-left"
  className="lg:w-[50%] w-full flex flex-col items-center justify-center gap-6 lg:pl-18"
>
  {/* LOGO */}
 <div className="flex flex-row items-center gap-2">
  <Image src={logo} alt="RealSales Logo" width={60} height={60} />
  <h1 className="text-2xl font-bold text-[#060606]">RealSales</h1>
</div>


  {/* 2x2 GRID CARDS */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
    <div className="bg-gray-200/20 shadow-lg rounded-lg p-6 text-center">
      <h2 className="font-semibold text-[#060606]">
        Industry-Specific AI Personas
      </h2>
      <p className="text-sm text-[#060606] mt-2">
        Competitors use generic AI role-play; we train AI personas on
        real buyer behavior per industry.
      </p>
    </div>
    <div className="bg-gray-200/20 shadow-lg rounded-lg p-6 text-center">
      <h2 className="font-semibold text-[#060606]">
        Focus on Cross-Selling & Upselling
      </h2>
      <p className="text-sm text-[#060606] mt-2">
        Most tools train on basic sales, but RealSales helps reps
        handle complex portfolios and …
      </p>
    </div>
    <div className="bg-gray-200/20 shadow-lg rounded-lg p-6 text-center">
      <h2 className="font-semibold text-[#060606]">
        Real-World Prospecting, Not Just Coaching
      </h2>
      <p className="text-sm text-[#060606] mt-2">
        Competitors refine scripts; we simulate real prospecting,
        sales, and closing with industry data.
      </p>
    </div>
    <div className="bg-gray-200/20 shadow-lg rounded-lg p-6 text-center">
      <h2 className="font-semibold text-[#060606]">
        AI-Adaptive Learning for Each Rep
      </h2>
      <p className="text-sm text-[#060606] mt-2">
        Our platform adapts to each rep’s skills, ensuring growth
        through real-world objections.
      </p>
    </div>
  </div>

  {/* BOTTOM FULL-WIDTH CARD */}
  <div className="bg-gray-200/20 shadow-lg rounded-lg p-6 text-center w-full">
    <h2 className="font-bold text-[#060606]">
      More Than Training – A Revenue Acceleration Tool
    </h2>
    <p className="text-sm text-[#060606] mt-2">
      While competitors emphasize "training," we accelerate sales
      maturity – helping companies onboard reps faster, increase
      opportunity identification, and improve closing rates.
    </p>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
