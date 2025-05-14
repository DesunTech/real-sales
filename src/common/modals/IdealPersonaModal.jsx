import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../commonModal";
import Image from "next/image";
import CommonButton from "../commonButton";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import blackLogo from "../../../public/assets/images/RealSales-official-logo/For Web/png/Black logo - no background.png";
import persona_food_new from "../../../public/assets/images/RealSales-user-images/persona-food-new.png";
import persona_food_old from "../../../public/assets/images/RealSales-user-images/persona-food.png";
import { IdealPersonaValue } from "../../redux/OpenModal";
import selfimage from "../../../public/assets/images/personas/self.png"
import contractimage from "../../../public/assets/images/personas/contract.png"
import stateimage from "../../../public/assets/images/personas/state.png"
import countryimage from "../../../public/assets/images/personas/country.png"
import juniorimage from "../../../public/assets/images/personas/junior.png"
import seniorimage from "../../../public/assets/images/personas/senior.png"
import midimage from "../../../public/assets/images/personas/mid.png"
import plantManagerimage from "../../../public/assets/images/personas/plantManager.png"
import maintenanceimage from "../../../public/assets/images/personas/maintenance.png"
import procecurementimage from "../../../public/assets/images/personas/procecurement.png"


const IdealPersonaModal = ({ onNext }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.openModal.idealPersonaValue);
  const [industryType, setIndustryType] = useState("");
  const [idealPersonaArr, setIdealPersonaArr] = useState([]);

  useEffect(() => {
    if (open?.type === "Industry") {
      setIdealPersonaArr([
        { image: persona_food_new, type: "Industry", title: "Food & Beverage" },
        { image: persona_food_old, type: "Industry", title: "Beverage" },
      ]);
    } else if (open?.type === "Role") {
      setIdealPersonaArr([
        { image: plantManagerimage, type: "Role", title: "Plant Manager" },
        { image: procecurementimage, type: "Role", title: "Procurement" },
        { image: maintenanceimage, type: "Role", title: "Maintenance" },
      ]);
    } else if (open?.type === "Experience") {
      setIdealPersonaArr([
        { image: juniorimage, type: "Experience", title: "Junior" },
        { image: seniorimage, type: "Experience", title: "Mid" },
        { image: midimage, type: "Experience", title: "Senior" },
      ]);
    } else if (open?.type === "Geography") {
      setIdealPersonaArr([
        { image: countryimage, type: "Geography", title: "India" },
        { image: countryimage, type: "Geography", title: "US" },
      ]);
    } else if (open?.type === "Manufacture") {
      setIdealPersonaArr([
        { image: selfimage, type: "Manufacture", title: "Self Manufacturing" },
        { image: contractimage, type: "Manufacture", title: "Contract Manufacturing" },
      ]);
    } else {
      setIdealPersonaArr([]);
    }
  }, [open?.type]);

  const onSetIndustryType = (type) => {
    {
      if (industryType !== type) {
        setIndustryType(type);
      } else {
        setIndustryType("");
      }
    }
  };

  return (
    <CommonModal
      open={open?.open}
      onClose={() => dispatch(IdealPersonaValue({ open: false, type: "" }))}
      width={"70%"}
    >
      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-col items-start">
          <h2 className="lg:text-[22px] text-[16px] m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-start">
            Find Ideal Persona for your needs
          </h2>
          <p className="lg:text-[30px] text-[16px] m-plus-rounded-1c-regular text-[#060606E5]">
            (Choose any one):
          </p>
        </div>
        <div className="w-full flex items-center justify-center flex-col py-4">
          <div className="w-full flex lg:flex-row flex-col flex-wrap items-start justify-between gap-5">
            {idealPersonaArr?.length
              ? idealPersonaArr.map((v, i) => (
                  <div
                    key={i}
                    className="relative lg:w-[48%] w-full flex items-center gap-4 rounded-[20px] shadow-[0px_0px_50px_0px_#00000033] p-4 cursor-pointer"
                    onClick={() => onSetIndustryType(v?.title)}
                  >
                    <div className="absolute right-2 top-2 cursor-pointer bg-[#0606061A] w-fit h-fit p-2 rounded-full">
                      <div className="h-5 w-5 rounded-full border-2 border-solid border-[#060606E5] flex items-center justify-center">
                        {industryType === v?.title ? (
                          <div className="h-3 w-3 rounded-full bg-[#060606E5]" />
                        ) : null}
                      </div>
                    </div>
                    <div className="w-32 h-auto rounded-[20px] overflow-hidden">
                      <Image src={v?.image} alt={v?.title} className="h-[8rem]" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <Image
                        src={blackLogo}
                        alt="blackLogo"
                        className="w-auto h-9"
                      />
                      <div className="flex flex-col items-start">
                        <p className="sora-regular text-[#060606] lg:text-[16px] text-[12px]">
                          Type:&nbsp;{v?.type}
                        </p>
                        <h2 className="m-plus-rounded-1c-regular text-[#060606] lg:text-2xl text-xl">
                          {v?.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <CommonButton
            className={`!mt-8 !border-[2px] !border-[#060606] !text-[#060606] !font-[500] !px-6 !py-1] !text-[16px] !capitalize flex !items-center gap-2 w-fit h-fit`}
            icon={<ArrowRight stroke={`#060606`} width={19} height={13} />}
            disabled={industryType === "" ? true : false}
            onClick={() =>
              industryType === "" ? undefined : onNext(industryType, open.type)
            }
            buttontext={"Save & Proceed"}
          />
        </div>
      </div>
    </CommonModal>
  );
};

export default IdealPersonaModal;
