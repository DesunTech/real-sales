import React, { useEffect, useState } from "react";
import CommonModal from "../commonModal";
import { EndChatValue, UploadYourDocValue } from "../../redux/OpenModal";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/router";
import lets_icons_back_2 from "../../../public/assets/icons/lets_icons_back_2.svg";
import Image from "next/image";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { AddSummary } from "../../redux/SummaryReducer";
const ChatEndModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const endChatValue = useSelector((state) => state.openModal.endChatValue);

  const [width, setWidth] = useState(1366);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <CommonModal
        open={endChatValue?.open}
        onClose={() =>
          dispatch(EndChatValue({ open: false, type: "", chat: 0 }))
        }
        width={width > 720 ? "50%" : "90%"}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-2 w-full">
            <div className="w-8 h-8 bg-[#F8F8E8] rounded-full flex items-center justify-center">
              <div className="border-2 border-solid border-[#B4BF5E] p-1 rounded-full">
                <div className="w-3 h-3 bg-[#B4BF5E] rounded-full" />
              </div>
            </div>
            <h3 className="m-plus-rounded-1c-regular lg:text-2xl text-xl">
              Hey! Wait a minute !
            </h3>
          </div>

          <div className="w-full bg-white p-6 rounded-lg text-center [box-shadow:0_0_5px_0_rgba(0,0,0,0.3)] flex flex-col gap-4">
            <h2 className="m-plus-rounded-1c-regular lg:text-3xl text-xl">
              Are you sure want to
              <br />
              End your&nbsp;
              <span className="m-plus-rounded-1c-medium capitalize">
                {endChatValue?.type}
              </span>
              &nbsp;Session now ?
            </h2>

            {endChatValue?.chat >= 5 ? null : (
              <>
                <p className="sora-regular lg:text-lg text-base">
                  Before ending your session, Few things you need to Know !
                </p>

                <p className="sora-regular lg:text-base text-sm">
                  You must exchange at least 5 messages before generating the
                  report.
                  <br />
                  Are you sure you don't want to generate a report?
                </p>
              </>
            )}

            <p className="sora-regular lg:text-lg text-base font-bold">
              <span className="sora-semibold">Thank you!</span>&nbsp;for your
              Session
            </p>
          </div>

          <div className="flex w-full gap-2 mt-2">
            <button
              className="flex-1 bg-[#FFDE59] text-black py-3 rounded-md flex items-center justify-center gap-2 shadow-md mb-2 cursor-pointer uppercase"
              onClick={() => {
                dispatch(
                  EndChatValue({
                    open: false,
                    type: endChatValue?.type,
                    chat: 0,
                  })
                );
                dispatch(UploadYourDocValue(true));
              }}
            >
              <Image src={lets_icons_back_2} alt="lets_icons_back_2" />
              BACK TO Session
            </button>

            <button
              className="flex-1 bg-[#D9272E] text-white py-3 rounded-md flex items-center justify-center gap-2 shadow-md mb-2 cursor-pointer uppercase"
              onClick={() => {
                dispatch(
                  EndChatValue({
                    open: false,
                    type: endChatValue?.type,
                    chat: 0,
                  })
                );
                localStorage.removeItem("summary");
                dispatch(AddSummary({}));
                localStorage.removeItem("persona_id");
                if (endChatValue?.chat >= 5) {
                  router.push("/report");
                } else {
                  router.push("/feedback");
                }
              }}
            >
              quit session anyway
              <CloseOutlinedIcon className="!text-lg" />
            </button>
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default ChatEndModal;
