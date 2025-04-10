import React, { useEffect, useState } from "react";
import CommonModal from "../commonModal";
import { EndChatValue, UploadYourDocValue } from "../../redux/OpenModal";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/router";
import lets_icons_back_2 from "../../../public/assets/icons/lets_icons_back_2.svg";
import Image from "next/image";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Dropzone from "react-dropzone";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const UploadYourDocModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const uploadYourDocValue = useSelector(
    (state) => state.openModal.uploadYourDocValue
  );

  const [width, setWidth] = useState(1366);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <CommonModal
        open={uploadYourDocValue}
        onClose={() => dispatch(UploadYourDocValue(false))}
        width={width > 720 ? "50%" : "90%"}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center justify-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center">
              <h3 className="m-plus-rounded-1c-regular lg:text-2xl text-xl text-center">
                <span className="m-plus-rounded-1c-medium">Upload</span>
                &nbsp;your relevant documents
                <br />
                for AI coaching sessions (if any)
              </h3>
              <p>(e.g., sales decks, proposals) </p>
            </div>
          </div>

          <Dropzone
            onDrop={(acceptedFiles) =>
              console.log(acceptedFiles, "acceptedFiles")
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section
                className={`border border-dashed border-[#14558C] rounded-[10px] w-full h-full cursor-pointer lg:mb-0 mb-2`}
              >
                <div
                  {...getRootProps()}
                  className="h-[25vh] w-full flex items-center justify-center"
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col gap-0.5">
                    <p className="lg:text-[16px] text-[12px] sora-regular text-[#060606] text-center">
                      Browse or upload,&nbsp;
                      <span className="text-[#14558C]">your files</span>
                      &nbsp;here
                    </p>
                    <p className="lg:text-[14px] text-[12px] sora-regular text-[#060606] text-center">
                      (Supported formats: PDF, PPT, DOCX)
                    </p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>

          <div className="flex w-full gap-2 mt-2">
            <button
              className="flex-1 bg-[#FFDE59] text-black py-3 rounded-md flex items-center justify-center gap-2 shadow-md mb-2 cursor-pointer"
              onClick={() => {
                dispatch(UploadYourDocValue(false));
              }}
            >
              CONFIRM UPLOAD
              <AddCircleOutlineIcon className="!text-lg" />
            </button>
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default UploadYourDocModal;
