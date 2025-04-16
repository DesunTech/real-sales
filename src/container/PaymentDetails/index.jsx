import Image from "next/image";
import React, { useState } from "react";
import Payment_Details_img from "../../../public/assets/images/common/Payment_Details_img.png";
import Highlighter from "../../common/highlighter";
import bank_outline from "../../../public/assets/icons/bank_outline.svg";
import card_outline from "../../../public/assets/icons/card_outline.svg";
import { Radio } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const PaymentDetails = () => {
  const [method, setMethod] = useState("card");

  return (
    <div className="relative h-full bg-[url(../../public/assets/images/RealSales-backgrounds/bg-4.png)] bg-cover bg-center bg-no-repeat">
      <div className="page-container mx-auto container px-12 flex">
        <div className="w-[40%] relative">
          <Image
            src={Payment_Details_img}
            alt="Payment_Details_img"
            className="w-full h-[calc(100vh_-_70px)]"
          />
          <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#ffffff_100%)] absolute bottom-0 w-full h-[50vh] p-8 flex flex-col justify-end gap-4">
            <p className="lg:text-[34px] text-[20px] text-[#060606E5] m-plus-rounded-1c-regular">
              Supercharging your sales teams with AI-Driven Selling
            </p>
            <hr className="border-[#060606]" />
            <p className="lg:text-[14px] text-[12px] text-[#060606E5] sora-regular">
              Realsales turns
              <br />
              Sales team into top Performers
            </p>
          </div>
        </div>
        <div className="w-[60%] flex flex-col items-center justify-center">
          <Highlighter highlight={"Report Session"} />
          <p className="lg:text-[30px] text-xl text-center text-[#060606E5] m-plus-rounded-1c-regular">
            Complete your payment
          </p>
          <h1 className="lg:text-6xl text-3xl text-[#060606E5] m-plus-rounded-1c-regular text-center">
            Payment Details
          </h1>
          <div className="w-full flex-col p-8">
            <div className="flex items-center gap-2">
              <div className="border border-solid border-[#060606E5] p-1 w-fit h-fit rounded-full">
                <div className="bg-[#060606E5] w-3 h-3 rounded-full" />
              </div>
              <p className="sora-light text-[#060606] lg:text-lg text-base">
                Choose your payment method:
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                class={`shadow-[0px_2px_10px_0px_#00000033] border-2 border-solid ${
                  method === "card"
                    ? "border-[#06060633]"
                    : "border-[#00000000]"
                } bg-white flex items-center justify-between w-full rounded-[5px] px-2 py-1 cursor-pointer`}
                onClick={() => setMethod("card")}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={card_outline}
                    alt="card_outline"
                    className="w-10 h-8"
                  />
                  <p className="m-plus-rounded-1c-regular text-[#060606] lg:text-xl text-lg">
                    Card
                  </p>
                </div>
                <Radio
                  checked={method === "card" ? true : false}
                  onClick={() => setMethod("card")}
                  sx={{
                    color: "#060606E5",
                    "&.Mui-checked": {
                      color: "#060606E5", // checked color
                    },
                  }}
                />
              </div>
              <div
                class={`shadow-[0px_2px_10px_0px_#00000033] border-2 border-solid ${
                  method === "netbanking"
                    ? "border-[#06060633]"
                    : "border-[#00000000]"
                } bg-white flex items-center justify-between w-full rounded-[5px] px-2 py-1 cursor-pointer`}
                onClick={() => setMethod("netbanking")}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={bank_outline}
                    alt="bank_outline"
                    className="w-10 h-8"
                  />
                  <p className="m-plus-rounded-1c-regular text-[#060606] lg:text-xl text-lg">
                    Netbanking
                  </p>
                </div>
                <Radio
                  checked={method === "netbanking" ? true : false}
                  onClick={() => setMethod("netbanking")}
                  sx={{
                    color: "#060606E5",
                    "&.Mui-checked": {
                      color: "#060606E5", // checked color
                    },
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <div class="shadow-[0px_2px_5px_0px_#0000004D] py-2 px-2.25 rounded-full w-fit h-fit bg-white">
                  <ArrowForwardIosSharpIcon />
                </div>
                <p className="lg:text-[16px] text-[14px] text-[#060606] text-start sora-regular">{`Other Payments`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
