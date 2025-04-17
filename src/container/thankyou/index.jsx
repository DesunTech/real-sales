import React from "react";
import Highlighter from "../../common/highlighter";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import pdfIcon from "../../../public/assets/icons/pdfIcon.svg";
import Image from "next/image";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import BookAdemo from "../../common/bookAdemo";
import lets_icons_back_3 from "../../../public/assets/icons/lets_icons_back_3.svg";
import CommonButton from "../../common/commonButton";
import { useDispatch } from "react-redux";
import { SessionModesValue } from "../../redux/OpenModal";

const ThankYou = () => {
  const dispatch = useDispatch();

  return (
    <div className="relative h-full bg-[url(../../public/assets/images/RealSales-backgrounds/bg-2.png)] bg-cover bg-center bg-no-repeat">
      <div className="page-container mx-auto container p-4 flex flex-col items-center justify-center gap-4">
        <Highlighter highlight={"Payment done !"} />
        <p className="lg:text-[30px] text-xl text-center text-[#060606E5] m-plus-rounded-1c-regular">
          Completing your Payment ....
        </p>
        <h1 className="lg:text-6xl text-3xl text-[#060606E5] m-plus-rounded-1c-regular text-center">
          Transaction Successful
        </h1>
        <hr className="border-[#06060680] lg:w-[80%] w-full" />
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div class="shadow-[0px_2px_5px_0px_#0000004D] py-2 px-2.25 rounded-full w-fit h-fit bg-white">
              <ArrowForwardIosSharpIcon />
            </div>
            <p className="lg:text-[16px] text-[14px] text-[#060606] text-start sora-regular">{`Subscription #`}</p>
          </div>
          {/* Subscription details */}
          <div className="shadow-[0px_4px_4px_0px_#00000040] border border-solid border-[#06060699] bg-white rounded-[5px] flex flex-col md:flex-row">
            <div className="w-full md:w-[33.33%] !p-1 flex items-center justify-center border-b md:border-b-0 md:border-r border-solid border-[#06060699]">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-start gap-2">
                  <div className="border border-solid border-[#060606E5] p-0.5 w-fit h-fit rounded-full mt-0.75">
                    <div className="bg-[#060606E5] w-2 h-2 rounded-full" />
                  </div>
                  <p className="sora-light text-[#060606] lg:text-sm text-[12px]">
                    Subscription Status:
                  </p>
                </div>
                <div className="bg-[#26AD35] py-1 px-8">
                  <p className="m-plus-rounded-1c-regular text-[12px] text-white leading-[14px] text-center">
                    Trial ends in:
                  </p>
                  <p className="m-plus-rounded-1c-regular text-[14px] text-white leading-[16px] text-center">
                    10 th April, 2025
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[33.33%] !p-1 flex items-center justify-center border-b md:border-b-0 md:border-r border-solid border-[#06060699]">
              <div className="py-1 px-8">
                <p className="m-plus-rounded-1c-regular text-[14px] text-[#060606] text-center">
                  Payment Start date:
                </p>
                <p className="m-plus-rounded-1c-medium text-[18px] text-[#060606] text-center">
                  12 th March, 2025
                </p>
              </div>
            </div>
            <div
              align="center"
              className="w-full md:w-[33.33%] !p-1 flex items-center justify-center"
            >
              <div className="py-1 px-8">
                <p className="m-plus-rounded-1c-regular text-[14px] text-[#060606] text-center">
                  Next Payment Due date:
                </p>
                <p className="m-plus-rounded-1c-medium text-[18px] text-[#060606] text-center">
                  12 th April, 2025
                </p>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col items-start md:gap-16 gap-8">
            {/* left */}
            <div className="w-full flex flex-col items-start gap-4">
              <div className="w-full flex items-center gap-2">
                <div class="shadow-[0px_2px_5px_0px_#0000004D] py-2 px-2.25 rounded-full w-fit h-fit bg-white">
                  <ArrowForwardIosSharpIcon />
                </div>
                <p className="lg:text-[16px] text-[14px] text-[#060606] text-start sora-regular">{`Order Details`}</p>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="shadow-[0px_4px_4px_0px_#00000040] border border-solid border-[#06060699] bg-white rounded-[5px] flex flex-row">
                  <div className="border-r border-solid border-[#06060699] flex items-center justify-center w-full p-1.5">
                    <p className="m-plus-rounded-1c-medium uppercase text-lg text-[#060606D9]">
                      PRODUCT
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-full p-1.5">
                    <p className="m-plus-rounded-1c-medium uppercase text-lg text-[#060606D9]">
                      TOTAL
                    </p>
                  </div>
                </div>
                <div className="shadow-[0px_4px_4px_0px_#00000040] border border-solid border-[#06060699] bg-white rounded-[1px] flex flex-col">
                  <div className="w-full flex border-b border-solid border-[#06060699]">
                    <div className="border-r border-solid border-[#06060699] flex items-center justify-center w-full p-1.5">
                      <p className="m-plus-rounded-1c-regular uppercase text-sm text-[#060606]">
                        Basic Plan * 1
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-full p-1.5">
                      <p className="m-plus-rounded-1c-regular uppercase text-sm text-[#060606]">
                        $449 (10 Session)
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex border-b border-solid border-[#06060699]">
                    <div className="border-r border-solid border-[#06060699] flex items-center justify-center w-full p-1.5">
                      <p className="m-plus-rounded-1c-regular uppercase text-sm text-[#060606]">
                        Subtotal
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-full p-1.5">
                      <p className="m-plus-rounded-1c-regular uppercase text-sm text-[#060606]">
                        $449.08
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex border-b border-solid border-[#06060699]">
                    <div className="border-r border-solid border-[#06060699] flex items-center justify-center w-full p-1.5">
                      <p className="m-plus-rounded-1c-medium uppercase text-sm text-[#060606]">
                        Grand Total:
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-full p-1.5">
                      <p className="m-plus-rounded-1c-medium uppercase text-sm text-[#060606]">
                        $449.08
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full p-1.5">
                    <div className="bg-[#CF2427] rounded-[5px] px-2 py-1 flex items-center gap-2 w-fit cursor-pointer">
                      <Image src={pdfIcon} alt="pdfIcon" className="w-5 h-7" />
                      <p className="m-plus-rounded-1c-regular text-white text-base">
                        Download Receipt Invoice
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="w-full flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <div class="shadow-[0px_2px_5px_0px_#0000004D] py-2 px-2.25 rounded-full w-fit h-fit bg-white">
                  <ArrowForwardIosSharpIcon />
                </div>
                <p className="lg:text-[16px] text-[14px] text-[#060606] text-start sora-regular">{`Order Information`}</p>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="shadow-[0px_4px_4px_0px_#00000040] border border-solid border-[#06060699] bg-white rounded-[5px] md:px-8 px-4 py-1.5">
                  <p className="m-plus-rounded-1c-medium capitalize text-lg text-[#060606D9]">
                    Billing Address
                  </p>
                </div>
                <div className="shadow-[0px_4px_4px_0px_#00000040] border border-solid border-[#06060699] bg-white rounded-[1px] flex flex-col">
                  <div className="w-full flex border-b border-solid border-[#06060699] md:px-8 px-4 py-1.5">
                    <p className="m-plus-rounded-1c-regular uppercase text-sm text-[#060606]">
                      Customer Name: Test Mr. John Doe
                    </p>
                  </div>
                  <div className="w-full flex border-b border-solid border-[#06060699] md:px-8 px-4 py-2.5">
                    <p className="m-plus-rounded-1c-medium uppercase text-sm text-[#060606]">
                      Address: 49, Dummy ABC St., USA- 6790
                    </p>
                  </div>
                  <div className="w-full flex md:flex-row flex-col items-center gap-2 md:px-8 px-4 py-1.5">
                    <BookAdemo
                      link={`/`}
                      BookaDemo={"Back to home"}
                      icon={
                        <Image
                          src={lets_icons_back_3}
                          alt="lets_icons_back_3"
                        />
                      }
                      className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !flex-row-reverse !text-[14px] !px-5 !py-2 h-fit w-full`}
                    />
                    <CommonButton
                      onClick={() => dispatch(SessionModesValue(true))}
                      className={`!border-[2px] !border-[#060606] !text-[#060606] !text-[14px] !px-5 !py-1.5 flex !items-center gap-2 h-fit w-full`}
                      buttontext={"jump to session"}
                      icon={<ArrowRight width={19} height={13} />}
                    />
                  </div>
                </div>
                <hr className="mt-4 mb-2" />
                <p className="text-[#060606] text-[15px] sora-regular">
                  <span className="sora-semibold">* Note:</span>&nbsp;CVV is 3
                  digit secuirity pin, placed on the back of your card.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
