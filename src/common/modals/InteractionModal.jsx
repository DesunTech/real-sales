import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../commonModal";
import Image from "next/image";
import Dropzone from "react-dropzone";
import CommonButton from "../commonButton";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import BookAdemo from "../bookAdemo";
import persona_plant from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import persona_food from "../../../public/assets/images/RealSales-user-images/persona-food-mgmt.png";
import persona_food_new from "../../../public/assets/images/RealSales-user-images/persona-food-new.png";
import { InteractionValue } from "../../redux/OpenModal";

const InteractionModal = ({ onNext }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.openModal.interactionValue);

  return (
    <CommonModal 
      open={open} 
      onClose={() => dispatch(InteractionValue(false))}
      width={"60%"}
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
        <div className="w-full flex items-center justify-center flex-col">
          <div className="w-full flex flex-col items-start justify-start gap-y-5 gap-x-10">
            <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-y-10 gap-x-5">
              <div className="bg-[url(../../public/assets/images/aboutus/PersonaCardImg.png)] shadow-md bg-cover bg-center bg-no-repeat w-full rounded-[10px]">
                <div className="relative bg-gradient-to-r from-white/50 to-white/0 py-6 px-8 w-full flex items-center justify-between flex-col">
                  <div className="flex flex-col items-start justify-between gap-2">
                    <div className="lg:w-28 w-20 lg:h-28 h-20 rounded-full overflow-hidden bg-gray-100">
                      <Image src={persona_plant} alt={"Prospective"} />
                    </div>
                    <div className="w-full">
                      <h1 className="lg:text-[28px] text-[16px] m-plus-rounded-1c-medium text-[#060606B2]">
                        Prospective
                      </h1>
                      <p className="lg:text-[14px] text-[12px] m-plus-rounded-1c-regular text-[#060606CC]">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry, lorem Ipsum has been the
                        industry's ...
                      </p>
                    </div>
                  </div>
                  <BookAdemo
                    BookaDemo={"CHOOSE IT"}
                    className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit uppercase absolute -bottom-4 left-[30%]`}
                  />
                </div>
              </div>

              <div className="bg-[url(../../public/assets/images/aboutus/PersonaCardImg.png)] shadow-md bg-cover bg-center bg-no-repeat w-full rounded-[10px]">
                <div className="relative bg-gradient-to-r from-white/50 to-white/0 py-6 px-8 w-full flex items-center justify-between flex-col">
                  <div className="flex flex-col items-start justify-between gap-2">
                    <div className="lg:w-28 w-20 lg:h-28 h-20 rounded-full overflow-hidden bg-gray-100">
                      <Image src={persona_food} alt={"Sales"} />
                    </div>
                    <div className="w-full">
                      <h1 className="lg:text-[28px] text-[16px] m-plus-rounded-1c-medium text-[#060606B2]">
                        Sales
                      </h1>
                      <p className="lg:text-[14px] text-[12px] m-plus-rounded-1c-regular text-[#060606CC]">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry, lorem Ipsum has been the
                        industry's ...
                      </p>
                    </div>
                  </div>
                  <BookAdemo
                    BookaDemo={"CHOOSE IT"}
                    className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit uppercase absolute -bottom-4 left-[30%]`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[url(../../public/assets/images/aboutus/PersonaCardImg.png)] shadow-md bg-cover bg-center bg-no-repeat w-full rounded-[10px]">
              <div className="relative bg-gradient-to-r from-white/50 to-white/0 py-6 px-8 w-full flex items-center justify-between flex-col">
                <div className="flex flex-col items-start justify-between gap-2">
                  <div className="w-full">
                    <div className="lg:w-28 w-20 lg:h-28 h-20 rounded-full overflow-hidden bg-gray-100">
                      <Image src={persona_food_new} alt={"Close"} />
                    </div>
                  </div>
                  <div className="w-full flex gap-4 lg:flex-row flex-col">
                    <div className="flex flex-col items-start lg:w-[40%] w-full">
                      <h1 className="lg:text-[28px] text-[16px] m-plus-rounded-1c-medium text-[#060606B2]">
                        Close
                      </h1>
                      <p className="lg:text-[14px] text-[12px] m-plus-rounded-1c-regular text-[#060606CC]">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry, lorem Ipsum has been the
                        industry's ...
                      </p>
                    </div>
                    <div className="lg:w-[60%] w-full flex items-center lg:flex-row flex-col lg:gap-4 gap-2">
                      <p className="lg:text-[16px] text-[13px] sora-regular text-[#060606] lg:w-[35%] w-full">
                        Upload&nbsp;Optional Documents:
                      </p>
                      <Dropzone
                        onDrop={(acceptedFiles) =>
                          console.log(acceptedFiles, "acceptedFiles")
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section
                            className={`border-2 border-dashed rounded-[10px] lg:w-[75%] w-full h-full cursor-pointer lg:mb-0 mb-2`}
                          >
                            <div
                              {...getRootProps()}
                              className="h-full w-full flex items-center justify-center"
                            >
                              <input {...getInputProps()} />
                              <p className="lg:text-[14px] text-[12px] m-plus-rounded-1c-regular text-[#060606CC] underline p-4">
                                Upload or drag & drop your files
                              </p>
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </div>
                  </div>
                </div>
                <BookAdemo
                  BookaDemo={"CHOOSE IT"}
                  className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit uppercase absolute -bottom-4 left-[18%]`}
                />
              </div>
            </div>
          </div>
          <CommonButton
            className={`!mt-8 !border-[2px] !border-[#060606] !text-[#060606] !font-[500] !px-6 !py-1] !text-[16px] !capitalize flex !items-center gap-2 w-fit h-fit`}
            icon={<ArrowRight stroke={`#060606`} width={19} height={13} />}
            onClick={onNext}
            buttontext={"Proceed"}
          />
        </div>
      </div>
    </CommonModal>
  );
};

export default InteractionModal; 