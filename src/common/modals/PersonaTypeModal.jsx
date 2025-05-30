import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../commonModal";
import PersonaCard from "../PersonaCard";
import CommonButton from "../commonButton";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import { IdealPersonaValue, PersonaTypeValue } from "../../redux/OpenModal";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";
import { TextField } from "@mui/material";


const PersonaTypeModal = ({ onNext, personaData }) => {
  let capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const dispatch = useDispatch();
  const { ai_personas } = apis;
  const { Get } = useApi();
  const open = useSelector((state) => state.openModal.personaTypeValue);
  const [persona, setPersona] = useState("");
  const [personaName, setPersonaName] = useState("");
  const [personaNameErr, setPersonaNameErr] = useState("");
  // useEffect(() => {
  //   const getRealAIPersona = async () => {
  //     try {
  //       let data = await Get(ai_personas);
  //       console.log(data, "aip_data");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getRealAIPersona();
  // }, [open]);

  let Industry = personaData?.length
    ? personaData
        .filter((v) => v?.persona === "industry")
        .map((val) => val?.view)
    : false;

    console.log(Industry, "__Industry__");

  let Role = personaData?.length
    ? personaData.filter((v) => v?.persona === "role").map((val) => val?.view)
    : false;

  let Experience = personaData?.length
    ? personaData
        .filter((v) => v?.persona === "experience_level")
        .map((val) => val?.view)
    : false;

  let Geography = personaData?.length
    ? personaData
        .filter((v) => v?.persona === "geography")
        .map((val) => val?.view)
    : false;

  let Manufacture = personaData?.length
    ? personaData
        .filter((v) => v?.persona === "manufacturing_model")
        .map((val) => val?.view)
    : false;

  let Plant_size_impact = personaData?.length
    ? personaData
        .filter((v) => v?.persona === "plant_size_impact")
        .map((val) => val?.view)
    : false;

    console.log(personaData,Plant_size_impact, "Plant_size_impact")

  return (
    <CommonModal
      open={open}
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
            (Filtur your choice):
          </p>
        </div>
        <div className="w-full flex items-center justify-center flex-col">
          <div className="lg:w-[100%] w-full flex flex-col items-start justify-start gap-y-5 gap-x-10">
            <TextField
              label="First Name"
              variant="standard"
              className="w-full"
              name="first_name"
              color="#000000"
              onChange={(e) => {
                setPersonaName(e.target.value);
                setPersonaNameErr("");
              }}
              value={personaName}
              error={personaName === ""}
              helperText={personaNameErr}
              required
            />
            <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-y-5 gap-x-10">
              <PersonaCard
                persona={persona === "Industry" ? true : false}
                // onClick={() => setPersona("Industry")}
                disabled={false}
                onClick={() =>
                  dispatch(IdealPersonaValue({ open: true, type: "industry" }))
                }
                title={"Persona by Industry"}
                type={capitalize(Industry[0]?.replace(/_/g, ' '))}
              />
              <PersonaCard
              disabled={!Industry[0]}
                persona={persona === "Role" ? true : false}
                onClick={() =>
                  dispatch(IdealPersonaValue({ open: true, type: "role" }))
                }
                title={"Persona by Role"}
                type={capitalize(Role[0]?.replace(/_/g, ' '))}
              />
            </div>
            <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-y-5 gap-x-10">
              <PersonaCard
              disabled={!Role[0]}
                persona={persona === "Experience" ? true : false}
                // onClick={() => setPersona("Experience")}
                onClick={() =>
                  dispatch(
                    IdealPersonaValue({ open: true, type: "experience_level" })
                  )
                }
                title={"Persona by Experience"}
                type={capitalize(Experience[0]?.replace(/_/g, ' '))}
              />
              <PersonaCard
              disabled={!Experience[0]}
                persona={persona === "Geography" ? true : false}
                // onClick={() => setPersona("Geography")}
                onClick={() =>
                  dispatch(IdealPersonaValue({ open: true, type: "geography" }))
                }
                title={"Persona by Geography"}
                type={capitalize(Geography[0]?.replace(/_/g, ' '))}
              />
            </div>
            <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-y-5 gap-x-10">
              <PersonaCard
                persona={persona === "Manufacture" ? true : false}
                disabled={!Geography[0]}
                // onClick={() => setPersona("Manufacture")}
                onClick={() =>
                  dispatch(
                    IdealPersonaValue({
                      open: true,
                      type: "manufacturing_model",
                    })
                  )
                }
                title={"Persona by Manufacture"}
                type={capitalize(Manufacture[0]?.replace(/_/g, ' '))}
              />
              <PersonaCard
              disabled={!Manufacture[0]}
                persona={persona === "Manufacture" ? true : false}
                // onClick={() => setPersona("Manufacture")}
                onClick={() =>
                  dispatch(
                    IdealPersonaValue({
                      open: true,
                      type: "plant_size_impact",
                    })
                  )
                }
                title={"Persona by Plant size"}
                type={capitalize(Plant_size_impact[0]?.replace(/_/g, ' '))}
              />
            </div>
          </div>
          <CommonButton
            className={`!mt-8 !border-[2px] !border-[#060606] !text-[#060606] !font-[500] !px-6 !py-1] !text-[16px] !capitalize flex !items-center gap-2 w-fit h-fit`}
            icon={<ArrowRight stroke={`#060606`} width={19} height={13} />}
            disabled={personaData?.length < 6 || personaName === ""}
            onClick={() => {
              if (personaName.trim() === "") {
                setPersonaNameErr("First Name is required.");
              } else {
                onNext(personaName);
              }
            }}
            buttontext={"Proceed to Next step"}
          />
        </div>
      </div>
    </CommonModal>
  );
};

export default PersonaTypeModal;
