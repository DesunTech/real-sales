import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header";
import Footer from "./footer";
import SessionModes from "../modals/SessionModes";
import DemoMeeting from "../modals/DemoMeeting";
import TryRealsales from "../modals/TryRealsales";
import WaitAMinute from "../modals/WaitAMinute";
import ChatEndModal from "../modals/ChatEndModal";
import UploadYourDocModal from "../modals/UploadYourDocModal";
import PersonaTypeModal from "../modals/PersonaTypeModal";
import InteractionModal from "../modals/InteractionModal";
import IdealPersonaModal from "../modals/IdealPersonaModal";
import ShortlistedPersonaModal from "../modals/ShortlistedPersonaModal";
import {
  PersonaTypeValue,
  InteractionValue,
  IdealPersonaValue,
  ShortlistedPersonaValue,
} from "../../redux/OpenModal";
import PaymentConfirmation from "../modals/PaymentConfirmation";
import { useApi } from "../../hooks/useApi";
import { AddAuth } from "../../redux/AuthReducer";
import { apis } from "../../utils/apis";

const Layout = ({ children }) => {
  const { Get, Post } = useApi();
  const router = useRouter();
  const dispatch = useDispatch();
  const { get_auth, ai_personas, sessions } = apis;

  const isChatPage = router.pathname.startsWith("/chat");

  const [personaData, setPersonaData] = useState([]);

  const trimedPersona = personaData.reduce((acc, v) => {
    acc[v.persona] = v.type; // Assign type to the persona key
    return acc;
  }, {});

  const CreateAiPersonas = async (personaName) => {
    let user = "";
    if (typeof window !== "undefined") {
      user = localStorage.getItem("user");
    }
    try {
      const data = await Post(ai_personas, {
        ...trimedPersona,
        name: personaName,
        behavioral_traits: [
          {
            name: "test_p",
            intensity: 1,
            description: "test_p description",
          },
        ],
      });
      if (data?.persona_id) {
        dispatch(PersonaTypeValue(false));
        dispatch(
          InteractionValue({
            open: true,
            fromData: {
              user_id: user,
              persona_id: data?.persona_id,
            },
          })
        );
      }
      console.log(data, "<___data");
    } catch (error) {
      console.log(error, "<___data-error");
    }
  };

  console.log(trimedPersona, "trimedPersona_");

  // Modal state handlers
  const handlePersonaTypeNext = (personaName) => {
    CreateAiPersonas(personaName);
  };

  const handleInteractionNext = async (fromData) => {
    try {
      let data = await Post(sessions, fromData)
      dispatch(InteractionValue({ open: false, fromData: "" }));
      // dispatch(IdealPersonaValue(true));
      dispatch(ShortlistedPersonaValue(true));
    } catch (error) {}
  };

  const handleIdealPersonaNext = (industryType, type) => {
    dispatch(IdealPersonaValue({ open: false, type: "" }));
    // dispatch(ShortlistedPersonaValue(true));
    setPersonaData((pre) => [...pre, { type: industryType, persona: type }]);
  };

  const handleShortlistedPersonaNext = () => {
    dispatch(ShortlistedPersonaValue(false));
    router?.push("/pricing");
  };

  // useEffect(() => {
  //   const getAuth = async () => {
  //     const data = await Get(get_auth);
  //     if (data) {
  //       dispatch(AddAuth(data));
  //     } else {
  //       console.error("data");
  //     }
  //   };
  //   getAuth();
  // }, []);

  return (
    <>
      {!isChatPage && <Header />}
      {children}
      {!isChatPage && <Footer />}
      <SessionModes />
      <DemoMeeting />
      <TryRealsales />
      <WaitAMinute />
      <ChatEndModal />
      <UploadYourDocModal />
      <PaymentConfirmation />

      {/* Persona Flow Modals */}
      <PersonaTypeModal
        personaData={personaData}
        onNext={handlePersonaTypeNext}
      />
      <InteractionModal onNext={handleInteractionNext} />
      <IdealPersonaModal onNext={handleIdealPersonaNext} />
      <ShortlistedPersonaModal onNext={handleShortlistedPersonaNext} />
    </>
  );
};

export default Layout;
