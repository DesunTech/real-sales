import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../commonModal";
import PersonaCard from "../PersonaCard";
import CommonButton from "../commonButton";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import { IdealPersonaValue, PersonaTypeValue } from "../../redux/OpenModal";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";
import {
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import industryImg from "../../../public/assets/images/personas/mid.png";
import Image from "next/image";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MapIcon from "@mui/icons-material/Map";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import FactoryIcon from "@mui/icons-material/Factory";

const NewPersonaTypeModal = ({ onNext }) => {
  const dispatch = useDispatch();
  const { ai_personas } = apis;
  const { Get } = useApi();
  const open = useSelector((state) => state.openModal.personaTypeValue);
  const [fromData, setFromData] = useState({});
  const [innerWidth, setInnerWidth] = useState(0);
  const [personaData, setPersonaData] = useState([{
    persona_id: "57a6007c-f8e4-4663-b8b0-357e9c73a0d1",
    name: "Jitam",
    industry: {
      name: "food_and_beverage",
      industry_id: "1ce9f0c2-fdb3-4215-91f3-31cba9a64b90"
    },
    ai_role: {
      name: "plant_manager",
      ai_role_id: "83177e39-a9d6-4873-880f-af60c80eaddc"
    },
    experience_level: "junior",
    geography: "usa",
    plant_size_impact: {
      name: "small",
      plant_size_impact_id: "8cd33735-7191-4937-89d6-a541b8e74145"
    },
    manufacturing_model: {
      name: "self_manufacturing",
      manufacturing_model_id: "8984076c-ff69-4de9-824c-6979209ef91d"
    },
    status_active: true
  }]);

  const handleChange = (event) => {
    setFromData((pre) => ({ ...pre, chat_type: event.target.value }));
  };

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // useEffect(() => {
  //   const getPersonaData = async () => {
  //     try {
  //       const res = await Get(ai_personas);
  //       console.log(res, "___res__");
  //       setPersonaData(res?.data);
  //     } catch (error) {
  //       console.log(error, "___error");
  //     }
  //   };

  //   getPersonaData();
  // }, []);

  const addFromData = (value) => {
    console.log(value?.persona_id, "___value");
    setFromData(() => ({
      persona_id: value?.persona_id,
      name: value?.name,
      industry: value?.industry?.name,
      role: value?.role?.name,
      experience: value?.experience?.name,
      geography: value?.geography?.name,
      manufacturing_model: value?.manufacturing_model?.name,
      plant_size_impact: value?.plant_size_impact?.name,
    }));
  };

  const formatName = (name) => {
    if (!name) return '';
    return name
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  const modalWidth = innerWidth <= 1240 ? "70%" : "60%";
  console.log(personaData, fromData, "___personaData");
  return (
    <CommonModal
      open={open}
      onClose={() => dispatch(PersonaTypeValue(false))}
      width={modalWidth}
    >
      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-col items-start">
          <h2 className="lg:text-[22px] text-[16px] m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-start">
            <span className="m-plus-rounded-1c-medium flex items-center gap-1">
              Types
            </span>
            &nbsp;of our Real AI Persona:
          </h2>
          <p className="lg:text-[30px] text-[16px] m-plus-rounded-1c-regular text-[#060606E5]">
            (Filter your choice):
          </p>
        </div>
        <div className="w-full flex items-center justify-center flex-col">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center gap-2">
              <TextField
                variant="outlined"
                className="!w-full"
                placeholder="Search your persona"
                sx={{
                  "& .MuiOutlinedInput-input": {
                    padding: "7.5px",
                  },
                }}
              />
              <div className="!px-4 p-[7px] bg-[#060606] border border-solid border-[#00000070] rounded cursor-pointer sora-regular text-[#fffffff3] text-[15px]">
                Search
              </div>
            </div>

            <div className="w-full flex flex-wrap items-center justify-between gap-4">
              {personaData.map((v, i) => (
                <div
                  key={i}
                  className={`${v?.persona_id === fromData?.persona_id
                    ? "shadow-[0px_0px_6px_0px_#00000070]"
                    : ""
                    } home-bg lg:w-[calc(50%_-_8px)] w-full chat border border-solid border-[#00000070] rounded p-2 flex flex-col gap-2 cursor-pointer`}
                  onClick={() => addFromData(v)}
                >
                  <div className="flex gap-4">
                    <Image
                      src={industryImg}
                      alt="industry"
                      className="w-[8rem] h-[8rem] rounded"
                    />
                    <div className="flex flex-col items-start justify-start">
                      <p className="text-2xl sora-medium text-[#060606] capitalize">
                        {formatName(v?.name) || "Name"}
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <WarehouseIcon className="!text-[18px] mt-0.5" />
                        &nbsp;<span>{formatName(v?.industry?.name)}</span>
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <PersonIcon className="!text-[18px] mt-0.5" />
                        &nbsp;<span>{formatName(v?.ai_role?.name)}</span>
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <SupervisorAccountIcon className="!text-[18px] mt-0.5" />
                        &nbsp;<span>{formatName(v?.experience_level)}</span>
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <MapIcon className="!text-[18px] mt-0.5" />
                        &nbsp;<span>{formatName(v?.geography)}</span>
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <PrecisionManufacturingIcon className="!text-[18px] mt-0.5" />
                        &nbsp;
                        <span>{formatName(v?.manufacturing_model?.name)}</span>
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <FactoryIcon className="!text-[18px] mt-0.5" />
                        &nbsp;<span>{formatName(v?.plant_size_impact?.name)}</span>
                      </p>
                    </div>
                  </div>
                  {/* <div>
                    <h2 className="text-[15px] sora-medium text-[#060606]">
                      Select Mode
                    </h2>
                    <div className="flex items-center gap-2">
                      <RadioGroup
                        className="!flex !flex-row !gap-2"
                        value={
                          fromData?.persona_id === v?.persona_id ? fromData?.chat_type : null
                        }
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="audio"
                          control={
                            <Radio
                              sx={{
                                color: "#000000",
                                "&.Mui-checked": {
                                  color: "#000000",
                                },
                              }}
                            />
                          }
                          label={
                            <p className="!text-[14px]">Audio conversation</p>
                          }
                        />
                        <FormControlLabel
                          value="video"
                          control={
                            <Radio
                              sx={{
                                color: "#000000",
                                "&.Mui-checked": {
                                  color: "#000000",
                                },
                              }}
                            />
                          }
                          label={
                            <p className="!text-[14px]">Video conversation</p>
                          }
                        />
                      </RadioGroup>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>

            <hr className="w-full" />
          </div>
          <CommonButton
            className={`!mt-8 !border-[2px] !border-[#060606] !text-[#060606] !font-[500] !px-6 !py-1] !text-[16px] !capitalize flex !items-center gap-2 w-fit h-fit`}
            icon={<ArrowRight stroke={`#060606`} width={19} height={13} />}
            disabled={fromData?.persona_id ? false : true}
            onClick={() => {
              onNext(fromData);
            }}
            buttontext={"Proceed to Next step"}
          />
        </div>
      </div>
    </CommonModal>
  );
};

export default NewPersonaTypeModal;
