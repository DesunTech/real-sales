import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
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
} from "../../redux/OpenModal";

const MeetPerfectPersona = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePersonaTypeNext = () => {
    dispatch(PersonaTypeValue(false));
    dispatch(InteractionValue({open: true, id: ""}));
  };

  const handleInteractionNext = () => {
    dispatch(InteractionValue({open: false, id: ""}));
    dispatch(IdealPersonaValue(true));
  };

  const handleIdealPersonaNext = () => {
    dispatch(IdealPersonaValue(false));
    dispatch(ShortlistedPersonaValue(true));
  };

  const handleShortlistedPersonaNext = () => {
    dispatch(ShortlistedPersonaValue(false));
    router?.push("/pricing");
  };

  return (
    <div
      id="custom"
      className="page-container mx-auto px-4 py-8 container flex items-center justify-center flex-col lg:gap-4 gap-2"
    >
      <p className="lg:text-2xl text-[16px] text-center sora-light text-[#060606] w-full">
        Want to meet with Perfect Persona?
      </p>
      <h1 className="lg:text-6xl text-3xl text-center text-[#060606] m-plus-rounded-1c-regular lg:w-[60%] w-full">
        We're here to give you a pixel-perfect Choice
      </h1>
      <div className="w-full flex flex-col items-start gap-2">
        <h2
          onClick={() => dispatch(PersonaTypeValue(true))}
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
      </div>

      {/* Modals */}
      {/* <PersonaTypeModal 
        onNext={handlePersonaTypeNext}
      />

      <InteractionModal
        onNext={handleInteractionNext}
      />

      <IdealPersonaModal
        onNext={handleIdealPersonaNext}
      />

      <ShortlistedPersonaModal
        onNext={handleShortlistedPersonaNext}
      /> */}
    </div>
  );
};

export default MeetPerfectPersona;
