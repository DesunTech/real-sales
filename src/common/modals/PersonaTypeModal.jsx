import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../commonModal";
import PersonaCard from "../PersonaCard";
import CommonButton from "../commonButton";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import { PersonaTypeValue } from "../../redux/OpenModal";

const PersonaTypeModal = ({ onNext }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.openModal.personaTypeValue);
  const [persona, setPersona] = useState("");

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
            <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-y-5 gap-x-10">
              <PersonaCard
                persona={persona === "Industry" ? true : false}
                onClick={() => setPersona("Industry")}
                title={"Persona by Industry"}
              />
              <PersonaCard
                persona={persona === "Role" ? true : false}
                onClick={() => setPersona("Role")}
                title={"Persona by Role"}
              />
            </div>
            <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-y-5 gap-x-10">
              <PersonaCard
                persona={persona === "Experience" ? true : false}
                onClick={() => setPersona("Experience")}
                title={"Persona by Experience"}
              />
              <PersonaCard
                persona={persona === "Geography" ? true : false}
                onClick={() => setPersona("Geography")}
                title={"Persona by Geography"}
              />
            </div>
            <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-y-5 gap-x-10">
              <PersonaCard
                persona={persona === "Manufacture" ? true : false}
                onClick={() => setPersona("Manufacture")}
                title={"Persona by Manufacture"}
              />
              <div className="w-full">{/* fake */}</div>
            </div>
          </div>
          <CommonButton
            className={`!mt-8 !border-[2px] !border-[#060606] !text-[#060606] !font-[500] !px-6 !py-1] !text-[16px] !capitalize flex !items-center gap-2 w-fit h-fit`}
            icon={<ArrowRight stroke={`#060606`} width={19} height={13} />}
            disabled={persona === "" ? true : false}
            onClick={persona === "" ? undefined : onNext}
            buttontext={"Proceed to Next step"}
          />
        </div>
      </div>
    </CommonModal>
  );
};

export default PersonaTypeModal;
