import React, { useState } from "react";
import PersonaCard from "../../common/PersonaCard";
import InteractionCard from "../../common/InteractionCard";
import BookAdemo from "../../common/bookAdemo";
import Image from "next/image";
import Dropzone from "react-dropzone";
import CommonButton from "../../common/commonButton";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import persona_plant from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import persona_food from "../../../public/assets/images/RealSales-user-images/persona-food-mgmt.png";
import persona_food_new from "../../../public/assets/images/RealSales-user-images/persona-food-new.png";
import blackLogo from "../../../public/assets/images/RealSales-official-logo/For Web/png/Black logo - no background.png";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import CommonModal from "../../common/commonModal";
import { useRouter } from "next/router";

import persona_engg from "../../../public/assets/images/RealSales-user-images/persona-engg.png";
import persona_food_old from "../../../public/assets/images/RealSales-user-images/persona-food.png";
import persona_plant_new from "../../../public/assets/images/RealSales-user-images/persona-plant-new.png";

const MeetPerfectPersona = () => {
  const router = useRouter();
  const [openPersona, setOpenPersona] = useState(false);
  const [openInteraction, setOpenInteraction] = useState(false);
  const [idealPersona, setIdealPersona] = useState(false);
  const [shortlistedPersona, setShortlistedPersona] = useState(false);

  const idealPersonaArr = [
    { image: persona_food_new, type: "Industry", title: "Food" },
    { image: persona_food_old, type: "Industry", title: "Beverage" },
  ];

  const shortlistedPersonaArr = [
    {
      image: persona_plant,
      title: "Operations Manager",
      state: "Nevada, USA",
    },
    {
      image: persona_food_old,
      title: "Food Specialist",
      state: "Quebec, Canada",
    },
    {
      image: persona_plant_new,
      title: "Plant Manager",
      state: "Oaxaca, Mexico",
    },
    {
      image: persona_engg,
      title: "Project Engineer",
      state: "Arizona, USA",
    },
  ];

  return (
    <div className="page-container mx-auto px-4 py-8 container flex items-center justify-center flex-col lg:gap-4 gap-2">
      <p className="lg:text-2xl text-[16px] text-center sora-light text-[#060606] w-full">
        Want to meet with Perfect Persona?
      </p>
      <h1 className="lg:text-6xl text-3xl text-center text-[#060606] m-plus-rounded-1c-regular lg:w-[60%] w-full">
        We're here to give you a pixel-perfect Choice
      </h1>
      <div className="w-full flex flex-col items-start gap-2">
        <h2
          onClick={() => setOpenPersona(true)}
          className="cursor-pointer lg:text-[22px] text-[16px] m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-start"
        >
          <span className="m-plus-rounded-1c-medium flex items-center gap-1">
            <div className="rounded-full border border-solid border-[#060606] p-1">
              <div className="w-2.5 h-2.5 rounded-full bg-[#060606]" />
            </div>
            Types
          </span>
          &nbsp;of our Real AI Persona:
        </h2>
        <div className="flex flex-col items-center">
          <div className="border-l-2 border-dashed border-[#060606] h-24" />
          <ArrowDropDownOutlinedIcon className="w-5 h-5" />
        </div>
        <h2 className="lg:text-[22px] text-[16px] m-plus-rounded-1c-regular text-[#06060670] w-full flex items-center justify-start">
          <div className="rounded-full border border-solid border-[#06060670] p-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#06060670]" />
          </div>
          &nbsp;Some Real&nbsp;
          <span className="m-plus-rounded-1c-medium flex items-center gap-1">
            Interaction
          </span>
          &nbsp; Mode of Real AI:
        </h2>
      </div>
      {/* Persona */}
      <CommonModal
        open={openPersona}
        onClose={() => setOpenPersona(false)}
        width={"60%"}
      >
        <div className="flex flex-col gap-4 items-start">
          <div className="flex flex-col items-start">
            <h2
              onClick={() => setOpenPersona(true)}
              className="lg:text-[22px] text-[16px] m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-start"
            >
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
                <PersonaCard title={"Persona by Industry"} />
                <PersonaCard title={"Persona by Role"} />
              </div>
              <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-y-5 gap-x-10">
                <PersonaCard title={"Persona by Experience"} />
                <PersonaCard title={"Persona by Geography"} />
              </div>
              <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-y-5 gap-x-10">
                <PersonaCard title={"Persona by Manufacture"} />
                <div className="w-full">{/* fake */}</div>
              </div>
            </div>
            <CommonButton
              className={`!mt-8 !border-[2px] !border-[#060606] !text-[#060606] !font-[500] !px-6 !py-1] !text-[16px] !capitalize flex !items-center gap-2 w-fit h-fit`}
              icon={<ArrowRight stroke={`#060606`} width={19} height={13} />}
              onClick={() => {
                setOpenInteraction(true);
                setOpenPersona(false);
              }}
              buttontext={"Proceed to Next step"}
            />
          </div>
        </div>
      </CommonModal>
      {/* Interaction */}
      <CommonModal
        open={openInteraction}
        onClose={() => setOpenInteraction(false)}
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
              onClick={() => {
                setOpenInteraction(false);
                setIdealPersona(true);
              }}
              buttontext={"Proceed"}
            />
          </div>
        </div>
      </CommonModal>
      {/* IdealPersona */}
      <CommonModal
        open={idealPersona}
        onClose={() => setIdealPersona(false)}
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
              onClick={() => {
                setShortlistedPersona(true);
                setIdealPersona(false);
              }}
              buttontext={"Save & Proceed"}
            />
          </div>
        </div>
      </CommonModal>
      {/* Shortlisted Persona */}
      <CommonModal
        open={shortlistedPersona}
        onClose={() => setShortlistedPersona(false)}
        width={"52%"}
      >
        <div className="flex flex-col gap-4 items-start">
          <div className="flex flex-col items-start">
            <h2 className="lg:text-[22px] text-[16px] m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-start">
              Your Shortlisted Personas
            </h2>
            <p className="lg:text-[30px] text-[16px] m-plus-rounded-1c-regular text-[#060606E5]">
              (Choose any one):
            </p>
          </div>
          <div className="w-full flex items-center justify-center flex-col py-4">
            <div className="w-full flex lg:flex-row flex-col lg:flex-wrap flex-nowrap lg:items-start items-center justify-between gap-5">
              {shortlistedPersonaArr?.length
                ? shortlistedPersonaArr.map((v, i) => (
                    <div
                      key={i}
                      className={`relative lg:w-[48%] md:w-[70%] w-full h-[270px] rounded-[20px] overflow-hidden`}
                    >
                      <Image
                        src={v?.image}
                        alt={v?.title}
                        className="w-full h-full"
                      />
                      <div className="absolute top-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/60 to-black/0 w-full h-full p-4">
                        <div className="cursor-pointer bg-[#FFFFFF33] w-fit h-fit p-2 rounded-full">
                          <div className="h-5 w-5 rounded-full border-2 border-solid border-[#FFFFFF]" />
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <h1 className="m-plus-rounded-1c-regular lg:text-2xl text-xl text-[#FFDE5A]">
                            {v?.title}
                          </h1>
                          <div className="border-l-4 border-solid border-[#FFDE5A80] bg-gradient-to-r from-[#FFDE5A00] to-[#FFDE5A26] px-3 py-1">
                            <p className="sora-regular text-white lg:text-[16px] text-[12px]">
                              State:&nbsp;
                              <span className="sora-thin">{v?.state}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <CommonButton
              className={`!mt-8 !border-[2px] !border-[#060606] !text-[#060606] !font-[500] !px-6 !py-1] !text-[16px] !capitalize flex !items-center gap-2 w-fit h-fit`}
              icon={<ArrowRight stroke={`#060606`} width={19} height={13} />}
              onClick={() => {
                router?.push("/pricing");
                setShortlistedPersona(false);
              }}
              buttontext={"Save & Proceed"}
            />
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default MeetPerfectPersona;
