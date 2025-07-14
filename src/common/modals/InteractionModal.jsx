import React, { useEffect, useRef, useState } from "react";
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
import { apis } from "../../utils/apis";
import { useApi } from "../../hooks/useApi";
import { AddSummary } from "../../redux/SummaryReducer";
import { showToast } from "../../utils/toastConfig";

const InteractionModal = ({ onNext }) => {
  const dispatch = useDispatch();
  const { ai_personas, interaction_modes_by_name, documents_upload } = apis;
  const { Get, Post } = useApi();
  const open = useSelector((state) => state.openModal.interactionValue);
  const [choosePersona, setChoosePersona] = useState("");
  const [interactionModesData, setInteractionModesData] = useState({});
  const [linkPersona, setLinkPersona] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [addDocText, setAddDocText] = useState({});
  const [fileError, setFileError] = useState("");

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const GetAiMode = async () => {
      try {
        let data = await Get(`${interaction_modes_by_name}/${choosePersona}`);
        if (data?.mode_id) {
          setInteractionModesData(data);
        } else {
          setInteractionModesData({});
        }
        console.log(data, "aip_data");
      } catch (error) {
        console.log(error);
      }
    };
    if (choosePersona !== "") {
      GetAiMode();
    }
  }, [choosePersona]);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const validExtensions = ["doc", "docx", "pdf"];
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 1MB

    if (files && files.length > 0) {
      // Check for file size before filtering extensions
      const oversizeFile = Array.from(files).find(
        (file) => file.size > MAX_FILE_SIZE
      );
      if (oversizeFile) {
        setFileError(
          "File size cannot be larger than 10MB. Try again compressing the file"
        );
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      const validFiles = Array.from(files).filter((file) => {
        const extension = file.name.split(".").pop().toLowerCase();
        return validExtensions.includes(extension);
      });

      if (validFiles.length > 0) {
        try {
          setIsUploading(true);
          setFileError("");
          const formData = new FormData();
          validFiles.forEach((file) => {
            formData.append("file", file); // "files" is the field name; adjust if your backend expects a different name
          });
          console.log("Valid files:", formData);
          let data = await Post(documents_upload, formData);
          // Clear the file input after successful upload
          if (data?.summary) {
            showToast.success("Document uploaded successfully");
            setAddDocText(data);
            localStorage.setItem("summary", JSON.stringify(data));
            dispatch(AddSummary(data));
            setLinkPersona(true);
          }
          if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
          setFileError("Failed to upload document. Please try again.");
          console.log(error, "_error_");
          // Clear the file input on error as well
          if (fileInputRef.current) fileInputRef.current.value = "";
        } finally {
          setIsUploading(false);
        }
      } else {
        setFileError("Please upload only .doc, .docx, or .pdf files.");
        // Clear the file input if invalid
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  console.log(open?.fromData, "_fromData__");
  return (
    <CommonModal
      open={open?.open}
      onClose={() => dispatch(InteractionValue({ open: false, fromData: "" }))}
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
                <div
                  className={`relative ${
                    choosePersona === "prospecting"
                      ? `bg-gradient-to-r from-blue-200/50 to-white/0`
                      : `bg-gradient-to-r from-white/50 to-white/0`
                  } py-6 px-8 w-full flex items-center justify-between flex-col`}
                >
                  <div className="flex flex-col items-start justify-between gap-2">
                    <div className="lg:w-28 w-20 lg:h-28 h-20 rounded-full overflow-hidden bg-gray-100">
                      <Image src={persona_plant} alt={"prospecting"} />
                    </div>
                    <div className="w-full">
                      <h1 className="lg:text-[28px] text-[16px] m-plus-rounded-1c-medium text-[#060606B2]">
                        Prospecting
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
                    onClick={() => {
                      setChoosePersona("prospecting");
                    }}
                    className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit uppercase absolute -bottom-4 left-[30%]`}
                  />
                </div>
              </div>

              <div className="bg-[url(../../public/assets/images/aboutus/PersonaCardImg.png)] shadow-md bg-cover bg-center bg-no-repeat w-full rounded-[10px]">
                <div
                  className={`relative ${
                    choosePersona === "discovering"
                      ? `bg-gradient-to-r from-blue-200/50 to-white/0`
                      : `bg-gradient-to-r from-white/50 to-white/0`
                  } py-6 px-8 w-full flex items-center justify-between flex-col`}
                >
                  <div className="flex flex-col items-start justify-between gap-2">
                    <div className="lg:w-28 w-20 lg:h-28 h-20 rounded-full overflow-hidden bg-gray-100">
                      <Image src={persona_food} alt={"discovering"} />
                    </div>
                    <div className="w-full">
                      <h1 className="lg:text-[28px] text-[16px] m-plus-rounded-1c-medium text-[#060606B2]">
                        Discovering
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
                    onClick={() => {
                      setChoosePersona("discovering");
                    }}
                    className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit uppercase absolute -bottom-4 left-[30%]`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[url(../../public/assets/images/aboutus/PersonaCardImg.png)] shadow-md bg-cover bg-center bg-no-repeat w-full rounded-[10px]">
              <div
                className={`relative ${
                  choosePersona === "closing"
                    ? `bg-gradient-to-r from-blue-200/50 to-white/0`
                    : `bg-gradient-to-r from-white/50 to-white/0`
                } py-6 px-8 w-full flex items-center justify-between flex-col`}
              >
                <div className="flex flex-col items-start justify-between gap-2">
                  <div className="w-full">
                    <div className="lg:w-28 w-20 lg:h-28 h-20 rounded-full overflow-hidden bg-gray-100">
                      <Image src={persona_food_new} alt={"closing"} />
                    </div>
                  </div>
                  <div className="w-full flex gap-4 lg:flex-row flex-col">
                    <div className="flex flex-col items-start lg:w-[40%] w-full">
                      <h1 className="lg:text-[28px] text-[16px] m-plus-rounded-1c-medium text-[#060606B2] capitalize">
                        closing
                      </h1>
                      <p className="lg:text-[14px] text-[12px] m-plus-rounded-1c-regular text-[#060606CC]">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry, lorem Ipsum has been the
                        industry's ...
                      </p>
                    </div>
                    <div className="lg:w-[60%] w-full flex flex-col items-end gap-2">
                      <div className="w-full h-24 flex items-center lg:flex-row flex-col lg:gap-4 gap-2">
                        <p className="lg:text-[16px] text-[13px] sora-regular text-[#060606] lg:w-[35%] w-full">
                          Upload&nbsp;Optional Documents:
                        </p>
                        {isUploading ? (
                          <div className="w-full flex items-center justify-center">
                            <div class="h-14 w-14 rounded-full border-4 border-gray-300 border-t-yellow-500 animate-spin"></div>
                          </div>
                        ) : addDocText?.filename ? (
                          <div
                            className={`flex items-center justify-center border-2 border-dashed rounded-[10px] lg:w-[75%] w-full h-full cursor-pointer lg:mb-0 mb-2`}
                          >
                            {addDocText?.filename}
                          </div>
                        ) : (
                          <div
                            className={`flex items-center justify-center border-2 border-dashed rounded-[10px] lg:w-[75%] w-full h-full cursor-pointer lg:mb-0 mb-2`}
                            onClick={linkPersona ? undefined : handleClick}
                          >
                            <p className="lg:text-[14px] text-[12px] m-plus-rounded-1c-regular text-[#060606CC] underline p-4">
                              Upload or drag & drop your files
                            </p>
                            <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              accept=".doc,.docx,.pdf"
                              onChange={handleFileChange}
                            />
                          </div>
                        )}
                      </div>
                      {fileError && (
                        <div className="text-red-500 text-xs mt-1">
                          {fileError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <BookAdemo
                  BookaDemo={"CHOOSE IT"}
                  onClick={() => {
                    setChoosePersona("closing");
                  }}
                  className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-1 h-fit uppercase absolute -bottom-4 left-[18%]`}
                />
              </div>
            </div>
          </div>
          <CommonButton
            className={`!mt-8 !border-[2px] !border-[#060606] !text-[#060606] !font-[500] !px-6 !py-1] !text-[16px] !capitalize flex !items-center gap-2 w-fit h-fit`}
            icon={<ArrowRight stroke={`#060606`} width={19} height={13} />}
            disabled={
              !interactionModesData?.mode_id ? true : isUploading ? true : false
            }
            onClick={() => {
              if (!isUploading) {
                if (choosePersona === "") {
                  undefined;
                } else {
                  onNext({
                    ...open?.fromData,
                    mode_id: interactionModesData?.mode_id,
                  });
                }
              }
            }}
            buttontext={"Proceed"}
          />
        </div>
      </div>
    </CommonModal>
  );
};

export default InteractionModal;
