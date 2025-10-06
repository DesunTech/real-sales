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
    { question: "What is RealSales and how does it work?", answer: "RealSales is an Al-powered sales acceleration platform designed for sales managers and sales leaders to gain visibility into their team's capabilities and accelerate time-to-performance. Sales reps engage in lifelike conversations with AI personas built from real industry professionals across prospecting, discovery, and closing scenarios, while managers receive detailed insights into team maturity and skill gaps." },
    { question: "How is RealSales different from other sales training solutions?", answer: "Unlike generic AI sales training and simulations, RealSales uses AI personas modeled after real industry decision-makers, not scripted scenarios. We provide sales managers with deep visibility into team capabilities while focusing on practical skills like cross-selling and solution selling—making it a performance accelerator for sales leaders, not just training for reps." },
    { question: "What makes your AI personas real compared to generic AI?", answer: "Our AI personas are built from extensive interviews with actual industry professionals—plant managers, engineers, and procurement leaders. They reflect real decision-making patterns, industry-specific objections, and authentic buying behaviors, giving sales managers accurate assessments of how their reps perform with real customers." },
    { question: "Who is RealSales designed for?", answer: "RealSales is designed for sales managers and executives who want to accelerate team performance, reduce onboarding time, and improve win rates. It's perfect for B2B sales leaders managing teams that sell complex products where relationship-building and consultative selling are crucial." },
    { question: "What specific problems does RealSales solve for sales teams?", answer: "RealSales gives sales managers visibility into problems like slow rep ramp-up, missed cross-selling opportunities, inconsistent discovery skills, and poor objection handling. It transforms these hidden challenges into clear, actionable insights that sales leaders can use to accelerate team performance." },
    { question: "How quickly can new sales reps become productive with RealSales?", answer: "Sales managers can accelerate their team's productivity timeline from 6-8 months to 2-3 months. RealSales provides clear visibility into each rep's progress, allowing managers to focus coaching efforts where needed most and track improvement in real-time." },
    { question: "Can RealSales help with cross-selling and upselling?", answer: "Absolutely. RealSales assesses cross-selling and upselling capabilities in detail, providing sales managers with insights into which reps can identify multiple opportunities per customer interaction and which need focused development in these high-value skills." },
    { question: "Why are you starting with food & beverage manufacturing, and will you expand to other industries?", answer: "We're launching with food & beverage manufacturing to perfect our approach with deep industry expertise. We'll expand to other complex B2B industries like healthcare, industrial automation, and other manufacturing sectors where sales managers need sophisticated tools to develop their teams." },
    { question: "How can I try RealSales and do you offer demos?", answer: "Yes, we offer comprehensive demo meetings to showcase how the platform provides sales managers with team visibility and performance insights. Trial opportunities are evaluated case-by-case during demo calls based on your specific needs and use cases." },
    { question: "How long does setup take and what do I need to get started?", answer: "Setup takes just 30 minutes for sales managers to configure company information and upload basic materials. Teams can start using the platform the same day, with full adoption and meaningful team insights typically achieved within 2-4 weeks." },
    { question: "Does RealSales integrate with our existing CRM or sales tools?", answer: "CRM integration is currently in development as part of our roadmap to provide sales managers with end-to-end visibility linking coaching progress with actual sales performance. We're building these capabilities to offer comprehensive sales team intelligence." },
    { question: "What about data security and privacy?", answer: "We maintain strict data privacy standards. No uploaded materials or platform interactions are shared externally, and all business details remain completely confidential within your organization's isolated environment." },
    { question: "Do you have case studies or success stories?", answer: "Yes, visit our Case Studies section to see real applications of how RealSales helps sales managers accelerate team performance across different scenarios and company sizes. For detailed discussions about how RealSales can specifically help your sales organization, schedule a call with our team." },
    { question: "What does RealSales cost?", answer: "Our pricing is a fraction of traditional training costs while delivering measurable results for sales managers. To discuss pricing options that fit your team size and specific needs, schedule a meeting with our sales team who can provide detailed information tailored to your organization." }
  ];

  return (
 <div className="relative">
  {/* Background Section */}
  <div className="w-full h-full bg_image">
    <div className="bg-[#06060666] py-16 flex flex-col items-center justify-center">
      <div className="page-container mx-auto container px-4 text-center">
        <h1 className="lg:text-[65px] text-4xl text-[#ffffff] m-plus-rounded-1c-regular">
          Frequently Asked Questions
        </h1>
        {/* <h3 className="lg:text-[24px] text-lg text-[#ffffff] sora-regular">
          We have answers (Well, most of the time!)
        </h3> */}
      </div>
    </div>
  </div>

  {/* FAQ Section */}
  <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-4.png)] bg-cover bg-center bg-no-repeat">
    <div className="bg-[#ffffffcb]">
      <div className="page-container mx-auto lg:p-16 p-8 container flex flex-col items-center lg:gap-10 gap-5">
        <div data-aos="zoom-in" className="w-full flex flex-col items-center gap-4">
          {faqArr?.length
            ? faqArr.map((v, i) => (
                <div
                  key={i}
                  className={`w-full h-fit flex flex-col items-start overflow-hidden ${
                    openQuestion === i ? "gap-2" : ""
                  } px-4 py-2 rounded-[6px] shadow-lg border border-solid border-[#00000010] bg-[url(../../public/assets/images/RealSales-backgrounds/bg-1.png)] bg-cover bg-center bg-no-repeat`}
                >
                  <div className="w-full flex items-center justify-between text-[#2d2d2d]">
                    <p
                      className="m-plus-rounded-1c-semibold lg:text-[18px] text-[16px] cursor-pointer flex-1 pr-4"
                      onClick={() => doHandelClick(i)}
                    >
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
                      openQuestion === i ? "max-h-40" : "max-h-0 overflow-hidden"
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

        <div className="mt-8 text-center">
          <p className="lg:text-[18px] text-[16px] text-[#2d2d2d] sora-regular">
            For more information or to schedule a demo, contact our sales team.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default FaqPage;
