import React, { useEffect, useState } from "react";
import CommonModal from "../commonModal";
import { SessionModesValue, WaitAMinuteValue } from "../../redux/OpenModal";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import CommonButton from "../commonButton";
import sales_1 from "../../../public/assets/images/RealSales-temporary-dummy-extra-images/sales-infc-1.png";
import sales_2 from "../../../public/assets/images/RealSales-temporary-dummy-extra-images/sales-infc-2.png";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import imageBtn from "../../../public/assets/images/common/imageBtn.png"
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";


const SessionModes = () => {
  const dispatch = useDispatch();

  const sessionModesValue = useSelector(
    (state) => state.openModal.sessionModesValue
  );

  const  [type, setType] = useState("audio");
  const [width, setWidth] = useState(1366);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shortlistedPersonaArr = [
    {
      image: sales_1,
      title: "Audio only Mode",
      subTitle: "by RealSales",
      type: "audio",
      rating: "5.0",
    },
    {
      image: sales_2,
      title: "Video-Audio Mode",
      subTitle: "by RealSales",
      type: "video",
      rating: "5.0",
    },
  ];

  return (
    <>
      <CommonModal
        open={sessionModesValue}
        onClose={() => dispatch(SessionModesValue(false))}
        width={width > 720 ? "50%" : "90%"}
      >
        <div className="flex flex-col gap-4 items-start">
          <div className="flex flex-col items-start">
            <h2 className="lg:text-[22px] text-[16px] m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-start">
              Choose your Dream Session Modes
            </h2>
            <p className="lg:text-[30px] text-[16px] m-plus-rounded-1c-regular text-[#060606E5]">
              (Choose any one):
            </p>
          </div>

          <div className="w-full flex items-center justify-center flex-col py-4">
            <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-5">
              {shortlistedPersonaArr?.length
                ? shortlistedPersonaArr.map((v, i) => (
                  <div
                    key={i}
                    className={`relative lg:w-[48%] w-full h-[300px] rounded-[20px] overflow-hidden cursor-pointer`}
                    onClick={()=> setType(v?.type)}
                  >
                    <Image
                      src={v?.image}
                      alt={v?.title}
                      className="w-full h-full"
                    />
                    <div className="absolute top-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/60 to-black/0 w-full h-full p-4">
                      <div className="cursor-pointer bg-[#FFFFFF33] w-fit h-fit p-2 rounded-full">
                        <div className="h-5 w-5 rounded-full border-2 border-solid border-[#FFFFFF] flex items-center justify-center">
                          {v?.type === type ? <div className="h-3 w-3 rounded-full bg-[#FFFFFF]" /> : null}
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <h1 className="m-plus-rounded-1c-regular lg:text-2xl text-xl text-[#FFDE5A]">
                          {v?.title}
                        </h1>
                        <p className="sora-thin text-white lg:text-[16px] text-[12px]">
                          {v?.subTitle}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="border border-solid border-[#FFFFFFB2] rounded-[20px] bg-[#FFFFFF1A] relative overflow-hidden">
                            <div className="bg-[url(../../public/assets/images/RealSales-abstracts/highlighter-glow.png)] bg-cover bg-center bg-no-repeat opacity-60 absolute left-0 -top-6 w-12 h-12" />
                            <p className="m-plus-rounded-1c-regular text-[#FFFFFFB2] text-[14px] px-3 py-1 pb-1.5 leading-[14px]">Happy Users: {v?.rating}</p>
                            <div className="bg-[url(../../public/assets/images/RealSales-abstracts/highlighter-glow.png)] bg-cover bg-center bg-no-repeat opacity-60 absolute right-[30%] -bottom-6 w-12 h-12" />
                          </div>
                          <Rating
                            name="text-feedback"
                            value={+v?.rating}
                            readOnly
                            precision={1}
                            style={{ fontSize: "1rem" }}
                            emptyIcon={
                              <StarIcon style={{ opacity: 0.55 }} fontSize="small" />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                : null}
            </div>
            <CommonButton
              className={`!mt-8 !border-[2px] !border-[#060606] !text-[#060606] !font-[500] !px-6 !py-1] !text-[16px] !capitalize flex !items-center gap-2 w-fit h-fit`}
              icon={<ArrowRight stroke={`#060606`} width={19} height={13} />}
              onClick={() => {
                dispatch(SessionModesValue(false));
                dispatch(WaitAMinuteValue({ open: true, type: type }));
              }}
              buttontext={"Save & Proceed"}
            />
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default SessionModes;
