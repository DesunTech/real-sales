import React, { useState } from "react";
import Image from "next/image";
import whiteLogoNoBackground from "../../../public/assets/images/RealSales-official-logo/For Web/png/White logo - no background.png";
import userDummy from "../../../public/assets/images/RealSales-user-images/user-3.png";
import menueIcon from "../../../public/assets/icons/menueIcon.svg";
import glow_light from "../../../public/assets/images/RealSales-abstracts/glow-light-1.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SendMessage from "../../../public/assets/icons/sendMessage";
import CallEndSharpIcon from "@mui/icons-material/CallEndSharp";
import { FormControlLabel, Radio } from "@mui/material";
import persona_plant from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import cil_audio from "../../../public/assets/icons/cil_audio.svg";
import BookAdemo from "../../common/bookAdemo";
import ArrowRight from "../../../public/assets/icons/arrowRight";

const Chat = () => {
  return (
    <div className="p-4 flex justify-between flex-col">
      <div
        className={`w-auto rounded-[25px] bg-[url(../../public/assets/images/RealSales-backgrounds/bg-4.png)] bg-cover bg-center bg-blend-multiply overflow-hidden relative`}
      >
        {/* <Image src={glow_light} alt='glow_light' className='absolute w-full h-full' /> */}
        <div className="w-full h-[calc(100vh_-_32px)] overflow-y-auto bg-[linear-gradient(180deg,rgba(6,6,6,0.9)_0%,rgba(17,24,43,0.9)_62.58%)] px-8 py-4">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer">
              <ArrowBackIcon className="text-white" />
            </div>
            <Image
              src={whiteLogoNoBackground}
              alt="whiteLogoNoBackground"
              className="h-10 w-auto"
            />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer">
                <MailIcon className="text-white" />
              </div>
              <div className="w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer">
                <NotificationsIcon className="text-white" />
              </div>
              <div className="flex items-center gap-2 pl-4">
                <div className="flex flex-col items-end">
                  <p className="lg:text-lg text-base m-plus-rounded-1c-regular text-[#ffffffc6]">
                    Logged in as:
                  </p>
                  <p className="lg:text-xl text-lg m-plus-rounded-1c-medium text-[#FFDE5A]">
                    Mr. John Doe
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-14 h-14 rounded-full p-1 border-2 border-solid border-white overflow-hidden">
                    <Image
                      src={userDummy}
                      alt="user-image"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <ArrowDropDownIcon className="text-white !text-4xl" />
                </div>
              </div>
            </div>
          </div>

          {/* bordy */}
          <div className="flex flex-row gap-4">
            <div className="w-[70%] h-[calc(100vh_-_8rem)] flex flex-col justify-between gap-4">
              {/* top */}
              <div className="w-full flex flex-row items-start">
                {/* top right */}
                <div className="w-[40%] flex flex-col gap-4">
                  <FormControlLabel
                    value="end"
                    control={
                      <Radio
                        sx={{
                          color: "#FFDE5A",
                          "&.Mui-checked": {
                            color: "#FFDE5A", // checked color
                          },
                        }}
                      />
                    }
                    label={
                      <p className="sora-semilight text-sm">
                        Interaction Summarization:
                      </p>
                    }
                    sx={{
                      color: "#FFFFFF", // label text color
                    }}
                  />
                  <div className="bg-[linear-gradient(180deg,rgba(17,24,43,0.3)_0%,rgba(255,255,255,0.09)_100%)] rounded-[10px] p-4 flex items-center gap-4">
                    <div className="relative w-[125px] h-[160px] overflow-hidden cursor-pointer rounded-[10px]">
                      <Image
                        src={persona_plant}
                        alt="persona_plant"
                        className="w-full h-full"
                      />
                      <div className="absolute top-0 flex items-end w-full h-full bg-[linear-gradient(16.61deg,#000000_18.44%,rgba(0,0,0,0)_82.49%)]">
                        <div className="flex flex-col p-2">
                          <p className="m-plus-rounded-1c-light text-[#ffffff] text-[14px]">
                            Johnsey304
                          </p>
                          <p className="m-plus-rounded-1c-regular text-[#FFDE5A] text-[17px]">
                            Activated
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-1 h-full">
                      <p className="text-white sora-semilight text-[14px]">
                        Active plan:
                        <br />
                        <span className="sora-regular">Single Session</span>
                      </p>
                      <div className="">
                        <p className="text-white m-plus-rounded-1c-semilight text-[20px]">
                          Session&nbsp;mode
                        </p>
                        <div className="py-1 px-3 rounded-full bg-[#060606] w-fit flex items-center gap-2">
                          <Image
                            src={cil_audio}
                            alt="cil_audio"
                            className="w-6 h-auto"
                          />
                          <span className="text-white sora-regular text-sm">
                            Audio
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-white m-plus-rounded-1c-medium underline text-lg">
                          Upload&nbsp;Files
                        </p>
                        <AddCircleOutlineSharpIcon className="text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[linear-gradient(180deg,rgba(17,24,43,0.3)_0%,rgba(255,255,255,0.09)_100%)] rounded-[10px] p-4 flex flex-col items-start gap-2">
                    <div>
                      <p className="text-white m-plus-rounded-1c-medium text-lg">
                        Upgrade
                      </p>
                      <p className="text-white m-plus-rounded-1c-semilight text-[22px]">
                        Get Access upto 3 Personas
                      </p>
                    </div>
                    <BookAdemo
                      BookaDemo={`upgrade your plan`}
                      link={`#`}
                      className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit`}
                      icon={<ArrowRight stroke={`#FFDE5A`} />}
                    />
                  </div>
                </div>
                {/* top left */}
                <div className="w-[60%]">
                  {/* <Image src={glow_light} alt="glow_light" className="opacity-[0px]"/> */}
                  <div className="relative w-full h-[80vh] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('../../public/assets/images/RealSales-abstracts/glow-light-1.png')] bg-cover bg-center bg-no-repeat opacity-40"></div>
                    <div className="relative z-10"></div>
                  </div>
                </div>
              </div>
              {/* bottom */}
              <div className="w-full flex flex-col items-start gap-2">
                <div>
                  <p className="sora-regular text-white text-sm">
                    To proceed your dream chat:
                  </p>
                  <p className="sora-thin text-white text-lg">
                    Say “Hi” to your Persona !!
                  </p>
                </div>
                <div className="w-full flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer">
                    <Image
                      src={menueIcon}
                      alt="menueIcon"
                      className="w-4 h-auto"
                    />
                  </div>
                  <div className="w-10 h-10 bg-[#FE0000] rounded-full flex items-center justify-center cursor-pointer">
                    <CallEndSharpIcon className="text-white" />
                  </div>
                  <div className="bg-[#FFFFFF66] p-1 pl-2 rounded-full flex justify-between items-center lg:w-[80%] w-full">
                    <input
                      placeholder="Chat with your AI Trainer ..."
                      className="border-0 outline-0 !py-1 !px-4 w-full text-white m-plus-rounded-1c-regular"
                    />
                    <div className="flex items-center gap-2 !text-[#060606D9] !bg-[#FFE942] !capitalize !py-1 !px-4 !rounded-full cursor-pointer">
                      <span className="m-plus-rounded-1c-medium">
                        Send&nbsp;Message
                      </span>
                      <SendMessage />
                    </div>
                  </div>

                  <div className="w-14 h-14 rounded-full p-1 border-2 border-solid border-white overflow-hidden">
                    <Image
                      src={userDummy}
                      alt="user-image"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[30%]">ss</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
