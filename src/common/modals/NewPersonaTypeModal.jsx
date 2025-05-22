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

const NewPersonaTypeModal = ({ onNext, personaData }) => {
  const dispatch = useDispatch();
  const { ai_personas } = apis;
  const { Get } = useApi();
  const open = useSelector((state) => state.openModal.personaTypeValue);
  const [fromData, setFromData] = useState({});


  const handleChange = (event) => {
    setFromData((pre) => ({ ...pre, chat_type: event.target.value }));
  };

  let dummyPersonaData = [
    {
      id: "1",
      name: "Jone Doe",
      industry: { name: "food_and_beverage", title: "Food & Beverage" },
      role: { name: "plant_manager", title: "Plant manager" },
      experience: { name: "junior", title: "Sunior" },
      geography: { name: "us", title: "US" },
      manufacturing_model: {
        name: "self_manufacturing",
        title: "Self manufacturing",
      },
      plant_size_impact: { name: "small", title: "Small" },
    },
    {
      id: "2",
      name: "Jone Doe",
      industry: { name: "food_and_beverage", title: "Food & Beverage" },
      role: { name: "plant_manager", title: "Plant manager" },
      experience: { name: "junior", title: "Sunior" },
      geography: { name: "us", title: "US" },
      manufacturing_model: {
        name: "self_manufacturing",
        title: "Self manufacturing",
      },
      plant_size_impact: { name: "small", title: "Small" },
    },
    {
      id: "3",
      name: "Jone Doe",
      industry: { name: "food_and_beverage", title: "Food & Beverage" },
      role: { name: "plant_manager", title: "Plant manager" },
      experience: { name: "junior", title: "Sunior" },
      geography: { name: "us", title: "US" },
      manufacturing_model: {
        name: "self_manufacturing",
        title: "Self manufacturing",
      },
      plant_size_impact: { name: "small", title: "Small" },
    },
    {
      id: "4",
      name: "Jone Doe",
      industry: { name: "food_and_beverage", title: "Food & Beverage" },
      role: { name: "plant_manager", title: "Plant manager" },
      experience: { name: "junior", title: "Sunior" },
      geography: { name: "us", title: "US" },
      manufacturing_model: {
        name: "self_manufacturing",
        title: "Self manufacturing",
      },
      plant_size_impact: { name: "small", title: "Small" },
    },
  ];

  return (
    <CommonModal
      open={open}
      // open={true}
      onClose={() => dispatch(PersonaTypeValue(false))}
      width={"60%"}
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
              {dummyPersonaData.map((v, i) => (
                <div
                  key={i}
                  className={`${
                    v?.id === fromData?.id
                      ? "shadow-[0px_0px_6px_0px_#00000070]"
                      : ""
                  } lg:w-[calc(50%_-_8px)] w-full chat border border-solid border-[#00000070] rounded p-2 flex flex-col gap-2 cursor-pointer`}
                  onClick={() => setFromData(v)}
                >
                  <div className="flex gap-4">
                    <Image
                      src={industryImg}
                      alt="industry"
                      className="w-[8rem] h-[8rem] rounded-full"
                    />
                    <div className="flex flex-col items-start justify-start mt-4">
                      <p className="text-2xl sora-medium text-[#060606] capitalize">
                        {v?.name || "Name"}
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <WarehouseIcon className="!text-[18px] mt-0.5" />
                        &nbsp;<span>{v?.industry?.title}</span>
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <PersonIcon className="!text-[18px] mt-0.5" />
                        &nbsp;<span>{v?.role?.title}</span>
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <SupervisorAccountIcon className="!text-[18px] mt-0.5" />
                        &nbsp;<span>{v?.experience?.title}</span>
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <MapIcon className="!text-[18px] mt-0.5" />
                        &nbsp;<span>{v?.geography?.title}</span>
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <PrecisionManufacturingIcon className="!text-[18px] mt-0.5" />
                        &nbsp;
                        <span>{v?.manufacturing_model?.title}</span>
                      </p>
                      <p className="flex items-start text-[15px] sora-regular text-[#232323]">
                        <FactoryIcon className="!text-[18px] mt-0.5" />
                        &nbsp;<span>{v?.plant_size_impact?.title}</span>
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
                          fromData?.id === v?.id ? fromData?.chat_type : null
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
            disabled={fromData?.id ? false : true}
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
