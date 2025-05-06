import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


const FaqPage = () => {
  const [openQuestion, setOpenQuestion] = useState();

  const doHandelClick = (idx) => {
    if (openQuestion === idx) {
      setOpenQuestion();
    } else {
      setOpenQuestion(idx);
    }
  };

  let faqArr = [
    { question: "What is your return policy?", answer: "You can return any item within 30 days of purchase." },
    { question: "How do I track my order?", answer: "You can track your order using the tracking link sent to your email." },
    { question: "Do you ship internationally?", answer: "Yes, we ship to over 100 countries worldwide." },
    { question: "What payment methods do you accept?", answer: "We accept credit cards, PayPal, and bank transfers." },
    { question: "How can I contact customer support?", answer: "You can contact us via email or through our contact form." },
    { question: "Do you offer gift cards?", answer: "Yes, we offer gift cards in various denominations." },
    { question: "Can I change my order after it has been placed?", answer: "You can change your order within 1 hour of placing it." },
    { question: "What should I do if I receive a damaged item?", answer: "Please contact us immediately, and we will assist you with a replacement." },
    { question: "What are the shipping costs?", answer: "Shipping costs vary based on location and order size." },
    { question: "How long does delivery take?", answer: "Delivery typically takes 3-5 business days, depending on your location." },
  ];

  return (
    <div className="relative">
      <div className="w-full h-full bg_image">
        <div className="bg-[#06060666] py-16 flex flex-col items-center justify-center">
          <h1 className="lg:text-[65px] text-4xl text-[#ffffff] m-plus-rounded-1c-regular">
            Do You Have Questions?
          </h1>
          <h3 className="lg:text-[24px] text-lg text-[#ffffff] sora-regular">
            We have answers (Well, most of this times!)
          </h3>
        </div>
      </div>
      <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-4.png)] bg-cover bg-center bg-no-repeat">
        <div className="bg-[#ffffffcb]">
          <div className="page-container mx-auto lg:p-16 p-8 container flex flex-col items-center lg:gap-10 gap-5">
            <h1 className="lg:text-[40px] text-3xl text-[#2d2d2d] m-plus-rounded-1c-semibold capitalize text-center">
              Frequently asked question
            </h1>
            <div className="w-full flex flex-col items-center gap-4">
              {faqArr?.length
                ? faqArr.map((v, i) => (
                    <div
                      key={i}
                      // data-aos="zoom-in"
                      className={`w-full h-fit flex flex-col items-start overflow-hidden ${
                        openQuestion === i ? "gap-2" : ""
                      } px-4 py-2 rounded-[6px] shadow-lg border border-solid border-[#00000010] bg-[url(../../public/assets/images/RealSales-backgrounds/bg-1.png)] bg-cover bg-center bg-no-repeat`}
                    >
                      <div className="w-full flex items-center justify-between text-[#2d2d2d]">
                        <p className="m-plus-rounded-1c-semibold lg:text-[18px] text-[16px]">
                          {i + 1}.&nbsp;{v?.question}
                        </p>
                        <div
                          className={`h-7 w-7 flex items-center justify-center shadow-[0_0_4px_0_rgba(99,99,99,0.37)] rounded-full border border-solid border-[#00000010] cursor-pointer ${
                            openQuestion === i ? `rotate-180` : `rotate-0`
                          } duration-300`}
                          onClick={() => doHandelClick(i)}
                        >
                          <ArrowDropDownIcon />
                        </div>
                      </div>
                      <div
                        className={`transition-all duration-300 ${
                          openQuestion === i
                            ? "max-h-40"
                            : "max-h-0 overflow-hidden"
                        }`}
                      >
                        {openQuestion === i ? (
                          <p className="lg:text-[15px] text-[13px] sora-regular text-[#2d2d2dce]">
                            {v?.answer}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
