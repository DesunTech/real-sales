import Image from "next/image";
import React, { useEffect, useState } from "react";
import dummy from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";
import { SessionModesValue } from "../../redux/OpenModal";
import { useDispatch } from "react-redux";
import RotateRightIcon from "@mui/icons-material/RotateRight";

const Persona = () => {
  const dispatch = useDispatch();
  const { Get, Post } = useApi();
  const { ai_personas, sessions } = apis;

  let capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const [personaData, setPersonaData] = useState([]);
  const [modeId, setModeId] = useState();
  const [loading, setLoading] = useState(false);

  const createSession = async ({ data, id }) => {
    setLoading(true);
    try {
      let sessionData = await Post(sessions, {
        mode_id: modeId,
        persona_id: id,
      });
      if (sessionData?.session_id) {
        setLoading(false);
        localStorage.setItem("session_id", sessionData?.session_id);
        localStorage.setItem("persona_data", JSON.stringify(data));
        dispatch(SessionModesValue(true));
      }
    } catch (error) {
      console.log(error, "__error__");
    }
  };

  useEffect(() => {
    const getRealAIPersona = async () => {
      try {
        let data = await Get(ai_personas);
        if (data?.length) {
          setPersonaData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRealAIPersona();
    if (typeof window !== "undefined") {
      setModeId(localStorage.getItem("mode_id"));
    }
  }, []);

  const PersonaCard = ({ v }) => {
    return (
      <div
        className={`group md:w-56 w-[12rem] h-72 rounded overflow-hidden relative cursor-pointer shadow-lg`}
        onClick={() => createSession({ data: v, id: v?.persona_id })}
      >
        <Image src={dummy} alt="persona" className="w-full h-full" />
        <div className="bg-[#ffffff] w-full h-[calc(100%_-_85%)] p-2 absolute bottom-0 z-10">
          <p className="m-plus-rounded-1c-semibold text-lg text-[#1a1a1a] uppercase pb-1.5">
            {v?.name?.replace(/_/g, " ")}
          </p>
        </div>
        <div className="bg-[#ffffff] w-full h-[calc(100%_-_35%)] p-2 absolute top-[35%] transition-opacity duration-300 opacity-0 group-hover:opacity-100 -z-20 group-hover:z-20">
          <p className="m-plus-rounded-1c-semibold text-lg text-[#1a1a1a] uppercase pb-1.5">
            {v?.name?.replace(/_/g, " ")}
          </p>
          <p className="font-medium m-plus-rounded-1c-medium text-[1.05rem] capitalize">
            Details:
          </p>
          <p className="flex items-center gap-2 sora-medium md:text-[14px] text-[13px]">
            <span className="w-1 h-1 rounded-full bg-[#2d2d2d]" />
            {capitalize(v?.ai_role?.name?.replace(/_/g, " "))}
          </p>
          <p className="flex items-center gap-2 sora-medium md:text-[14px] text-[13px]">
            <span className="w-1 h-1 rounded-full bg-[#2d2d2d]" />
            {capitalize(v?.industry?.name?.replace(/_/g, " "))}
          </p>
          <p className="flex items-center gap-2 sora-medium md:text-[14px] text-[13px]">
            <span className="w-1 h-1 rounded-full bg-[#2d2d2d]" />
            {capitalize(v?.manufacturing_model?.name?.replace(/_/g, " "))}
          </p>
          <p className="flex items-center gap-2 sora-medium md:text-[14px] text-[13px]">
            <span className="w-1 h-1 rounded-full bg-[#2d2d2d]" />
            {capitalize(v?.plant_size_impact?.name?.replace(/_/g, " "))}
          </p>
          <p className="flex items-center gap-2 sora-medium md:text-[14px] text-[13px]">
            <span className="w-1 h-1 rounded-full bg-[#2d2d2d]" />
            {v?.geography?.replace(/_/g, " ")}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-[url(../../public/assets/images/RealSales-backgrounds/bg-4.png)] bg-cover bg-center bg-no-repeat`}>
      <div className="bg-[#ffffffcb] relative">
        {loading && (
          <div className="bg-black/80 absolute w-full h-full flex items-center justify-center z-100">
            <RotateRightIcon className="animate-spin !text-5xl text-white mb-[20%]" />
          </div>
        )}
        <div className="page-container mx-auto lg:p-8 p-4 container flex flex-col items-center lg:gap-10 gap-5">
          <div className="w-full flex flex-wrap items-center justify-self-start gap-4">
            {personaData?.length
              ? personaData.map((v, i) => <PersonaCard v={v} />)
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Persona;
