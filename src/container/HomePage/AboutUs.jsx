import React from "react";
import trade from "../../../public/assets/images/aboutus/trade.png";
import sales from "../../../public/assets/images/aboutus/sales.png";
import selectloc from "../../../public/assets/images/aboutus/selectloc.png";
import Image from "next/image";
import { Rating } from "@mui/material";
import Highlighter from "../../common/highlighter";
import StarIcon from "@mui/icons-material/Star";
import RightPointer from "../../../public/assets/icons/rightPointer";

const AboutUs = () => {
  return (
    <div className="bg-[linear-gradient(180deg,#11182B_0%,#060606_112.58%)]">
      <div className="page-container mx-auto container px-4 flex justify-between flex-col">
        <div className="flex justify-between items-center py-12">
          <div className="w-[45%]">
            <div className="flex flex-col gap-5">
              <Highlighter />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <hr className="w-16 border border-white" />
                  <div className="h-3.5 w-3.5 bg-white rotate-45"></div>
                </div>
                <Rating
                  name="text-feedback"
                  value={5}
                  readOnly
                  precision={1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="small" />
                  }
                />
              </div>
              <p className="text-[18px] text-[#ffffff] m-plus-rounded-1c-regular">
                No more Generic AI
                <br />
                Train faster with
              </p>
              <h1 className="text-5xl text-[#ffffff] m-plus-rounded-1c-regular">
                Real Buyer Personas
              </h1>
              <p className="text-[15px] text-[#ffffff] sora-regular w-[95%]">
                Unlike generic Al models, our platform is powered by Al personas
                modeled after{" "}
                <span className="sora-semibold">
                  real industry decision-makers
                </span>
                <br />
                -&nbsp;ensuring that sales reps practice and refine their skills
                in authentic, high-stakes scenarios.
              </p>
            </div>
          </div>
          <div className="w-1/2 flex justify-end">
            <Image src={trade} alt="trade" className="w-[70%] h-full" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div></div>
          <hr className="border-[#FFFFFF33] border-1 w-1/2" />
        </div>

        <div className="flex justify-between items-center flex-row-reverse py-12">
          <div className="w-[45%]">
            <div className="flex flex-col items-end gap-5">
              <Highlighter />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <hr className="w-16 border border-white" />
                  <div className="h-3.5 w-3.5 bg-white rotate-45"></div>
                </div>
                <Rating
                  name="text-feedback"
                  value={5}
                  readOnly
                  precision={1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="small" />
                  }
                />
              </div>
              <p className="text-[18px] text-[#ffffff] m-plus-rounded-1c-regular">
                RealSales turns
                <br />
                sales teams into
              </p>
              <h1 className="text-5xl text-[#ffffff] m-plus-rounded-1c-regular">
                Top Performers
              </h1>
              <p className="text-[15px] text-[#ffffff] text-end sora-regular w-[95%]">
                Our Al-powered interactive platform helps sales teams to
                <span className="sora-semibold">go beyond the pitch</span>
                &nbsp;and master the art of connection, cross-selling, and deal-
                closing.&nbsp;
                <span className="sora-semibold">
                  Developing real sales skills in real- world scenarios...
                </span>
                <br />
                <br />
                <span className="sora-semibold">
                  We accelerate your company sales growth
                </span>
                &nbsp;by helping your reps to become productive faster,
                generating more opportunities per account and improving win
                rates.
              </p>
            </div>
          </div>
          <div className="w-1/2 flex justify-start">
            <Image src={sales} alt="sales" className="w-[70%] h-full" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <hr className="border-[#FFFFFF33] border-1 w-1/2" />
          <div></div>
        </div>

        <div className="flex justify-between items-center py-12">
          <div className="w-[50%]">
            <div className="flex flex-col gap-5">
              <Highlighter />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <hr className="w-16 border border-white" />
                  <div className="h-3.5 w-3.5 bg-white rotate-45"></div>
                </div>
                <Rating
                  name="text-feedback"
                  value={5}
                  readOnly
                  precision={1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="small" />
                  }
                />
              </div>
              <p className="text-[18px] text-[#ffffff] m-plus-rounded-1c-regular">
                RealSales is the answer to
                <br />
                Common problem is Sales team Impacting
              </p>
              <h1 className="text-5xl text-[#ffffff] m-plus-rounded-1c-regular">
                Performance
              </h1>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 py-3 px-4 border-l border-solid border-[#14558CB2] bg-[linear-gradient(90deg,rgba(20,85,140,0.3)_0%,rgba(20,85,140,0)_63.5%)]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#14558C] sora-semibold text-white text-[16px]">
                      1
                    </div>
                    <p className="text-[16px] text-[#ffffff] sora-regular w-[95%]">
                      Transactional selling instead of Solution Selling.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-10">
                    <RightPointer />
                    <p className="text-[13px] text-[#ffffff] sora-thin w-[95%]">
                      Pushing products rather than solving problems. Poor
                      cross-selling.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 py-3 px-4 border-l border-solid border-[#14558CB2] bg-[linear-gradient(90deg,rgba(20,85,140,0.3)_0%,rgba(20,85,140,0)_63.5%)]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#14558C] sora-semibold text-white text-[16px]">
                      2
                    </div>
                    <p className="text-[16px] text-[#ffffff] sora-regular w-[95%]">
                      Lack of Understanding of real customer pain points
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-10">
                    <RightPointer />
                    <p className="text-[13px] text-[#ffffff] sora-thin w-[95%]">
                      Failing to ask the right questions and identify customer
                      needs.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 py-3 px-4 border-l border-solid border-[#14558CB2] bg-[linear-gradient(90deg,rgba(20,85,140,0.3)_0%,rgba(20,85,140,0)_63.5%)]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#14558C] sora-semibold text-white text-[16px]">
                      3
                    </div>
                    <p className="text-[16px] text-[#ffffff] sora-regular w-[95%]">
                      Failure to connect the right product to the right need.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-10">
                    <RightPointer />
                    <p className="text-[13px] text-[#ffffff] sora-thin w-[95%]">
                      Inability of Navigating complex portfolio and propose
                      appropriate product.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-end">
            <Image src={selectloc} alt="selectloc" className="w-[70%] h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
