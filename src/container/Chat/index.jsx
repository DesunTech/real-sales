import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import whiteLogoNoBackground from "../../../public/assets/images/RealSales-official-logo/For Web/png/White logo - no background.png";
import userDummy from "../../../public/assets/images/RealSales-user-images/user-3.png";
import menueIcon from "../../../public/assets/icons/menueIcon.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SendMessage from "../../../public/assets/icons/sendMessage";
import CallEndSharpIcon from "@mui/icons-material/CallEndSharp";
import {
  FormControlLabel,
  Radio,
  styled,
  Switch,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import persona_plant from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import cil_audio from "../../../public/assets/icons/cil_audio.svg";
import BookAdemo from "../../common/bookAdemo";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import callVibration from "../../../public/assets/images/RealSales-abstracts/call-vibration.png";
import personaExtra from "../../../public/assets/images/RealSales-user-images/persona-extra.png";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ideaIcon from "../../../public/assets/icons/ideaIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { EndChatValue } from "../../redux/OpenModal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MicOffSharpIcon from "@mui/icons-material/MicOffSharp";
import Link from "next/link";

const Chat = ({ slug, children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(0);
  const [micUser, setMicUser] = useState(true);
  const [micAi, setMicAi] = useState(true);
  const [isMicClicked, setIsMicClicked] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const recognitionRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const isSilenceTimeoutRef = useRef(false);
  const lastSpeechTimeRef = useRef(null);

  useEffect(() => {
    let recognition = null;

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      try {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          console.log('Speech recognition started');
          isSilenceTimeoutRef.current = false;
          lastSpeechTimeRef.current = Date.now();
        };

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setTranscript(transcript);
          lastSpeechTimeRef.current = Date.now();
          
          if (event.results[current].isFinal) {
            setChatMessages(prev => [...prev, {
              text: transcript,
              isUser: true,
              timestamp: new Date().toISOString()
            }]);
            setTranscript('');
          }
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'no-speech') {
            return;
          }
          setIsMicClicked(false);
          isSilenceTimeoutRef.current = false;
          lastSpeechTimeRef.current = null;
        };

        recognition.onend = () => {
          console.log('Speech recognition ended');
          if (isMicClicked && !isSilenceTimeoutRef.current) {
            try {
              recognition.start();
            } catch (error) {
              console.error('Error restarting recognition:', error);
            }
          }
        };

        recognitionRef.current = recognition;
      } catch (error) {
        console.error('Failed to initialize speech recognition:', error);
      }
    }

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
    };
  }, []);

  // Add a new effect to check for silence
  useEffect(() => {
    let silenceCheckInterval;

    if (isMicClicked) {
      silenceCheckInterval = setInterval(() => {
        if (lastSpeechTimeRef.current && Date.now() - lastSpeechTimeRef.current >= 3000) {
          // If no speech detected for 3 seconds
          isSilenceTimeoutRef.current = true;
          if (recognitionRef.current) {
            try {
              recognitionRef.current.stop();
            } catch (error) {
              console.error('Error stopping recognition:', error);
            }
          }
          setIsMicClicked(false);
          setTranscript('');
          lastSpeechTimeRef.current = null;
        }
      }, 1000); // Check every second
    }

    return () => {
      if (silenceCheckInterval) {
        clearInterval(silenceCheckInterval);
      }
    };
  }, [isMicClicked]);

  const toggleSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        if (!isMicClicked) {
          isSilenceTimeoutRef.current = false;
          lastSpeechTimeRef.current = Date.now();
          recognitionRef.current.start();
          setIsMicClicked(true);
        } else {
          isSilenceTimeoutRef.current = true;
          lastSpeechTimeRef.current = null;
          recognitionRef.current.stop();
          setIsMicClicked(false);
          setTranscript('');
        }
      } catch (error) {
        console.error('Error toggling speech recognition:', error);
        setIsMicClicked(false);
        lastSpeechTimeRef.current = null;
      }
    } else {
      console.error('Speech recognition not supported in this browser');
    }
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "#fe0000",
      fontSize: "10px",
    },
  }));

  const coachingArr = [{}, {}];
  const qnaArr = [
    {
      question: "The standard chunk of Lorem Ipsum used?",
      answer: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making`,
    },
    {
      question: "It is a long established fact that a reader!",
      answer: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making`,
    },
    {
      question: "Lorem Ipsum  is simply dummy text?",
      answer: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making`,
    },
  ];

  return (
    <div className="p-4 flex justify-between flex-col">
      <div
        className={`w-auto rounded-[25px] bg-[url(../../public/assets/images/RealSales-backgrounds/bg-4.png)] bg-cover bg-center bg-blend-multiply overflow-hidden relative`}
      >
        {/* <div className="w-full flex flex-col gap-8 h-[calc(100vh_-_32px)] overflow-y-auto bg-[linear-gradient(180deg,rgba(6,6,6,0.9)_0%,rgba(17,24,43,0.9)_62.58%)] px-8 py-4"> */}
        <div className="w-full flex flex-col gap-8 bg-[linear-gradient(180deg,rgba(6,6,6,0.9)_0%,rgba(17,24,43,0.9)_62.58%)] px-8 py-4">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center w-[55%]">
              <div className="w-[40%]">
                <div
                  onClick={() => {
                    slug === "rating"
                      ? router.push("/")
                      : dispatch(EndChatValue({ open: true, type: "audio" }));
                  }}
                  className="w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer"
                >
                  <ArrowBackIcon className="text-white" />
                </div>
              </div>
              <Link
                href={slug === "rating" ? "/" : "#"}
                className="w-[60%] flex items-center justify-end"
              >
                <Image
                  src={whiteLogoNoBackground}
                  alt="whiteLogoNoBackground"
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center justify-end gap-2 w-[45%]">
              <div className="relative w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer">
                <MailIcon className="text-white" />
                <p className="flex items-center justify-center absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#CF2427] text-white text-[10px]">
                  {99}
                </p>
              </div>
              <div className="relative w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer">
                <NotificationsIcon className="text-white" />
                <p className="flex items-center justify-center absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#CF2427] text-white text-[10px]">
                  {4}
                </p>
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
          {children ? (
            children
          ) : slug === "audio" || slug === "video" ? (
            <div className="flex flex-row gap-2">
              {/* left */}
              <div className="relative w-[70%] h-[calc(100vh_-_8rem)] flex flex-col justify-between gap-4">
                {/* top */}
                <div className="w-full flex flex-row items-start gap-2">
                  {/* top right */}
                  <div className="w-[40%] flex flex-col gap-4">
                    <FormControlLabel
                      value="end"
                      control={
                        <Radio
                          checked={true}
                          sx={{
                            cursor: "default",
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
                        cursor: "default",
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

                    <div className="relative bg-[linear-gradient(180deg,rgba(17,24,43,0.3)_0%,rgba(255,255,255,0.09)_100%)] rounded-[10px] p-4 flex flex-col items-start gap-2">
                      <div
                        // onClick={props?.onClose}
                        className="z-10 cursor-pointer bg-red-500 rounded-full h-6 w-6 flex items-center justify-center absolute -top-2.5 -right-1.5"
                      >
                        <CloseOutlinedIcon className="!text-[16px] text-white" />
                      </div>
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
                        link={`/pricing`}
                        className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit`}
                        icon={<ArrowRight stroke={`#FFDE5A`} />}
                      />
                    </div>
                  </div>
                  {/* top left */}
                  <div className="w-[60%] flex flex-col items-center gap-2">
                    <div>
                      <p className="sora-regular text-white text-base capitalize">
                        {slug}-Chat Session:
                      </p>
                      <div className="flex flex-col gap-0.25 w-fit">
                        <p className="m-plus-rounded-1c-light text-white text-2xl">
                          Your Session id:&nbsp;
                          <span className="text-[#FFDE5A]">049ZF-83Mo0K</span>
                        </p>
                        <hr className="border-[#FFFFFF33] " />
                      </div>
                    </div>
                    <div className="relative w-full h-[80vh] overflow-y-auto">
                      <div className="absolute inset-0 bg-[url('../../public/assets/images/RealSales-abstracts/glow-light-1.png')] bg-cover bg-center bg-no-repeat opacity-20"></div>
                      {slug === "audio" ? (
                        <div className="absolute inset-0 p-5 w-full h-full flex flex-col items-center">
                          <div className="flex items-center gap-1.5">
                            <button 
                              className={`w-10 h-10 ${isMicClicked ? 'bg-[#26AD35] hover:bg-[#26AD35]' : 'bg-[#FFFFFF1A] hover:bg-[#FFFFFF33]'} rounded-full flex items-center justify-center cursor-pointer transition-colors`}
                              onClick={toggleSpeechRecognition}
                            >
                              <MicNoneOutlinedIcon className={`${isMicClicked ? 'text-white' : 'text-[#FFFFFF80]'} !text-[20px]`} />
                            </button>
                            <Image
                              src={callVibration}
                              alt="callVibration"
                              className="w-6 h-10"
                            />
                            <p className="text-white text-base sora-regular">
                              <span className="text-[#FFDE5A] sora-semibold">
                                Hello!
                              </span>
                              &nbsp;how are you !!
                            </p>
                          </div>
                          <div className="relative w-full h-[45%] flex items-center justify-center">
                            <Image
                              src={callVibration}
                              alt="callVibration"
                              className="w-[80%] h-auto absolute"
                            />
                            <div className="w-32 h-32 rounded-full p-1 border border-solid border-white z-10 absolute">
                              <Image
                                src={persona_plant}
                                alt="persona_plant"
                                className="w-full h-full rounded-full"
                              />
                            </div>
                          </div>
                          <div className="w-[90%] flex items-start gap-1.5 z-10">
                            <div className="flex items-center gap-1.5 -mt-2">
                              <button 
                                className={`w-10 h-10 ${isMicClicked ? 'bg-[#26AD35] hover:bg-[#26AD35]' : 'bg-[#FFFFFF1A] hover:bg-[#FFFFFF33]'} rounded-full flex items-center justify-center cursor-pointer transition-colors`}
                                onClick={toggleSpeechRecognition}
                              >
                                <MicNoneOutlinedIcon className={`${isMicClicked ? 'text-white' : 'text-[#FFFFFF80]'} !text-[20px]`} />
                              </button>
                              <Image
                                src={callVibration}
                                alt="callVibration"
                                className="w-6 h-10"
                              />
                            </div>
                            <div className="flex flex-col items-start gap-1 w-[80%]">
                              {chatMessages.map((message, index) => (
                                <p key={index} className="text-white text-[14px] sora-regular w-[80%] opacity-70">
                                  <span className="text-[#FFDE5A] sora-semibold">
                                    {message.isUser ? 'You' : 'AI'}
                                  </span>
                                  &nbsp;{message.text}
                                </p>
                              ))}
                              {isMicClicked && transcript && (
                                <p className="text-white text-[14px] sora-regular w-[80%] opacity-100">
                                  <span className="text-[#FFDE5A] sora-semibold">
                                    You
                                  </span>
                                  &nbsp;{transcript}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : slug === "video" ? (
                        <div className="absolute inset-0 p-5 w-full h-full flex flex-col items-center gap-2.5">
                          {/* AI */}
                          <div className="relative backdrop-blur-[5px] shadow-[0px_10px_30px_0px_#00000033] bg-[#FFFFFF05] overflow-hidden rounded-[10px] p-2.5">
                            <div className="bg-[url(../../public/assets/images/RealSales-user-images/persona-plant.png)] w-80 h-44 bg-cover bg-no-repeat rounded-[10px]" />
                            <div class="bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_70%)] absolute top-2.5 left-2.5 right-2.5 rounded-t-[10px] z-10 px-4 py-2 flex gap-2">
                              <CustomTooltip
                                title={micAi ? "Mute" : "Muted"}
                                placement="right"
                                arrow
                              >
                                <div
                                  className="w-9 h-9 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer"
                                  onClick={() => setMicAi(!micAi)}
                                >
                                  {micAi ? (
                                    <MicNoneOutlinedIcon className="text-white !text-[20px]" />
                                  ) : (
                                    <MicOffSharpIcon className="text-white !text-[20px]" />
                                  )}
                                </div>
                              </CustomTooltip>
                              {micAi ? (
                                <Image
                                  src={callVibration}
                                  alt="callVibration"
                                  className="w-8 h-10"
                                />
                              ) : null}
                            </div>
                            <div class="bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_70%)] absolute bottom-2.5 left-2.5 right-2.5 rounded-t-[10px] z-10 px-4 py-2 flex gap-2">
                              <div className="backdrop-blur-[10px] py-2 px-4 w-full rounded-[10px] flex items-center gap-4 overflow-hidden">
                                <div className="border border-solid border-white rounded-full w-10 h-10 p-0.5">
                                  <Image
                                    src={persona_plant}
                                    alt={"persona_plant"}
                                    className="rounded-full w-full h-full"
                                  />
                                </div>
                                <p className="z-10 m-plus-rounded-1c-medium text-white text-[15px] w-[75%] truncate">
                                  <span className="text-[#FFDE5A]">
                                    Hlw dear!
                                  </span>
                                  &nbsp;are you excited?
                                </p>
                                <div className="bg-[url(../../public/assets/images/RealSales-abstracts/call-vibration.png)] bg-cover bg-center bg-no-repeat w-[80%] h-[200%] absolute -bottom-[70%] right-0 opacity-40" />
                              </div>
                            </div>
                          </div>

                          {/* user */}
                          <div className="relative backdrop-blur-[5px] shadow-[0px_10px_30px_0px_#00000033] bg-[#FFFFFF05] overflow-hidden rounded-[10px] p-2.5">
                            <div className="bg-[url(../../public/assets/images/RealSales-user-images/persona-plant.png)] w-80 h-44 bg-cover bg-no-repeat rounded-[10px]" />
                            <div class="bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_70%)] absolute top-2.5 left-2.5 right-2.5 rounded-t-[10px] z-10 px-4 py-2 flex gap-2">
                              <CustomTooltip
                                title={micUser ? "Mute" : "Muted"}
                                placement="right"
                                arrow
                              >
                                <div
                                  className="w-9 h-9 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer"
                                  onClick={() => setMicUser(!micUser)}
                                >
                                  {micUser ? (
                                    <MicNoneOutlinedIcon className="text-white !text-[20px]" />
                                  ) : (
                                    <MicOffSharpIcon className="text-white !text-[20px]" />
                                  )}
                                </div>
                              </CustomTooltip>
                              {micUser ? (
                                <Image
                                  src={callVibration}
                                  alt="callVibration"
                                  className="w-8 h-10"
                                />
                              ) : null}
                            </div>
                            <div class="bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_70%)] absolute bottom-2.5 left-2.5 right-2.5 rounded-t-[10px] z-10 px-4 py-2 flex gap-2">
                              <div className="backdrop-blur-[10px] py-2 px-4 w-full rounded-[10px] flex items-center gap-4 overflow-hidden">
                                <div className="border border-solid border-white rounded-full w-10 h-10 p-0.5">
                                  <Image
                                    src={persona_plant}
                                    alt={"persona_plant"}
                                    className="rounded-full w-full h-full"
                                  />
                                </div>
                                <p className="z-10 m-plus-rounded-1c-medium text-white text-[15px] w-[75%] truncate">
                                  <span className="text-[#FFDE5A]">Yes,</span>
                                  &nbsp;I'm feel very nice ...
                                </p>
                                <div className="bg-[url(../../public/assets/images/RealSales-abstracts/call-vibration.png)] bg-cover bg-center bg-no-repeat w-[80%] h-[200%] absolute -bottom-[70%] right-0 opacity-40" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* bottom */}
                <div className="fixed bottom-8 w-[60%] flex flex-col items-start gap-2 z-20">
                  <div>
                    <p className="sora-regular text-white text-sm">
                      To proceed your dream chat:
                    </p>
                    <p className="sora-thin text-white text-lg">
                      Say "Hi" to your Persona !!
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
                    <CustomTooltip title={"End Call"} placement="top" arrow>
                      <div
                        className="w-10 h-10 bg-[#FE0000] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          dispatch(EndChatValue({ open: true, type: "audio" }));
                        }}
                      >
                        <CallEndSharpIcon className="text-white" />
                      </div>
                    </CustomTooltip>
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
                <div className="h-[20vh] w-full text-transparent"></div>
              </div>

              {/* right */}
              <div className="w-[30%]">
                <FormControlLabel
                  defaultChecked
                  value="end"
                  control={
                    <Radio
                      checked={true}
                      sx={{
                        cursor: "default",
                        color: "#FFDE5A",
                        "&.Mui-checked": {
                          color: "#FFDE5A", // checked color
                        },
                      }}
                    />
                  }
                  label={
                    <p className="sora-semilight text-sm">
                      RealSales Coaching Panel:
                    </p>
                  }
                  sx={{
                    cursor: "default",
                    color: "#FFFFFF", // label text color
                  }}
                />
                <div className="flex items-center gap-2">
                  <p className="sora-semilight text-sm text-white">
                    Coaching mode:
                  </p>
                  <Switch
                    className="coustomChatSwitch !h-[35px] !w-[70px] !p-0"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  {/* card top */}
                  <div className="border border-solid border-[#14558C4D] bg-[linear-gradient(90deg,rgba(20,85,140,0.3)_0%,rgba(20,85,140,0)_50%,rgba(20,85,140,0.3)_100%)] relative">
                    <div className="flex flex-col gap-2 p-4">
                      <div className="relative flex items-center justify-start">
                        <div className="w-10 h-10 bg-[#14558C] rounded-full" />
                        <p class="absolute left-1 rounded-[5px] bg-[linear-gradient(90deg,#14558C_0%,#5586B0_100%)] w-fit sora-regular text-sm text-white px-3 py-1 capitalize">
                          Response Tips
                        </p>
                      </div>
                      <div className="w-full flex items-start gap-2">
                        <div className="w-16 hg-16 p-1 border border-solid border-white rounded-full">
                          <Image
                            src={personaExtra}
                            alt="personaExtra"
                            className="w-full h-full rounded-full"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-white text-[20px] m-plus-rounded-1c-regular">
                            Understand the Context
                          </h1>
                          <p className="text-white text-[14px] m-plus-rounded-1c-light w-[80%]">
                            Lorem Ipsum is the simply dummy text of t ...
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-end gap-2">
                        <div class="bg-[linear-gradient(90deg,#26AD35_0%,#0C7618_100%)] flex items-center gap-1 px-2 pt-0.5 pb-1 rounded-full w-fit">
                          <p className="text-white text-[12px]">Check</p>
                          <CheckCircleOutlineOutlinedIcon className="text-white !text-[17px]" />
                        </div>
                        <div class="bg-[linear-gradient(90deg,#CF2427_0%,#ED3B3E_100%)] flex items-center gap-1 px-2 pt-0.5 pb-1 rounded-full w-fit">
                          <p className="text-white text-[12px]">Ignore</p>
                          <CheckCircleOutlineOutlinedIcon className="text-white !text-[17px]" />
                        </div>
                      </div>
                    </div>
                    <p class="absolute right-0 top-4 bg-[linear-gradient(90deg,rgba(38,173,53,0.8)_0%,rgba(38,173,53,0)_100%)] w-fit sora-regular text-[12px] text-white px-2.5 py-1 capitalize">
                      Acknowledged
                    </p>
                  </div>
                  {/* card stack */}
                  <div className="relative">
                    <div className="flex flex-col gap-2 h-[45vh] overflow-y-auto">
                      {coachingArr?.map((v, idx) => (
                        <div
                          className={`border-l-4 border-solid relative ${
                            idx % 2 === 0
                              ? "border-[#26AD35B2] bg-[linear-gradient(90deg,rgba(38,173,53,0.2)_0%,rgba(38,173,53,0)_63.5%)]"
                              : "border-[#E59E2CB2] bg-[linear-gradient(90deg,rgba(229,158,44,0.2)_0%,rgba(229,158,44,0)_63.5%)]"
                          }`}
                        >
                          <div className="flex flex-col gap-2 p-4">
                            <div className="relative flex items-center justify-start">
                              <div
                                className={`w-10 h-10 ${
                                  idx % 2 === 0
                                    ? "bg-[#26AD35]"
                                    : "bg-[#E59E2C]"
                                } rounded-full`}
                              />
                              <p
                                class={`absolute left-1 rounded-[5px] ${
                                  idx % 2 === 0
                                    ? "bg-[linear-gradient(90deg,#26AD35_0%,#077A15_100%)]"
                                    : "bg-[linear-gradient(90deg,#E59E2C_0%,#A36B12_100%)]"
                                } w-fit sora-regular text-sm text-white px-3 py-1 capitalize`}
                              >
                                Response Tips
                              </p>
                            </div>
                            <div className="w-full flex items-start gap-2">
                              <div className="w-16 hg-16 p-1 border border-solid border-white rounded-full">
                                <Image
                                  src={personaExtra}
                                  alt="personaExtra"
                                  className="w-full h-full rounded-full"
                                />
                              </div>
                              <div className="flex flex-col">
                                <h1 className="text-white text-[20px] m-plus-rounded-1c-regular">
                                  Understand the Context
                                </h1>
                                <p className="text-white text-[14px] m-plus-rounded-1c-light w-[80%]">
                                  Lorem Ipsum is the simply dummy text of t ...
                                </p>
                              </div>
                            </div>
                            <div className="w-full flex items-center justify-end gap-2">
                              <div class="bg-[linear-gradient(90deg,#26AD35_0%,#0C7618_100%)] flex items-center gap-1 px-2 pt-0.5 pb-1 rounded-full w-fit">
                                <p className="text-white text-[12px]">Check</p>
                                <CheckCircleOutlineOutlinedIcon className="text-white !text-[17px]" />
                              </div>
                              <div class="bg-[linear-gradient(90deg,#CF2427_0%,#ED3B3E_100%)] flex items-center gap-1 px-2 pt-0.5 pb-1 rounded-full w-fit">
                                <p className="text-white text-[12px]">Ignore</p>
                                <CheckCircleOutlineOutlinedIcon className="text-white !text-[17px]" />
                              </div>
                            </div>
                          </div>
                          <p class="absolute right-0 top-4 bg-[linear-gradient(90deg,rgba(207,36,39,0.8)_0%,rgba(207,36,39,0)_100%)] w-fit sora-regular text-[12px] text-white px-2.5 py-1 capitalize">
                            Acknowledged
                          </p>
                        </div>
                      ))}
                      <div class="z-10 absolute bottom-0 bg-[linear-gradient(0deg,#262D3E_0%,rgba(38,45,62,0)_100%)] w-[calc(100%_-_8px)] h-[20vh]"></div>
                    </div>
                  </div>

                  <FormControlLabel
                    defaultChecked
                    value="end"
                    control={
                      <Radio
                        checked={true}
                        sx={{
                          cursor: "default",
                          color: "#FFDE5A",
                          "&.Mui-checked": {
                            color: "#FFDE5A", // checked color
                          },
                        }}
                      />
                    }
                    label={
                      <p className="sora-semilight text-sm">
                        RealSales Coaching Panel:
                      </p>
                    }
                    sx={{
                      cursor: "default",
                      color: "#FFFFFF", // label text color
                    }}
                  />
                  <div className="flex flex-col gap-2 h-[40vh] overflow-y-auto">
                    {qnaArr?.map((v, i) => (
                      <div key={i} className="w-full flex flex-col gap-1">
                        <div
                          className="bg-[#FFDE5AE5] border-2 border-solid border-[#7d7349] rounded-[5px] p-2 flex items-start gap-1 cursor-pointer"
                          onClick={() => {
                            setOpenAnswer(i);
                          }}
                        >
                          <Image src={ideaIcon} alt="ideaIcon" className="" />
                          <p className="sora-light text-[#060606] text-[15px] mt-1">
                            {v?.question}
                          </p>
                        </div>
                        {openAnswer === i ? (
                          <p
                            className="bg-[#00000000] border-2 border-solid border-[#7d7349] rounded-[5px] py-2 px-3 flex items-start gap-1 m-plus-rounded-1c-regular text-white text-[14px]"
                            onClick={() => {}}
                          >
                            {v?.answer}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Chat;
