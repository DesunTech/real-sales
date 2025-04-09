import React, { useEffect, useState } from "react";
import CommonModal from "../commonModal";
import { DemoMeetingValue } from "../../redux/OpenModal";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CommonButton from "../commonButton";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const DemoMeeting = (props) => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    idc: "",
    companyName: "",
    jobTitle: "",
    industry: "",
    specificNeeds: "",
  };

  const dispatch = useDispatch();
  const [idc, setIdc] = useState(91);
  const [fromData, setFromData] = useState(initialFormData);
  const [width, setWidth] = useState(1366);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setFromData((pre)=> ({...pre, [name]: value }));
  };

  useEffect(() => {
    setFromData((pre)=> ({...pre, idc: idc }));
  },[idc])

  console.log(fromData, "fromData")

  const demoMeetingValue = useSelector(
    (state) => state.openModal.demoMeetingValue
  );

  console.log(demoMeetingValue, "demoMeetingValue");
  return (
    <>
      <CommonModal
        open={demoMeetingValue}
        onClose={() => dispatch(DemoMeetingValue(false))}
        width={width > 720 ? "60%" : "90%"}
      >
        <div className="w-full flex flex-col items-center gap-4">
          <div className="flex flex-col items-center w-[80%] gap-2">
            <h1 className="lg:text-4xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular text-center">
              <span className="m-plus-rounded-1c-medium">Unlock</span>&nbsp;your
              Sales Potential, Schedule a&nbsp;
              <span className="m-plus-rounded-1c-medium">Demo meeting</span>
            </h1>
            <p className="text-[16px] text-[#060606] m-plus-rounded-1c-regular text-center">
              Discover how we can Transform your Sales team's Performance
            </p>
          </div>
          <div className="w-full">
            <div className="flex items-start gap-2 mt-4">
              <div className="rounded-full border border-solid border-[#060606] p-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#060606]" />
              </div>
              <p className="text-[16px] text-[#060606] sora-regular text-start">
                Fill the details for Demo Session:
              </p>
            </div>

            <div className="flex flex-col gap-4">

              <div className="flex lg:flex-row flex-col gap-2">
                <TextField
                  label="Your full name"
                  variant="standard"
                  className="w-full"
                  name="name"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                type="email"
                  label="Your email address"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="email"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="flex lg:flex-row flex-col gap-2">
                <TextField
                  label="Your company name (optional)"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="companyName"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  label="Your job title (optional)"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="jobTitle"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="flex gap-2">
                <FormControl
                  variant="standard"
                  className="w-[15%]"
                  color="#000000"
                >
                  <InputLabel id=""></InputLabel>
                  <Select
                    value={idc}
                    onChange={(e) => setIdc(e.target.value)}
                    label="idc"
                    color="#000000"
                  >
                    <MenuItem value={91}>Eg. +91</MenuItem>
                    <MenuItem value={92}>Eg. +92</MenuItem>
                    <MenuItem value={93}>Eg. +93</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                type="number"
                  label="Your phone number"
                  variant="standard"
                  className="w-[85%] outline-[#000000]"
                  name="phone"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="flex lg:flex-row flex-col gap-2">
                <TextField
                  label="Your industry"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="industry"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  label="Your specific needs (optional)"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="specificNeeds"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
          <CommonButton
            className={`w-full !border-0 !outline-0 !bg-[#FFDE5A] shadow-md !text-[#060606] text-[20px]`}
            buttontext={`Schedule Meeting`}
            icon={
              <DoneOutlinedIcon className="text-[#060606] !font-normal !text-[20px]" />
            }
          />
          <hr className="border-[#060606CC] w-full" />
          <div className="flex items-center w-full">
            <div className="bg-[#26AD35] w-12 h-12 rounded-full lg:flex hidden" />
            <p className="bg-gradient-to-r from-[#26AD35] to-[#077A15] text-white sora-regular lg:-ml-4 text-[14px] lg:w-[calc(100%_-_48px)] w-full py-1.5 lg:px-0 px-1.5">
              * Success! Thank you. We'll contact you within 24hrs. to confirm
              your Demo.
            </p>
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default DemoMeeting;
