import React, { useEffect, useState } from "react";
import Highlighter from "../../common/highlighter";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Button, Rating } from "@mui/material";
import { useRouter } from "next/router";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";

const Feedback = () => {
  const router = useRouter();
  const { Post } = useApi();
  const { feedback } = apis;

  const [feedBackArr, setFeedBackArr] = useState([
    { title: "Overall call quality is Poor.", action: false },
    { title: "No Improvement of sales rep handle objections.", action: false },
    { title: "The client have no Follow-up.", action: false },
    { title: "AI Chatbot Misleading the user behavior.", action: false },
  ]);
  const [selecetedComment, setSelecetedComment] = useState("");
  const [rating, setRating] = useState(1);

  const checkAction = (index) => {
    setFeedBackArr((prevArr) =>
      prevArr.map((item, i) =>
        i === index ? { ...item, action: true } : { ...item, action: false }
      )
    );
    setSelecetedComment(feedBackArr[index].title);
  };

  const submitFeedback = async () => {
    let session_id = localStorage.getItem("session_id");
    let user_id = localStorage.getItem("user");
    try {
      let data = await Post(feedback, {
        rating: rating,
        comment: selecetedComment,
        user_id: user_id,
        session_id: session_id,
      });
      if (data?.comment) {
        router.push("/chat/rating");
      }
    } catch (error) {
      console.log(error, "_error_");
    }
  };

  return (
    <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-2.png)] bg-cover bg-center bg-no-repeat">
      <div className="page-container mx-auto container px-4 flex flex-col items-center justify-center">
        <div className="lg:w-[80%] w-full flex flex-col items-center lg:gap-3 gap-1 py-12">
          <Highlighter highlight={"Report Session"} />
          <p className="lg:text-[30px] text-xl text-center text-[#060606E5] m-plus-rounded-1c-regular">
            How was the Session?
          </p>
          <h1 className="lg:text-7xl text-3xl text-[#060606E5] m-plus-rounded-1c-regular text-center">
            Session Completed
          </h1>
          <hr className="w-full" />
          <p className="lg:text-[16px] text-[14px] text-[#060606] text-center sora-regular lg:w-[75%] w-full">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum
          </p>
          <div className="shadow-[0px_5px_20px_2px_#00000033] bg-white p-4 lg:w-[60%] w-full rounded-[5px] flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div class="shadow-[0px_2px_5px_0px_#0000004D] py-2 px-2.25 rounded-full w-fit h-fit">
                <ArrowForwardIosSharpIcon />
              </div>
              <p className="lg:text-[16px] text-[14px] text-[#060606] text-center sora-regular">{`Report to your Session: [If any]`}</p>
            </div>
            <div className="w-full flex items-center justify-center">
              <Rating
                size="large"
                name="half-rating"
                onChange={(e, newValue) => setRating(newValue)}
                value={rating}
                precision={0.5}
                sx={{ gap: 2 }}
              />
            </div>
            <div className="flex flex-col gap-2">
              {feedBackArr.map((v, i) => (
                <div
                  key={i}
                  className="border border-solid border-[#06060680] rounded-[5px] flex items-center justify-between p-0.5"
                >
                  <p className="lg:text-[16px] text-[14px] text-[#060606] m-plus-rounded-1c-medium pl-5">
                    {v?.title}
                  </p>
                  <div
                    className="bg-[#06060626] rounded-full p-2 cursor-pointer"
                    onClick={() => checkAction(i)}
                  >
                    <div className="border-2 border-solid border-[#060606E5] rounded-full w-5.5 h-5.5 flex items-center justify-center">
                      {v?.action ? (
                        <div className="w-3 h-3 bg-[#060606E5] rounded-full" />
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Button
                  className={`!w-full shadow-[0px_4px_4px_0px_#00000040] !text-white ${
                    !selecetedComment ? `!bg-[#563d3e]` : `!bg-[#CF2427]`
                  } uppercase`}
                  onClick={() => submitFeedback()}
                  disabled={!selecetedComment}
                >
                  SUBMIT FEEDBACK
                </Button>
              </div>
              <p
                className="text-[#060606CC] sora-semibold capitalize text-center cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("session_id");
                  router.push("/");
                }}
              >
                No Thanks
              </p>
              <hr className="border-[#060606CC]" />
              <p className="text-[#060606] lg:text-[15px] text-[13px] sora-regular">
                <span className="sora-semibold">* Note:</span>&nbsp;This Report
                should provide you a clear, actionable summary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
