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
  Box,
  FormControlLabel,
  Modal,
  Radio,
  styled,
  Switch,
  Tooltip,
  tooltipClasses,
  useMediaQuery,
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
import { apis } from "../../utils/apis";
import { useApi } from "../../hooks/useApi";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import soundWave from "../../../public/assets/gifs/soundWave.gif";
import soundWaveAi from "../../../public/assets/gifs/soundWaveAi.gif";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AddSummary } from "../../redux/SummaryReducer";
import { showToast } from "../../utils/toastConfig";
import DeleteIcon from "@mui/icons-material/Delete";

// Update the SpeakingIndicator component
const SpeakingIndicator = ({
  isActive,
  color = "#26AD35",
  transcript = "",
  isAi = false,
}) => {
  const [heights, setHeights] = useState([40, 60, 80, 100, 80, 60, 40]);
  const [currentWord, setCurrentWord] = useState("");
  const wordInterval = useRef(null);
  const prevHeightsRef = useRef(heights);

  useEffect(() => {
    if (isActive && transcript) {
      if (isAi) {
        // For AI, simulate word-by-word animation
        const words = transcript.split(" ");
        let currentIndex = 0;

        if (wordInterval.current) {
          clearInterval(wordInterval.current);
        }

        wordInterval.current = setInterval(() => {
          if (currentIndex < words.length) {
            setCurrentWord(words[currentIndex]);
            // Generate heights based on current word with smooth transitions
            const newHeights = heights.map((_, index) => {
              const wordLength = words[currentIndex].length;
              const baseHeight = (wordLength * 10) % 60;
              const randomFactor = Math.random() * 30; // Reduced random factor for smoother transitions
              const targetHeight = Math.min(
                100,
                Math.max(20, baseHeight + randomFactor)
              );
              // Smooth transition from previous height
              const prevHeight = prevHeightsRef.current[index];
              return Math.round(prevHeight + (targetHeight - prevHeight) * 0.3);
            });
            prevHeightsRef.current = newHeights;
            setHeights(newHeights);
            currentIndex++;
          } else {
            clearInterval(wordInterval.current);
            setCurrentWord("");
          }
        }, 150); // Faster interval for smoother animation
      } else {
        // For user, use transcript length with smooth transitions
        const newHeights = heights.map((prevHeight, index) => {
          const baseHeight = transcript.length % 60;
          const randomFactor = Math.random() * 30; // Reduced random factor
          const targetHeight = Math.min(
            100,
            Math.max(20, baseHeight + randomFactor)
          );
          // Smooth transition from previous height
          return Math.round(prevHeight + (targetHeight - prevHeight) * 0.3);
        });
        prevHeightsRef.current = newHeights;
        setHeights(newHeights);
      }
    }

    return () => {
      if (wordInterval.current) {
        clearInterval(wordInterval.current);
      }
    };
  }, [transcript, isActive, isAi]);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-[2px] h-6">
        <div className="flex items-end gap-[2px] h-full">
          {isActive && transcript ? (
            // Show animated bars when active and has transcript
            heights.map((height, index) => (
              <div
                key={index}
                className="w-[2px] rounded-full"
                style={{
                  height: `${height}%`,
                  transform: "scaleY(1)",
                  transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                  backgroundColor: color,
                  opacity: 0.8 + (height / 100) * 0.2, // Dynamic opacity based on height
                }}
              />
            ))
          ) : (
            // Show single line when inactive or no transcript
            <div
              className="w-[2px] rounded-full"
              style={{
                height: "20%",
                transform: "scaleY(1)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundColor: color,
                opacity: 0.5,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Add this style block at the top of your file, after the imports
const styles = `
@keyframes wave {
  0%, 100% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1);
  }
}
`;

const Chat = ({ slug, children }) => {
  const { Post, Get } = useApi();
  const { chat_chat, coaching, documents_upload } = apis;
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state?.auth?.user);
  const summary = useSelector((state) => state?.summary?.summary);

  const [checked, setChecked] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(0);
  const [micUser, setMicUser] = useState(true);
  const [micAi, setMicAi] = useState(true);
  const [isMicClicked, setIsMicClicked] = useState(false);
  const [isVolClicked, setIsVolClicked] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [transcriptDummy, setTranscriptDummy] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatMessagesView, setChatMessagesView] = useState([]);
  const [triggerSenChat, setTriggerSenChat] = useState(false);
  const [resChat, setResChat] = useState([]);
  const [resChatView, setResChatView] = useState([]);
  const [session_id, setSession_id] = useState("");
  const recognitionRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const isSilenceTimeoutRef = useRef(false);
  const lastSpeechTimeRef = useRef(null);
  const containerRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [personaData, setPersonaData] = useState({});
  const audioRef = useRef(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [tour, setTour] = useState(false);
  const [oneLineChatText, setOneLineChatText] = useState("");
  const [coachingMessage, setCoachingMessage] = useState("");
  const [addDocText, setAddDocText] = useState({});
  const [coachingAround, setCoachingAround] = useState(false);
  const [coachingData, setCoachingData] = useState([]);
  const [coachingAccept, setCoachingAccept] = useState([]);
  const [showCoachingData, setShowCoachingData] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isChatPosting, setIsChatPosting] = useState(false);
  const [upgrade, setUpgrade] = useState(true);
  const [audioPrimed, setAudioPrimed] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [fileError, setFileError] = useState("");

  console.log(coachingAccept, coachingData, "coachingAccept");
  useEffect(() => {
    setTour(true);
  }, []);

  useEffect(() => {
    setAddDocText(summary);
  }, [summary?.summary]);

  console.log(addDocText, "addDocText");

  // Add these new refs
  const isProcessingRef = useRef(false);
  const lastProcessedTextRef = useRef("");
  const lastAddedTranscriptRef = useRef("");

  const startCoaching = async (id) => {
    try {
      let data = await Get(`${coaching}${id}`);
      if (data?.session_id) {
        setCoachingMessage(data?.message);
        setCoachingData((pre) => [
          { id: `${coachingData?.length + 1}`, ...data },
          ...pre,
        ]);
        setCoachingAround(false);
        setCoachingAround(false);
        console.log(data, "session_data__");
      }
    } catch (error) {
      console.log(error, "__error");
    } finally {
      setCoachingAround(false);
      setCoachingAround(false);
    }
  };

  // const stopCoaching = async (id) => {
  //   try {
  //     let data = await Post(`${coaching}stop/${id}`);
  //     if (data?.session_id) {
  //       console.log(data, "session_data__");
  //     }
  //   } catch (error) {
  //     console.log(error, "__error");
  //   }
  // };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let sessionId = localStorage.getItem("session_id");
      let persona_data = localStorage.getItem("persona_data");
      if (persona_data) {
        let parse_persona_data = JSON.parse(persona_data);
        if (parse_persona_data?.industry) {
          setPersonaData(parse_persona_data);
        }
      }
      if (sessionId) {
        setSession_id(sessionId);
      }
    }
  }, []);

  useEffect(() => {
    let recognition = null;

    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      try {
        const SpeechRecognition =
          window.webkitSpeechRecognition || window.SpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          console.log("Speech recognition started");
          isSilenceTimeoutRef.current = false;
          lastSpeechTimeRef.current = Date.now();
        };

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript.trim();

          // Ignore empty transcripts
          if (!transcript) return;

          setTranscript(transcript);
          setTranscriptDummy(transcript);
          lastSpeechTimeRef.current = Date.now();

          if (event.results[current].isFinal) {
            // Prevent duplicate final transcripts
            if (lastAddedTranscriptRef.current === transcript) return;
            lastAddedTranscriptRef.current = transcript;

            setChatMessages((prev) => [
              ...prev,
              {
                text: transcript,
                isUser: true,
                timestamp: new Date().toISOString(),
              },
            ]);

            setChatMessagesView((prev) => [
              {
                text: transcript,
                isUser: true,
                timestamp: new Date().toISOString(),
              },
              ...prev,
            ]);
            setTranscript("");
            // setTranscriptDummy("");
          }
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          if (event.error === "no-speech") {
            return;
          }
          setIsMicClicked(false);
          isSilenceTimeoutRef.current = false;
          lastSpeechTimeRef.current = null;
        };

        recognition.onend = () => {
          console.log("Speech recognition ended");
          if (isMicClicked && !isSilenceTimeoutRef.current) {
            try {
              recognition.start();
            } catch (error) {
              console.error("Error restarting recognition:", error);
            }
          }
        };

        recognitionRef.current = recognition;
      } catch (error) {
        console.error("Failed to initialize speech recognition:", error);
      }
    }

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (error) {
          console.error("Error stopping recognition:", error);
        }
      }
    };
  }, []);

  // Log transcript when mic is off
  // useEffect(() => {

  //   if (!isMicClicked) {
  //     if (transcript !== "") {
  //       console.log(transcript, "_micAi_");
  //     }
  //   }
  // }, [!isMicClicked, transcript]);

  // console.log(transcript,isMicClicked, "_micAi_");
  // Add a new effect to check for silence
  useEffect(() => {
    let silenceCheckInterval;

    if (isMicClicked) {
      silenceCheckInterval = setInterval(() => {
        if (
          lastSpeechTimeRef.current &&
          Date.now() - lastSpeechTimeRef.current >= 15000
        ) {
          // If no speech detected for 15 seconds
          isSilenceTimeoutRef.current = true;
          if (recognitionRef.current) {
            try {
              recognitionRef.current.stop();
            } catch (error) {
              console.error("Error stopping recognition:", error);
            }
          }
          setTranscript("");
          if (oneLineChatText?.length || chatMessages?.length) {
            setTriggerSenChat(true);
          }
          lastSpeechTimeRef.current = null;
        }
      }, 15000); // Check every second
    }

    return () => {
      if (silenceCheckInterval) {
        clearInterval(silenceCheckInterval);
      }
    };
  }, [isMicClicked, transcript]);

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
          setTranscript("");
          setTranscriptDummy("");
          setChatMessages([]);
        }
      } catch (error) {
        console.error("Error toggling speech recognition:", error);
        setIsMicClicked(false);
        lastSpeechTimeRef.current = null;
      }
    } else {
      console.error("Speech recognition not supported in this browser");
    }
  };
  console.log(transcriptDummy, "transcriptDummy");
  const textToSpeech = async (text) => {
    try {
      // Check if we're already processing or if this is the same text
      if (isProcessingRef.current || text === lastProcessedTextRef.current) {
        console.log("Skipping duplicate or already processing request");
        return;
      }

      if (!text) {
        console.log("No text provided for text-to-speech");
        return;
      }

      // Set processing flag and store the text
      isProcessingRef.current = true;
      lastProcessedTextRef.current = text;

      setIsAiThinking(true);
      console.log("Starting text-to-speech conversion for:", text);

      // Add delay between requests to prevent rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
            Accept: "audio/mpeg",
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.detail?.status === "detected_unusual_activity") {
          console.error(
            "ElevenLabs API rate limit or abuse detection triggered"
          );
          setIsAutoMode(false);
          setIsAiThinking(false);
          isProcessingRef.current = false;
          return;
        }
        throw new Error(
          `Failed to convert text to speech: ${JSON.stringify(errorData)}`
        );
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        try {
          setIsAiThinking(false);
          setIsAiSpeaking(true);
          await audioRef.current.play();
          setIsSpeaking(true);
          console.log("Audio playback started");
        } catch (playError) {
          console.error("Error playing audio:", playError);
          setIsSpeaking(false);
          setIsAiSpeaking(false);
        }
      } else {
        console.error("Audio element not found");
        setIsAiThinking(false);
      }
    } catch (error) {
      console.error("Error in text to speech:", error);
      setIsSpeaking(false);
      setIsAiThinking(false);
      setIsAiSpeaking(false);
    } finally {
      // Reset processing flag after completion or error
      isProcessingRef.current = false;
    }
  };

  // Update the audio element's onended handler
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        console.log("Audio playback ended");
        setIsSpeaking(false);
        setIsAiSpeaking(false);
        // Clear the last processed text when audio ends
        lastProcessedTextRef.current = "";

        // Automatically start listening when speech ends
        if (!isMicClicked) {
          console.log("Starting microphone after speech ended");
          setIsVolClicked(false);
          // toggleSpeechRecognition();
        }
      };

      audioRef.current.onerror = (error) => {
        console.error("Audio playback error:", error);
        setIsSpeaking(false);
        setIsAiSpeaking(false);
        // Clear the last processed text on error
        lastProcessedTextRef.current = "";
      };
    }
  }, []);

  // Effect to handle new responses with rate limiting
  useEffect(() => {
    let timeoutId;
    if (resChat.length > 0 && isVolClicked) {
      const lastResponse = resChat[resChat.length - 1]?.response;
      if (lastResponse && !isSpeaking) {
        // Add delay before speaking to prevent rapid requests
        timeoutId = setTimeout(() => {
          console.log("New response received, speaking:", lastResponse);
          textToSpeech(lastResponse);
        }, 1000);
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [resChat, isVolClicked]);
  console.log(chatMessages, "chatMessages__");

  const senChat = async () => {
    const persona_id = localStorage.getItem("persona_id");
    let oneLineText = "";
    console.log(session_id, persona_id, "session_id_persona_id");
    // console.log(chatMessages, "chatMessages__");
    if (chatMessages?.length) {
      let textData = chatMessages.map((v) => v?.text);
      if (textData?.length) {
        oneLineText = textData.join(" ");
      }
    } else if (oneLineChatText?.length) {
      oneLineText = oneLineChatText;
      setChatMessagesView((prev) => [
        {
          text: oneLineChatText,
          isUser: true,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    setIsChatPosting(true); // Start loading
    if (oneLineText !== "") {
      try {
        let data = await Post(`${chat_chat}/${session_id}`, {
          user_input: addDocText?.summary
            ? `${oneLineText} This is the sales document ${addDocText?.summary}`
            : oneLineText,
          // industry: personaData?.industry,
          // manufacturing_model: personaData?.manufacturing_model,
          // experience_level: personaData?.experience_level,
          // role: personaData?.role,
          // geography: personaData?.geography,
          // plant_size_impact: personaData?.plant_size_impact,
        });

        if (data?.response) {
          setAddDocText({});
          localStorage.removeItem("summary");
          dispatch(AddSummary({}));
          setIsMicClicked(false);
          setTranscriptDummy("");
          setTriggerSenChat(false);
          setIsVolClicked(true);
          setCoachingAround(true);
          setChatMessages([]);
          setOneLineChatText("");

          // Add the response to chat messages
          const newResponse = { response: data.response };
          setResChat((pre) => [...pre, newResponse]);
          setResChatView((pre) => [newResponse, ...pre]);
        }
      } catch (error) {
        console.log(error, "_error_");
      } finally {
        setIsChatPosting(false); // End loading
      }
    } else {
      setAddDocText({});
      localStorage.removeItem("summary");
      dispatch(AddSummary({}));
      setIsMicClicked(false);
      setTranscriptDummy("");
      setTriggerSenChat(false);
      setIsVolClicked(true);
      setCoachingAround(true);
      setChatMessages([]);
      setOneLineChatText("");
      setIsChatPosting(false);
    }
  };

  // Effect to handle triggerSenChat
  useEffect(() => {
    if (triggerSenChat) {
      senChat();
    }
  }, [triggerSenChat]);

  // Effect to handle volume button click
  useEffect(() => {
    if (isVolClicked && resChat.length > 0) {
      const lastResponse = resChat[resChat.length - 1]?.response;
      if (lastResponse && !isSpeaking) {
        console.log("Volume clicked, speaking last response:", lastResponse);
        textToSpeech(lastResponse);
      }
    }
  }, [isVolClicked]);

  // Add auto mode toggle button in the UI
  const toggleAutoMode = () => {
    setIsAutoMode(!isAutoMode);
    setTour(false);
    if (!isAutoMode && !isSpeaking) {
      // Start the conversation if enabling auto mode
      toggleSpeechRecognition();
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    setTranscriptDummy("");
    setChatMessages([]);
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

  useEffect(() => {
    if (session_id) {
      if (checked) {
        if (coachingAround) {
          startCoaching(session_id);
        }
      } else {
        console.log("dont coach");
      }
    }
  }, [session_id, checked, coachingMessage, coachingAround]);

  const coachingArr = [{}, {}, {}];
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

  useEffect(() => {
    // Add the styles to the document
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    return () => {
      // Clean up the styles when component unmounts
      document.head.removeChild(styleSheet);
    };
  }, []);

  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const validExtensions = ["doc", "docx", "pdf"];
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 1MB

    if (files && files.length > 0) {
      // Check for file size before filtering extensions
      const oversizeFile = Array.from(files).find((file) => file.size > MAX_FILE_SIZE);
      if (oversizeFile) {
        setFileError("File size cannot be larger than 10MB. Try again compressing the file");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      const validFiles = Array.from(files).filter((file) => {
        const extension = file.name.split(".").pop().toLowerCase();
        return validExtensions.includes(extension);
      });

      if (validFiles.length > 0) {
        try {
          setIsUploading(true);
          const formData = new FormData();
          validFiles.forEach((file) => {
            formData.append("file", file); // "files" is the field name; adjust if your backend expects a different name
          });
          let data = await Post(documents_upload, formData);
          // Clear the file input after successful upload
          if (data?.summary) {
            setAddDocText(data);
            setFileError("");
            showToast.success("Document uploaded successfully");
          }
          if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
          setFileError("Failed to upload document. Please try again.");
          if (fileInputRef.current) fileInputRef.current.value = "";
        } finally {
          setIsUploading(false);
        }
      } else {
        setFileError("Please upload only .doc, .docx, or .pdf files.");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (isMobile && typeof window !== "undefined") {
      setShowAudioPrompt(true);
    }
  }, [isMobile]);

  // Function to prime audio context
  const handlePrimeAudio = async () => {
    if (audioRef.current) {
      // Create a silent audio blob
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      // Also try to play the audio element (in case browser prefers this)
      try {
        audioRef.current.src = "";
        await audioRef.current.play();
      } catch (e) {}
      setAudioPrimed(true);
      setShowAudioPrompt(false);
    }
  };

  return (
    <div className="lg:p-4 p-0 flex justify-between flex-col">
      {/* Audio priming overlay for mobile */}
      {showAudioPrompt && !audioPrimed && (
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              padding: "1.5rem 2.5rem",
              fontSize: "1.5rem",
              borderRadius: "1rem",
              background: "#FFE942",
              color: "#060606",
              border: "none",
              fontWeight: 700,
              boxShadow: "0 2px 16px #0008",
              cursor: "pointer",
            }}
            onClick={handlePrimeAudio}
          >
            Tap to Enable Audio
          </button>
        </div>
      )}
      <div
        className={`w-auto lg:rounded-[25px] rounded-0 bg-[url(../../public/assets/images/RealSales-backgrounds/bg-4.png)] bg-cover bg-center bg-blend-multiply overflow-hidden relative`}
      >
        {/* <div className="w-full flex flex-col gap-8 h-[calc(100vh_-_32px)] overflow-y-auto bg-[linear-gradient(180deg,rgba(6,6,6,0.9)_0%,rgba(17,24,43,0.9)_62.58%)] px-8 py-4"> */}
        <div className="w-full flex flex-col gap-8 bg-[linear-gradient(180deg,rgba(6,6,6,0.9)_0%,rgba(17,24,43,0.9)_62.58%)] lg:px-8 px-4 py-4">
          {/* header */}
          <div className="flex lg:flex-row flex-col items-center gap-2 justify-between">
            <div className="flex items-center lg:w-[55%] w-full">
              <div className="w-[40%]">
                <div
                  onClick={() => {
                    if (slug === "rating") {
                      router.push("/");
                      localStorage.removeItem("session_id");
                    } else {
                      dispatch(
                        EndChatValue({
                          open: true,
                          type: "audio",
                          chat: chatMessagesView?.length,
                        })
                      );
                    }
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
            <div className="flex items-center justify-end gap-2 lg:w-[45%] w-full">
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
                    {user?.first_name}&nbsp;{user?.last_name}
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
            <div>
              {/* header */}
              <div className="flex lg:flex-row flex-col-reverse gap-2">
                <div className="lg:w-[70%] w-full flex flex-row gap-2">
                  <div className="w-[40%] lg:flex hidden">
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
                  </div>
                  <div className="w-full lg:w-[60%]">
                    <p className="sora-regular text-white text-base capitalize">
                      {slug}-Chat Session:
                    </p>
                    <div className="flex flex-col gap-0.25 w-fit">
                      <p className="m-plus-rounded-1c-light text-white lg:text-2xl text-[18px]">
                        Your Session id:&nbsp;
                        <span className="text-[#FFDE5A]">{session_id}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[30%] w-full">
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
                  <div className="flex items-center lg:justify-start justify-between gap-2">
                    <p className="sora-semilight text-sm text-white">
                      Coaching mode:
                    </p>
                    <Switch
                      className="coustomChatSwitch !h-[35px] !w-[70px] !p-0"
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                  </div>
                </div>
              </div>

              {/* body */}
              <div className="flex lg:flex-row flex-col gap-2">
                {/* left */}
                <div
                  className={`relative ${
                    checked ? "lg:w-[70%] w-full" : "w-full"
                  } mb-40 h-[calc(100vh_-_8rem)] flex flex-col justify-between gap-4`}
                >
                  {/* top */}
                  <div className="w-full flex lg:flex-row flex-col items-start gap-2">
                    {/* top right */}
                    <div
                      className={`lg:flex hidden ${
                        checked ? "w-[40%]" : "w-[28%]"
                      } flex flex-col gap-4`}
                    >
                      <div className="bg-[linear-gradient(180deg,rgba(17,24,43,0.3)_0%,rgba(255,255,255,0.09)_100%)] rounded-[10px] p-4 flex items-center gap-4">
                        <div className="relative w-[125px] h-[160px] overflow-hidden cursor-pointer rounded-[10px]">
                          <Image
                            src={
                              personaData?.profile_pic
                                ? personaData?.profile_pic
                                : persona_plant
                            }
                            alt="persona_plant"
                            width={192}
                            height={108}
                            className="w-full h-full"
                          />
                          <div className="absolute top-0 flex items-end w-full h-full bg-[linear-gradient(16.61deg,#000000_18.44%,rgba(0,0,0,0)_82.49%)]">
                            <div className="flex flex-col p-2">
                              <p className="m-plus-rounded-1c-regular text-[#ffffff] text-[14px] truncate">
                                {personaData?.name}
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
                          {addDocText?.filename ? (
                            <div className="flex items-start gap-2">
                              <p className="text-white m-plus-rounded-1c-medium text-base">
                                {addDocText?.filename}
                              </p>
                              {/* <button
                                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                                onClick={() => {
                                  setAddDocText({});
                                  localStorage.removeItem("summary");
                                  dispatch(AddSummary({}));
                                }}
                                disabled={isUploading}
                                title="Remove document"
                                type="button"
                              > */}
                              <CustomTooltip
                                title={"Remove document"}
                                placement="right"
                                arrow
                              >
                                <DeleteIcon
                                  className="cursor-pointer !text-xl !text-red-500 !hover:text-red-600"
                                  onClick={() => {
                                    setAddDocText({});
                                    localStorage.removeItem("summary");
                                    dispatch(AddSummary({}));
                                  }}
                                />
                              </CustomTooltip>
                              {/* </button> */}
                            </div>
                          ) : isUploading ? (
                            <div className="w-full flex items-center justify-center">
                              <div class="h-8 w-8 rounded-full border-4 border-gray-300 border-t-yellow-500 animate-spin"></div>
                            </div>
                          ) : (
                            <div
                              className={`flex items-center gap-1 ${
                                isAiSpeaking
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                              onClick={isAiSpeaking ? undefined : handleClick}
                            >
                              <p className="text-white m-plus-rounded-1c-medium underline text-lg">
                                Upload&nbsp;Files
                              </p>
                              <AddCircleOutlineSharpIcon className="text-white" />

                              <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".doc,.docx,.pdf"
                                onChange={handleFileChange}
                                disabled={!addDocText?.summary ? false : true}
                              />
                            </div>
                          )}
                          {fileError && (
                            <div className="text-red-500 text-xs mt-1">{fileError}</div>
                          )}
                        </div>
                      </div>

                      {upgrade ? (
                        <div className="relative bg-[linear-gradient(180deg,rgba(17,24,43,0.3)_0%,rgba(255,255,255,0.09)_100%)] rounded-[10px] p-4 flex flex-col items-start gap-2">
                          <div
                            onClick={() => setUpgrade(false)}
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
                      ) : (
                        false
                      )}
                    </div>
                    {/* top left */}
                    <div
                      className={`${
                        checked ? "lg:w-[60%] w-full" : "lg:w-[72%] w-full"
                      } flex flex-col items-center gap-2`}
                    >
                      <hr className="border-[#FFFFFF33] w-full" />
                      <div
                        className={`relative w-full ${
                          checked ? "h-[80vh]" : "h-[85vh]"
                        } overflow-y-auto`}
                      >
                        <div className="absolute inset-0 bg-[url('../../public/assets/images/RealSales-abstracts/glow-light-1.png')] bg-cover bg-center bg-no-repeat opacity-20"></div>
                        {slug === "audio" ? (
                          <div className="absolute inset-0 p-5 w-full h-full flex flex-col items-center">
                            {/* ai mic */}
                            <div className="lg:w-[90%] w-full flex items-start gap-1.5 z-10">
                              <div className="flex items-center gap-1.5 -mt-2 relative">
                                <button
                                  className={`w-10 h-10 ${
                                    isMicClicked
                                      ? "bg-[#26AD35] hover:bg-[#26AD35]"
                                      : "bg-[#FFFFFF1A] hover:bg-[#FFFFFF33]"
                                  } rounded-full flex items-center justify-center cursor-pointer transition-colors`}
                                  onClick={() => {
                                    toggleSpeechRecognition();
                                    setIsVolClicked(false);
                                    setTour(false);
                                  }}
                                >
                                  <MicNoneOutlinedIcon
                                    className={`${
                                      isMicClicked
                                        ? "text-white"
                                        : "text-[#FFFFFF80]"
                                    } !text-[20px]`}
                                  />
                                </button>
                                {tour && (
                                  <div className="left-[130%] absolute flex items-center">
                                    <ArrowLeftIcon className="right-[80%] absolute text-green-500" />
                                    <div className="shadow-md bg-green-500 text-white sora-regular text-sm px-2 rounded">
                                      Start
                                    </div>
                                  </div>
                                )}
                                {transcript && (
                                  <Image
                                    src={soundWave}
                                    alt="soundWave"
                                    className="w-8 h-8"
                                  />
                                )}
                                {/* {isMicClicked && (
                                <SpeakingIndicator
                                  isActive={true}
                                  transcript={transcript}
                                  color="#FFFFFF"
                                />
                              )} */}
                              </div>
                              <div
                                ref={containerRef}
                                className="flex flex-col items-start gap-1 w-[80%] h-[20vh] overflow-y-auto"
                              >
                                {chatMessagesView.map((message, index) => (
                                  <p
                                    key={index}
                                    className="text-white sm:text-base text-[13px] sora-regular w-[80%] opacity-70"
                                  >
                                    <span className="text-[#FFDE5A] sora-semibold">
                                      {message.isUser ? "You" : "AI"}
                                    </span>
                                    &nbsp;{message.text}
                                  </p>
                                ))}
                                {isMicClicked && transcript && (
                                  <p className="text-white sm:text-base text-[13px] sora-regular w-[80%] opacity-100">
                                    <span className="text-[#FFDE5A] sora-semibold">
                                      You
                                    </span>
                                    &nbsp;{transcript}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="relative w-full h-[45%] flex items-center justify-center">
                              {isAiSpeaking ? (
                                resChat[resChat.length - 1]?.response ? (
                                  <Image
                                    src={soundWaveAi}
                                    alt="soundWaveAi"
                                    className="lg:w-[80%] w-full h-auto absolute lg:-top-[15%] top-[15%]"
                                  />
                                ) : (
                                  <Image
                                    src={callVibration}
                                    alt="callVibration"
                                    className="lg:w-[80%] w-full h-auto absolute"
                                  />
                                )
                              ) : (
                                <Image
                                  src={callVibration}
                                  alt="callVibration"
                                  className="lg:w-[80%] w-full h-auto absolute"
                                />
                              )}
                              <div
                                style={{ boxShadow: "0 0 10px 0 #FFE942" }}
                                className={`sm:w-32 w-20 sm:h-32 h-20 rounded-full p-1 border border-solid z-10 absolute flex items-center justify-center backdrop-blur-sm ${
                                  isChatPosting
                                    ? "bg-[#FFE94225] border-[#FFE942]"
                                    : "bg-[#ffffff31] border-[#FFE942]"
                                } ${
                                  !checked
                                    ? "lg:top-[10%] top-[30%]"
                                    : "lg:top-[10%] top-[30%]"
                                }`}
                              >
                                {isChatPosting ? (
                                  <div className="w-full flex items-center justify-center">
                                    <div class="h-12 w-12 rounded-full border-8 border-white border-t-[#FFE942] animate-spin"></div>
                                  </div>
                                ) : (
                                  <Image
                                    src={
                                      personaData?.profile_pic
                                        ? personaData?.profile_pic
                                        : persona_plant
                                    }
                                    width={192}
                                    height={108}
                                    alt="persona_plant"
                                    className="w-full h-full rounded-full"
                                  />
                                )}
                              </div>
                            </div>

                            {/* ai chat */}
                            <div className="lg:w-[90%] w-full flex items-start gap-1.5 z-10">
                              <div className="flex items-center gap-1.5">
                                <button
                                  className={`p-1.5 flex-s 
                                  ${
                                    isVolClicked
                                      ? "bg-[#26AD35] hover:bg-[#26AD35]"
                                      : "bg-[#FFFFFF1A] hover:bg-[#FFFFFF33]"
                                  }
                                rounded-full flex items-center justify-center cursor-pointer transition-colors`}
                                  onClick={() => {
                                    if (!isVolClicked) {
                                      setIsVolClicked(true);
                                    } else {
                                      setIsVolClicked(false);
                                      // setIsMicClicked(true);
                                    }
                                  }}
                                >
                                  <VolumeUpIcon
                                    className={`${
                                      isVolClicked
                                        ? "text-white"
                                        : "text-[#FFFFFF80]"
                                    } !text-[20px]`}
                                  />
                                </button>
                                {isAiSpeaking
                                  ? resChat[resChat.length - 1]?.response && (
                                      <Image
                                        src={soundWaveAi}
                                        alt="soundWaveAi"
                                        className="lg:w-8 w-6 lg:h-8 h-6"
                                      />
                                    )
                                  : null}
                                {/* {isAiSpeaking && <SpeakingIndicator isActive={true} color="#FFDE5A" transcript={resChat[resChat.length - 1]?.response || ""} isAi={true} />} */}
                                {/* {isAiSpeaking && (
                                <SpeakingIndicator
                                  isActive={true}
                                  color="#26AD35"
                                  transcript={
                                    resChat[resChat.length - 1]?.response || ""
                                  }
                                  isAi={true}
                                />
                              )} */}
                              </div>
                              <div
                                ref={containerRef}
                                className="w-[90%] flex flex-col items-start h-[20vh] overflow-y-auto mt-1.5"
                              >
                                {/* <span className="text-[#FFDE5A] sora-semibold">
                                Hello!
                              </span>
                              &nbsp;how are you !! */}
                                {resChatView?.length
                                  ? resChatView.map((v, i) => (
                                      <p
                                        key={i}
                                        className="pr-4 text-white sm:text-base text-[13px] sora-regular"
                                      >
                                        <span className="text-[#FFDE5A] sora-semibold">
                                          AI Client
                                        </span>
                                        &nbsp;{v?.response}
                                      </p>
                                    ))
                                  : null}
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
                  <div
                    className={`fixed bottom-8 ${
                      checked ? "lg:w-[60%] w-[90%]" : "w-[90%]"
                    } flex flex-col items-start gap-2 z-20`}
                  >
                    <div>
                      <p className="sora-regular text-white text-sm">
                        To proceed your dream chat:
                      </p>
                      <p className="sora-thin text-white text-lg">
                        Say "Hi" to your Persona !!
                      </p>
                    </div>
                    <div className="w-full flex items-center gap-2">
                      {/* <div className="w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer">
                        <Image
                          src={menueIcon}
                          alt="menueIcon"
                          className="w-4 h-auto"
                        />
                      </div> */}
                      <CustomTooltip
                        // title={
                        //   chatMessagesView?.length >= 5
                        //     ? "End Call"
                        //     : "Exchange at least 5 chat before ending"
                        // }
                        title={"End Call"}
                        placement="top"
                        arrow
                      >
                        {/* ${
                            chatMessagesView?.length >= 5
                              ? "bg-[#FE0000]"
                              : "bg-[#ff6e6e]"
                          } */}
                        <div
                          className={`p-2 bg-[#FE0000] rounded-full flex items-center justify-center cursor-pointer`}
                          onClick={() => {
                            if (chatMessagesView?.length >= 5) {
                              dispatch(
                                EndChatValue({
                                  open: true,
                                  type: "audio",
                                  chat: chatMessagesView?.length,
                                })
                              );
                            } else {
                              dispatch(
                                EndChatValue({
                                  open: true,
                                  type: "audio",
                                  chat: chatMessagesView?.length,
                                })
                              );
                            }
                          }}
                        >
                          <CallEndSharpIcon className="text-white" />
                        </div>
                      </CustomTooltip>
                      <div className="bg-[#ffffff8f] p-1 pl-2 rounded-full flex justify-between items-center lg:w-[80%] w-full">
                        <input
                          disabled={isAiSpeaking}
                          placeholder="Chat with your AI Trainer ..."
                          className="border-0 outline-0 !py-1 !px-4 w-full text-white m-plus-rounded-1c-regular"
                          value={oneLineChatText}
                          onChange={(e) => {
                            setTour(false);
                            setOneLineChatText(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // setOneLineChatText(e.target.value);
                              // e.preventDefault();
                              if (oneLineChatText?.length) {
                                senChat();
                              }
                            }
                          }}
                        />
                        <div
                          className={`flex items-center !text-[#060606D9] bg-[#FFE942] hover:bg-[#ffdc42] !capitalize py-1 px-1.5 !rounded-full mr-2 ${
                            isAiSpeaking
                              ? "cursor-not-allowed"
                              : addDocText?.summary
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          onClick={isAiSpeaking ? undefined : handleClick}
                        >
                          {isUploading ? (
                            <div className="w-full flex items-center justify-center">
                              <div class="h-[25px] w-[25px] rounded-full border-4 border-white border-t-[#FFE942] animate-spin"></div>
                            </div>
                          ) : (
                            <AttachFileIcon />
                          )}
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".doc,.docx,.pdf"
                            onChange={handleFileChange}
                            disabled={!addDocText?.summary ? false : true}
                          />
                        </div>
                        <div
                          onClick={() => {
                            if (isAiSpeaking) {
                              undefined;
                            } else {
                              if (oneLineChatText?.length) {
                                senChat();
                              }
                            }
                          }}
                          className={`flex items-center gap-2 !text-[#060606D9] bg-[#FFE942] hover:bg-[#ffdc42] !capitalize !py-1 !px-1 !rounded-full ${
                            isAiSpeaking
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          {/* <span className="m-plus-rounded-1c-medium">
                          Send&nbsp;Message
                        </span> */}
                          <SendMessage />
                        </div>
                      </div>
                      <div
                        className={`p-2 relative ${
                          isAutoMode ? "bg-[#26AD35]" : "bg-[#FFFFFF1A]"
                        } rounded-full flex items-center justify-center cursor-pointer`}
                        onClick={toggleAutoMode}
                      >
                        <MicNoneOutlinedIcon
                          className={`${
                            isAutoMode ? "text-white" : "text-[#FFFFFF80]"
                          } !text-[20px]`}
                        />
                        {tour && (
                          <div className="left-[130%] absolute lg:flex hidden items-center ">
                            <ArrowLeftIcon className="right-[80%] absolute text-green-500" />
                            <div className="shadow-md bg-green-500 text-white sora-regular text-sm px-2 rounded">
                              Start
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="lg:flex hidden w-14 h-14 rounded-full p-1 border-2 border-solid border-white overflow-hidden">
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
                {checked ? (
                  <div className="lg:w-[30%] w-full">
                    <div className="flex flex-col gap-2">
                      {/* card top */}
                      {/* <div className="border border-solid border-[#14558C4D] bg-[linear-gradient(90deg,rgba(20,85,140,0.3)_0%,rgba(20,85,140,0)_50%,rgba(20,85,140,0.3)_100%)] relative">
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
                                Lorem Ipsum is the simply dummy text of t...
                              </p>
                            </div>
                          </div>
                        </div>
                        <p class="absolute right-0 top-4 bg-[linear-gradient(90deg,rgba(38,173,53,0.8)_0%,rgba(38,173,53,0)_100%)] w-fit sora-regular text-[12px] text-white px-2.5 py-1 capitalize">
                          Acknowledged
                        </p>
                      </div> */}
                      {/* card stack */}
                      <div className="relative">
                        <div
                          className={`flex flex-col gap-2 ${
                            coachingData?.length ? "h-[85vh]" : ""
                          } overflow-y-auto`}
                        >
                          {coachingData?.length
                            ? coachingData.map((v, idx) => (
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
                                    <div className="w-full flex flex-col items-start gap-2">
                                      <div className="w-full flex items-start gap-2">
                                        <div className="w-16 hg-16 p-1 border border-solid border-white rounded-full">
                                          <Image
                                            src={personaExtra}
                                            alt="personaExtra"
                                            className="w-full h-full rounded-full"
                                          />
                                        </div>
                                        <div className="flex flex-col w-[80%]">
                                          <h1 className="text-white text-[20px] m-plus-rounded-1c-regular">
                                            Here's your coaching feedback:
                                          </h1>
                                        </div>
                                      </div>
                                      <div
                                        className="text-white text-[14px] m-plus-rounded-1c-light cursor-pointer"
                                        onClick={() => {
                                          if (showCoachingData === "") {
                                            setShowCoachingData(v?.id);
                                          } else {
                                            setShowCoachingData("");
                                          }
                                        }}
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            showCoachingData !== ""
                                              ? v?.coaching_feedback
                                              : v?.coaching_feedback.slice(
                                                  0,
                                                  80
                                                ) + "...",
                                        }}
                                      />
                                    </div>
                                    {coachingAccept.some(
                                      (val) => val?.id === v?.id
                                    ) ? null : (
                                      <div className="w-full flex items-center justify-end gap-2">
                                        <div
                                          onClick={() =>
                                            setCoachingAccept((pre) => [
                                              ...pre,
                                              { id: v?.id },
                                            ])
                                          }
                                          class="bg-[linear-gradient(90deg,#26AD35_0%,#0C7618_100%)] flex items-center gap-1 px-2 pt-0.5 pb-1 rounded-full w-fit cursor-pointer"
                                        >
                                          <p className="text-white text-[12px]">
                                            Check
                                          </p>
                                          <CheckCircleOutlineOutlinedIcon className="text-white !text-[17px]" />
                                        </div>
                                        <div
                                          onClick={() => {
                                            setCoachingData((prev) =>
                                              prev.filter(
                                                (item) => item.id !== v?.id
                                              )
                                            );
                                          }}
                                          class="bg-[linear-gradient(90deg,#CF2427_0%,#ED3B3E_100%)] flex items-center gap-1 px-2 pt-0.5 pb-1 rounded-full w-fit cursor-pointer"
                                        >
                                          <p className="text-white text-[12px]">
                                            Ignore
                                          </p>
                                          <CheckCircleOutlineOutlinedIcon className="text-white !text-[17px]" />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <p
                                    class={`absolute right-0 top-4 ${
                                      coachingAccept.some(
                                        (val) => val?.id === v?.id
                                      )
                                        ? "bg-[linear-gradient(90deg,rgba(38,173,53,0.8)_0%,rgba(38,173,53,0)_100%)]"
                                        : "bg-[linear-gradient(90deg,rgba(207,36,39,0.8)_0%,rgba(207,36,39,0)_100%)]"
                                    } w-fit sora-regular text-[12px] text-white px-2.5 py-1 capitalize`}
                                  >
                                    Acknowledged
                                  </p>
                                </div>
                              ))
                            : null}
                          {/* <div class="z-10 absolute bottom-0 bg-[linear-gradient(0deg,#262D3E_0%,rgba(38,45,62,0)_100%)] w-[calc(100%_-_8px)] h-[20vh]"></div> */}
                        </div>
                      </div>

                      {/* <FormControlLabel
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
                              <Image
                                src={ideaIcon}
                                alt="ideaIcon"
                                className=""
                              />
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
                      </div> */}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <audio ref={audioRef} style={{ display: "none" }} />
      {/* <Modal open={isChatPosting}>
        <Box className="h-screen w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <div class="h-20 w-20 rounded-full border-8 border-white border-t-[#FFE942] animate-spin"></div>
          </div>
        </Box>
      </Modal> */}
    </div>
  );
};

export default Chat;
