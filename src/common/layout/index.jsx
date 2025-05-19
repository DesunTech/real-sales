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
  SessionModesValue,
} from "../../redux/OpenModal";
import PaymentConfirmation from "../modals/PaymentConfirmation";
import { useApi } from "../../hooks/useApi";
import { AddAuth } from "../../redux/AuthReducer";
import { apis } from "../../utils/apis";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Logout } from "@mui/icons-material";
import { useLogout } from "../../hooks/useLogout";

/**
 * Layout component that wraps the main application content.
 * It includes header, footer, and various modal components.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} - The rendered layout component.
 */
const Layout = ({ children }) => {
  const { Get, Post } = useApi();
  const router = useRouter();
  const dispatch = useDispatch();
  const { get_auth, ai_personas, sessions } = apis;

  const isChatPage = router.pathname.startsWith("/chat");

  const [personaData, setPersonaData] = useState([]);
  const [token, setToken] = useState("");

  /**
   * Trims the persona data to a key-value pair of persona and type.
   * @type {Object}
   */
  const trimedPersona = personaData.reduce((acc, v) => {
    acc[v.persona] = v.type; // Assign type to the persona key
    return acc;
  }, {});

  /**
   * Creates AI personas based on the provided persona name and trimmed persona data.
   * @param {string} personaName - The name of the persona to create.
   * @returns {Promise<void>} - A promise that resolves when the persona is created.
   */
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
        localStorage.setItem("persona_id", data?.persona_id);
        localStorage.setItem("persona_data", JSON.stringify(data));
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

  /**
   * Handles the next step in the persona type modal.
   * @param {string} personaName - The name of the persona.
   * @returns {void} - This function does not return a value.
   */
  const handlePersonaTypeNext = (personaName) => {
    CreateAiPersonas(personaName);
  };

  /**
   * Handles the next step in the interaction modal.
   * @param {Object} fromData - The data from the interaction modal.
   * @returns {Promise<void>} - A promise that resolves when the interaction is processed.
   */
  const handleInteractionNext = async (fromData) => {
    try {
      let data = await Post(`${sessions}/${fromData?.persona_id}`);
      if (data?.session_id) {
        localStorage.setItem("session_id", data?.session_id);
        dispatch(InteractionValue({ open: false, fromData: "" }));
        // dispatch(IdealPersonaValue(true));
        dispatch(ShortlistedPersonaValue(true));
      }
    } catch (error) {}
  };

  /**
   * Handles the next step in the ideal persona modal.
   * @param {string} industryType - The type of industry.
   * @param {string} industryView - The view of the industry.
   * @param {string} type - The type of persona.
   * @returns {void} - This function does not return a value.
   */
  const handleIdealPersonaNext = (industryType, industryView, type) => {
    dispatch(IdealPersonaValue({ open: false, type: "" }));
    // dispatch(ShortlistedPersonaValue(true));
    setPersonaData((pre) => [
      ...pre,
      { type: industryType, persona: type, view: industryView },
    ]);
  };

  /**
   * Handles the next step in the shortlisted persona modal.
   * @returns {void} - This function does not return a value.
   */
  const handleShortlistedPersonaNext = () => {
    dispatch(ShortlistedPersonaValue(false));
    dispatch(SessionModesValue(true));
    // router?.push("/pricing");
  };

  useEffect(() => {
    if (window !== undefined) {
      let getToken = localStorage.getItem("token");
      if (getToken) {
        setToken(getToken);
      }
    }
  }, []);

  return (
    <div className="">
      {/* Logout button */}
      {token !== "" && (
        <div
          onClick={() => useLogout()}
          className="fixed top-[92vh] right-4 z-[100] bg-white shadow-[0px_0px_4px_0px_rgba(238,0,0,0.75)] border border-solid border-red-300 rounded-full p-1.5 hover:p-2 duration-300 cursor-pointer"
        >
          <PowerSettingsNewIcon className="text-red-600" />
        </div>
      )}
      {/* Conditional rendering of header and footer */}
      {!isChatPage && <Header />}
      {children}
      {!isChatPage && <Footer />}
      {/* Modal components */}
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
    </div>
  );
};

export default Layout;
