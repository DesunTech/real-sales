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
import { Logout } from "@mui/icons-material";
import NewPersonaTypeModal from "../modals/NewPersonaTypeModal";

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
  const token = useSelector((state) => state.auth.auth);
  console.log(token, "__token");

  const [personaData, setPersonaData] = useState([]);
  const [mode_id, setModeId] = useState("");

  console.log(personaData, "<___personaData");

  /**
   * Trims the persona data to a key-value pair of persona and type.
   * @type {Object}
   */
  // const trimedPersona = personaData.reduce((acc, v) => {
  //   acc[v.persona] = v.type; // Assign type to the persona key
  //   return acc;
  // }, {});

  const [personaCreatefromData, setPersonaCreatefromData] = useState({});
  console.log(personaCreatefromData, "personaCreatefromData");
  useEffect(() => {
    let industry_id = personaData
      .filter((v) => v?.persona === "industry")
      .map((val) => val?.id);

    let ai_role_id = personaData
      .filter((v) => v?.persona === "role")
      .map((val) => val?.id);

    let experience_level = personaData
      .filter((v) => v?.persona === "experience_level")
      .map((val) => val?.view);

    let geography = personaData
      .filter((v) => v?.persona === "geography")
      .map((val) => val?.view);

    let manufacturing_model_id = personaData
      .filter((v) => v?.persona === "manufacturing_model")
      .map((val) => val?.id);

    let plant_size_impact_id = personaData
      .filter((v) => v?.persona === "plant_size_impact")
      .map((val) => val?.id);

    if (industry_id.length > 0) {
      setPersonaCreatefromData((pre) => ({
        ...pre,
        industry_id: industry_id[0],
      }));
    }
    if (ai_role_id.length > 0) {
      setPersonaCreatefromData((pre) => ({
        ...pre,
        ai_role_id: ai_role_id[0],
      }));
    }
    if (experience_level.length > 0) {
      setPersonaCreatefromData((pre) => ({
        ...pre,
        experience_level: experience_level[0],
      }));
    }
    if (geography.length > 0) {
      setPersonaCreatefromData((pre) => ({
        ...pre,
        geography: geography[0],
      }));
    }
    if (manufacturing_model_id.length > 0) {
      setPersonaCreatefromData((pre) => ({
        ...pre,
        manufacturing_model_id: manufacturing_model_id[0],
      }));
    }
    if (plant_size_impact_id.length > 0) {
      setPersonaCreatefromData((pre) => ({
        ...pre,
        plant_size_impact_id: plant_size_impact_id[0],
      }));
    }
  }, [personaData?.length]);

  const trimedPersona = personaData.map((v) => ({
    persona: v.persona,
    type: v.type,
    id: v.id,
    industry_id: "string",
    ai_role_id: "string",
    experience_level: "junior",
    geography: "string",
    plant_size_impact_id: "string",
    manufacturing_model_id: "string",
  }));

  // console.log(trimedPersona, "trimedPersona");

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
        ...personaCreatefromData,
        name: personaName,
        behavioral_traits: [
          {
            name: "test_p",
            intensity: 1,
            description: "test_p description",
          },
        ],
      });
      console.log(data?.persona_id, "data_persona_id");
      if (data?.persona_id) {
        // localStorage.setItem("persona_id", data?.persona_id);
        // localStorage.setItem("persona_data", JSON.stringify(data));
        // dispatch(PersonaTypeValue(false));
        // dispatch(
        //   InteractionValue({
        //     open: true,
        //     fromData: {
        //       user_id: user,
        //       persona_id: data?.persona_id,
        //     },
        //   })
        // );

        let sessionData = await Post(sessions, {
          mode_id: mode_id,
          persona_id: data?.persona_id,
        });
        if (sessionData?.session_id) {
          localStorage.setItem("session_id", sessionData?.session_id);
          localStorage.setItem("persona_data", JSON.stringify(data));
          dispatch(PersonaTypeValue(false));
          dispatch(SessionModesValue(true));
        }
      }
      console.log(data, "<___data");
    } catch (error) {
      console.log(error, "<___data-error");
    }
  };

  // console.log(trimedPersona, "trimedPersona_");

  /**
   * Handles the next step in the persona type modal.
   * @param {string} personaName - The name of the persona.
   * @returns {void} - This function does not return a value.
   */
  const handlePersonaTypeNext = async (personaData) => {
    // CreateAiPersonas(personaName);
    console.log(personaData, "personaData");
    localStorage.setItem("persona_id", personaData?.persona_id);
    try {
      let data = await Post(sessions, {
        mode_id: mode_id,
        persona_id: personaData?.persona_id,
      });
      if (data?.session_id) {
        localStorage.setItem("session_id", data?.session_id);
        localStorage.setItem("persona_data", JSON.stringify(personaData));
        dispatch(PersonaTypeValue(false));
        dispatch(SessionModesValue(true));
      }
    } catch (error) {}
  };

  /**
   * Handles the next step in the interaction modal.
   * @param {Object} fromData - The data from the interaction modal.
   * @returns {Promise<void>} - A promise that resolves when the interaction is processed.
   */
  const handleInteractionNext = async (fromData) => {
    // try {
    //   let data = await Post(`${sessions}/${fromData?.persona_id}`);
    //   if (data?.session_id) {
    //     localStorage.setItem("session_id", data?.session_id);
    dispatch(InteractionValue({ open: false, fromData: "" }));
    setModeId(fromData?.mode_id);
    localStorage.setItem("mode_id", fromData?.mode_id);
    // dispatch(IdealPersonaValue(true));
    // dispatch(ShortlistedPersonaValue(true));
    // dispatch(PersonaTypeValue(true));
    router.push("/persona");
    //   }
    // } catch (error) {}
  };

  /**
   * Handles the next step in the ideal persona modal.
   * @param {string} industryType - The type of industry.
   * @param {string} industryView - The view of the industry.
   * @param {string} type - The type of persona.
   * @returns {void} - This function does not return a value.
   */
  const handleIdealPersonaNext = (industryType, industryView, type, id) => {
    dispatch(IdealPersonaValue({ open: false, type: "" }));
    // dispatch(ShortlistedPersonaValue(true));
    setPersonaData((pre) => [
      ...pre,
      { type: industryType, persona: type, view: industryView, id: id },
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
    if (!token) {
      if (window !== undefined) {
        let getToken = localStorage.getItem("token");
        if (getToken) {
          dispatch(AddAuth(getToken));
        }
      }
    }
  }, []);

  console.log(children, "children");

  return (
    <div className="">
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
        // onNext={handlePersonaTypeNext}
        onNext={CreateAiPersonas}
      />

      {/* <NewPersonaTypeModal
        personaData={personaData}
        onNext={handlePersonaTypeNext}
      /> */}
      <InteractionModal onNext={handleInteractionNext} />
      <IdealPersonaModal onNext={handleIdealPersonaNext} mode_id={mode_id} />
      <ShortlistedPersonaModal onNext={handleShortlistedPersonaNext} />
    </div>
  );
};

export default Layout;
