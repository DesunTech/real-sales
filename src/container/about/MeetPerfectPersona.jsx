import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import PersonaTypeModal from "../../common/modals/PersonaTypeModal";
import InteractionModal from "../../common/modals/InteractionModal";
import IdealPersonaModal from "../../common/modals/IdealPersonaModal";
import ShortlistedPersonaModal from "../../common/modals/ShortlistedPersonaModal";
import {
  PersonaTypeValue,
  InteractionValue,
  IdealPersonaValue,
  ShortlistedPersonaValue,
  TryRealsalesValue,
} from "../../redux/OpenModal";
import ArrowRight from "../../../public/assets/icons/arrowRight";

const MeetPerfectPersona = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.auth);

  const [session_id, setSession_id] = useState("");
  const [persona_id, setPersona_id] = useState("");
  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let sessionId = localStorage.getItem("session_id");
      let personaId = localStorage.getItem("persona_id");
      let useerId = localStorage.getItem("user");
      if (sessionId) {
        setSession_id(sessionId);
      }
      if (personaId) {
        setPersona_id(personaId);
      }
      if (useerId) {
        setUser_id(useerId);
      }
    }
  }, []);

  return (
    <div
      id="custom"
      className="page-container mx-auto px-4 py-8 container flex items-center justify-center flex-col lg:gap-4 gap-2"
    >
      <p className="lg:text-2xl text-[16px] text-center sora-light text-[#060606] w-full">
        Start your Session
      </p>
      <h1 className="lg:text-6xl text-3xl text-center text-[#060606] m-plus-rounded-1c-regular lg:w-[60%] w-full">
        We're here to give you a pixel-perfect Choice
      </h1>
      <div
        className="flex items-center gap-2 text-[#060606] bg-[#FFE942] m-plus-rounded-1c-medium capitalize py-2.5 px-4 rounded-full cursor-pointer mt-10 mb-10"
        onClick={() => {
          if (token !== "") {
            dispatch(InteractionValue({ open: true, fromData: "" }));
          } else if (persona_id !== "") {
            dispatch(
              InteractionValue({
                open: true,
                fromData: {
                  user_id: user_id,
                  persona_id: persona_id,
                },
              })
            );
          } else if (persona_id !== "" && session_id !== "") {
            dispatch(ShortlistedPersonaValue(true));
          } else {
            dispatch(TryRealsalesValue(true));
          }
        }}
      >
        Select Persona
         <ArrowRight width={19} height={13} />
      </div>

      {/* <div className="w-full flex flex-col items-start gap-2">
        <h2
          onClick={() => {
            if (token !== "") {
              // dispatch(PersonaTypeValue(true));
              dispatch(InteractionValue({ open: true, fromData: "" }))
            } 
            // else if (persona_id !== "") {
            //   dispatch(
            //     InteractionValue({
            //       open: true,
            //       fromData: {
            //         user_id: user_id,
            //         persona_id: persona_id,
            //       },
            //     })
            //   );
            // } else if (persona_id !== "" && session_id !== "") {
            //   dispatch(ShortlistedPersonaValue(true));
            // } 
            else {
              dispatch(TryRealsalesValue(true));
            }
          }}
          className="cursor-pointer lg:text-[22px] text-[16px] m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-start"
        >
          <span className="m-plus-rounded-1c-medium flex items-center gap-1">
            <div className="rounded-full border border-solid border-[#060606] p-1">
              <div className="w-2.5 h-2.5 rounded-full bg-[#060606]" />
            </div>
            Types
          </span>
          &nbsp;of our Real AI Persona:
        </h2>
        <div className="flex flex-col items-center">
          <div className="border-l-2 border-dashed border-[#060606] h-24" />
          <ArrowDropDownOutlinedIcon className="w-5 h-5" />
        </div>
        <h2 className="lg:text-[22px] text-[16px] m-plus-rounded-1c-regular text-[#06060670] w-full flex items-center justify-start">
          <div className="rounded-full border border-solid border-[#06060670] p-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#06060670]" />
          </div>
          &nbsp;Some Real&nbsp;
          <span className="m-plus-rounded-1c-medium flex items-center gap-1">
            Interaction
          </span>
          &nbsp; Mode of Real AI:
        </h2>
      </div> */}
    </div>
  );
};

export default MeetPerfectPersona;
