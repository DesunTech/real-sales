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
import selfimage from "../../../public/assets/images/personas/self.png";
import contractimage from "../../../public/assets/images/personas/contract.png";
import stateimage from "../../../public/assets/images/personas/state.png";
import countryimage from "../../../public/assets/images/personas/country.png";
import juniorimage from "../../../public/assets/images/personas/junior.png";
import seniorimage from "../../../public/assets/images/personas/senior.png";
import midimage from "../../../public/assets/images/personas/mid.png";
import plantManagerimage from "../../../public/assets/images/personas/plantManager.png";
import maintenanceimage from "../../../public/assets/images/personas/maintenance.png";
import procecurementimage from "../../../public/assets/images/personas/procecurement.png";
import small from "../../../public/assets/images/personas/small.png";
import medium from "../../../public/assets/images/personas/medium.png";
import large from "../../../public/assets/images/personas/large.png";
import { apis } from "../../utils/apis";
import { useApi } from "../../hooks/useApi";

const IdealPersonaModal = ({ onNext }) => {
  const dispatch = useDispatch();
  const { Get } = useApi();
  const { industries, geography } = apis;
  const open = useSelector((state) => state.openModal.idealPersonaValue);
  const [industryType, setIndustryType] = useState("");
  const [industryView, setIndustryView] = useState("");
  const [idealPersonaArr, setIdealPersonaArr] = useState([]);

  const getIndustries = async () => {
    try {
      const data = await Get(industries);
      console.log(data, "<___data");
      const industriesWithImages = [
        {
          name: "food_and_beverage",
          details: "Industry-Specific Context for Food & Beverage:\\n- Focus on food safety and hygiene standards (HACCP, FDA, ISO 22000)\\n- Emphasis on temperature control and monitoring systems\\n- Importance of shelf-life management and product freshness\\n- Need for traceability in supply chain (from farm to fork)\\n- Compliance with FDA regulations and food safety standards\\n- Quality control in food processing and packaging\\n- Sanitation and cleaning protocols (CIP, SIP systems)\\n- Allergen management and cross-contamination prevention\\n- Cold chain logistics and temperature monitoring\\n- Packaging requirements for food safety and preservation\\n- Sustainability in food production and packaging\\n- Waste management and reduction strategies\\n- Energy efficiency in food processing\\n- Water conservation and treatment\\n- Product quality and consistency",
          industry_id: "1ce9f0c2-fdb3-4215-91f3-31cba9a64b90",
          created_at: "2025-05-23T12:16:16",
          updated_at: "2025-05-23T12:16:16",
        }
      ].map(industry => ({
        ...industry,
        image: persona_food_new, // You can make this dynamic based on industry type if needed
        type: "Industry"
      }));
      setIdealPersonaArr(industriesWithImages);
    } catch (error) {
      console.log(error, "<___error");
    }
  }

  const getGeography = async () => {
    try {
      const data = await Get(geography);
      console.log(data, "<___data");
      const industriesWithImages = [
        {
          name: "food_and_beverage",
          details: "Industry-Specific Context for Food & Beverage:\\n- Focus on food safety and hygiene standards (HACCP, FDA, ISO 22000)\\n- Emphasis on temperature control and monitoring systems\\n- Importance of shelf-life management and product freshness\\n- Need for traceability in supply chain (from farm to fork)\\n- Compliance with FDA regulations and food safety standards\\n- Quality control in food processing and packaging\\n- Sanitation and cleaning protocols (CIP, SIP systems)\\n- Allergen management and cross-contamination prevention\\n- Cold chain logistics and temperature monitoring\\n- Packaging requirements for food safety and preservation\\n- Sustainability in food production and packaging\\n- Waste management and reduction strategies\\n- Energy efficiency in food processing\\n- Water conservation and treatment\\n- Product quality and consistency",
          industry_id: "1ce9f0c2-fdb3-4215-91f3-31cba9a64b90",
          created_at: "2025-05-23T12:16:16",
          updated_at: "2025-05-23T12:16:16",
        }
      ].map(industry => ({
        ...industry,
        image: persona_food_new, // You can make this dynamic based on industry type if needed
        type: "Industry"
      }));
      setIdealPersonaArr(industriesWithImages);
    } catch (error) {
      console.log(error, "<___error");
    }
  }

  useEffect(() => {
    if (open?.type === "industry") {
      getIndustries();
    } else if (open?.type === "role") {
      setIdealPersonaArr([
        {
          image: plantManagerimage,
          type: "Role",
          name: "plant_manager",
        },
        {
          image: procecurementimage,
          type: "Role",
          name: "production_manager",
        },
        {
          image: maintenanceimage,
          type: "Role",
          name: "maintenance_manager",
        },
      ]);
    } else if (open?.type === "experience_level") {
      setIdealPersonaArr([
        {
          image: juniorimage,
          type: "Experience",
          name: "junior",
        },
        { image: seniorimage, type: "Experience", name: "mid",},
        {
          image: midimage,
          type: "Experience",
          name: "senior",
        },
      ]);
    } else if (open?.type === "geography") {
      setIdealPersonaArr([
        { image: stateimage, type: "Geography", name: "us" },
      ]);
    } else if (open?.type === "manufacturing_model") {
      setIdealPersonaArr([
        {
          image: selfimage,
          type: "Manufacture",
          name: "self_manufacturing",
        },
        {
          image: contractimage,
          type: "Manufacture",
          name: "contract_manufacturing",
         
        },
      ]);
    } else if (open?.type === "plant_size_impact") {
      setIdealPersonaArr([
        { image: small, type: "plant size", name: "small", },
        {
          image: medium,
          type: "plant size",
          name: "medium",
        },
        {
          image: large,
          type: "plant size",
          name: "large",
        },
      ]);
    } else {
      setIdealPersonaArr([]);
    }
  }, [open?.type]);

  const onSetIndustryType = (type, view) => {
    {
      if (industryType !== type) {
        setIndustryType(type);
      } else {
        setIndustryType("");
      }

      if (industryView !== view) {
        setIndustryView(view);
      } else {
        setIndustryView("");
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
                  onClick={() => onSetIndustryType(v?.name, v?.name)}
                >
                  <div className="absolute right-2 top-2 cursor-pointer bg-[#0606061A] w-fit h-fit p-2 rounded-full">
                    <div className="h-5 w-5 rounded-full border-2 border-solid border-[#060606E5] flex items-center justify-center">
                      {industryType === v?.name ? (
                        <div className="h-3 w-3 rounded-full bg-[#060606E5]" />
                      ) : null}
                    </div>
                  </div>
                  <div className="w-32 h-auto rounded-[20px] overflow-hidden">
                    <Image
                      src={v?.image}
                      alt={v?.name}
                      className="h-[8rem]"
                    />
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
                        {v?.name}
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
              industryType === ""
                ? undefined
                : onNext(industryType, industryView, open.type)
            }
            buttontext={"Save & Proceed"}
          />
        </div>
      </div>
    </CommonModal>
  );
};

export default IdealPersonaModal;
