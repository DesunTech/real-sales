import Image from "next/image";
import React, { useEffect, useState } from "react";
import dummy from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";
import { SessionModesValue } from "../../redux/OpenModal";
import { useDispatch } from "react-redux";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  const [roleFilter, setRoleFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [plantSizeFilter, setPlantSizeFilter] = useState("");

  // Extract unique values for dropdowns
  const roles = Array.from(
    new Set(personaData.map((v) => v?.ai_role?.name).filter(Boolean))
  );
  const industries = Array.from(
    new Set(personaData.map((v) => v?.industry?.name).filter(Boolean))
  );
  const models = Array.from(
    new Set(
      personaData.map((v) => v?.manufacturing_model?.name).filter(Boolean)
    )
  );
  const plantSizes = Array.from(
    new Set(personaData.map((v) => v?.plant_size_impact?.name).filter(Boolean))
  );

  // Filtered data
  const filteredPersonas = personaData.filter((v) => {
    return (
      (!roleFilter || v?.ai_role?.name === roleFilter) &&
      (!industryFilter || v?.industry?.name === industryFilter) &&
      (!modelFilter || v?.manufacturing_model?.name === modelFilter) &&
      (!plantSizeFilter || v?.plant_size_impact?.name === plantSizeFilter)
    );
  });

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
    } finally {
      setLoading(false);
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
            {capitalize(v?.plant_size_impact?.name?.replace(/_/g, " "))}&nbsp;
            {v?.plant_size_impact?.name === "small"
              ? "(1-500)"
              : v?.plant_size_impact?.name === "medium"
              ? "(501-5,000)"
              : v?.plant_size_impact?.name === "large"
              ? "(5,000+)"
              : ""}
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
    <div
      className={`bg-[url(../../public/assets/images/RealSales-backgrounds/bg-4.png)] bg-cover bg-center bg-no-repeat`}
    >
      <div className="bg-[#ffffffcb] relative">
        {loading && (
          <div className="bg-black/80 absolute w-full h-full flex items-center justify-center z-100">
            <RotateRightIcon className="animate-spin !text-5xl text-white mb-[20%]" />
          </div>
        )}
        <div className="page-container mx-auto lg:p-8 p-4 container flex flex-col items-center lg:gap-8 gap-4">
          <h1 className="sora-bold text-4xl">AI Personas</h1>

          {/* Filters */}
          <div className="w-full flex flex-wrap gap-4">
            <FormControl variant="outlined" className="w-[100px]">
              <InputLabel id="role-filter-label">Role</InputLabel>
              <Select
                labelId="role-filter-label"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                label="Role"
              >
                <MenuItem value="">All Roles</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {capitalize(role?.replace(/_/g, " "))}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="w-[120px]">
              <InputLabel id="industry-filter-label">Industry</InputLabel>
              <Select
                labelId="industry-filter-label"
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                label="Industry"
              >
                <MenuItem value="">All Industries</MenuItem>
                {industries.map((ind) => (
                  <MenuItem key={ind} value={ind}>
                    {capitalize(ind?.replace(/_/g, " "))}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="w-[130px]">
              <InputLabel id="plant-size-filter-label">Plant Size</InputLabel>
              <Select
                labelId="plant-size-filter-label"
                value={plantSizeFilter}
                onChange={(e) => setPlantSizeFilter(e.target.value)}
                label="Plant Size"
              >
                <MenuItem value="">All Plant Sizes</MenuItem>
                {plantSizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {capitalize(size?.replace(/_/g, " "))}&nbsp;
                    {size === "small"
                      ? "(1-500)"
                      : size === "medium"
                      ? "(501-5,000)"
                      : size === "large"
                      ? "(5,000+)"
                      : ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="w-[200px]">
              <InputLabel id="model-filter-label">
                Manufacturing Model
              </InputLabel>
              <Select
                labelId="model-filter-label"
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
                label="Manufacturing Model"
              >
                <MenuItem value="">All Manufacturing Models</MenuItem>
                {models.map((model) => (
                  <MenuItem key={model} value={model}>
                    {capitalize(model?.replace(/_/g, " "))}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full flex flex-wrap items-center justify-self-start gap-4">
            {filteredPersonas?.length ? (
              filteredPersonas.map((v, i) => (
                <PersonaCard v={v} key={v?.persona_id || i} />
              ))
            ) : (
              <p>No personas found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Persona;
