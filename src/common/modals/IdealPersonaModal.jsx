import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../commonModal";
import Image from "next/image";
import CommonButton from "../commonButton";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import blackLogo from "../../../public/assets/images/RealSales-official-logo/For Web/png/Black logo - no background.png";
import persona_food_new from "../../../public/assets/images/RealSales-user-images/persona-food-new.png";
import persona_food_old from "../../../public/assets/images/RealSales-user-images/persona-food.png";
import { IdealPersonaValue } from "../../redux/OpenModal";

const IdealPersonaModal = ({ onNext }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.openModal.idealPersonaValue);

  const idealPersonaArr = [
    { image: persona_food_new, type: "Industry", title: "Food" },
    { image: persona_food_old, type: "Industry", title: "Beverage" },
  ];

  return (
    <CommonModal 
      open={open} 
      onClose={() => dispatch(IdealPersonaValue(false))}
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
                    className="relative lg:w-[48%] w-full flex items-center gap-4 rounded-[20px] shadow-[0px_0px_50px_0px_#00000033] p-4"
                  >
                    <div className="absolute right-2 top-2 cursor-pointer bg-[#0606061A] w-fit h-fit p-2 rounded-full">
                      <div className="h-5 w-5 rounded-full border-2 border-solid border-[#060606E5]" />
                    </div>
                    <div className="w-32 h-auto rounded-[20px] overflow-hidden">
                      <Image src={v?.image} alt={v?.title} />
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
            onClick={onNext}
            buttontext={"Save & Proceed"}
          />
        </div>
      </div>
    </CommonModal>
  );
};

export default IdealPersonaModal; 