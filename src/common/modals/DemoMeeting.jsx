import React, { useEffect, useState } from "react";
import CommonModal from "../commonModal";
import { DemoMeetingValue, SessionModesValue } from "../../redux/OpenModal";
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
import axios from "axios";
import { useApi } from "../../hooks/useApi";
import CountryCodeSelector from "../CountryCodeSelector";

const DemoMeeting = (props) => {
  const { Post } = useApi();
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
  const [fromDataErr, setFromDataErr] = useState(initialFormData);
  const [width, setWidth] = useState(1366);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setFromData((pre) => ({ ...pre, [name]: value }));
    // Clear error for the field being typed in
    setFromDataErr((pre) => ({ ...pre, [name]: "" }));
  };

  const submitScheduleMeeting = async () => {
    let valid = true;
    const errors = { ...initialFormData };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    // Name validation
    if (!fromData.name.trim()) {
      valid = false;
      errors.name = "Name is required";
    }

    // Email validation
    if (!fromData.email.trim()) {
      valid = false;
      errors.email = "Email is required";
    } else if (!emailRegex.test(fromData.email)) {
      valid = false;
      errors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!fromData.phone.trim()) {
      valid = false;
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(fromData.phone)) {
      valid = false;
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    // Industry validation
    if (!fromData.industry.trim()) {
      valid = false;
      errors.industry = "Industry is required";
    }

    setFromDataErr(errors);

    if (valid) {
      try {
        const data = await Post(``, fromData);
        if (data) {
          setFromDataErr(initialFormData);
          dispatch(DemoMeetingValue(false));
          dispatch(SessionModesValue(true));
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error, "error");
      }
    }
  };

  useEffect(() => {
    setFromData((pre) => ({ ...pre, idc: idc }));
  }, [idc]);

  console.log(fromData, "fromData");

  const demoMeetingValue = useSelector(
    (state) => state.openModal.demoMeetingValue
  );

  return (
    <>
      <CommonModal
        open={demoMeetingValue}
        onClose={() => {
          setFromDataErr(initialFormData);
          dispatch(DemoMeetingValue(false));
        }}
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
                  value={fromData?.name}
                  error={!!fromDataErr?.name}
                  helperText={fromDataErr?.name}
                  required
                />
                <TextField
                  type="email"
                  label="Your email address"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="email"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                  value={fromData?.email}
                  error={!!fromDataErr?.email}
                  helperText={fromDataErr?.email}
                  required
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
                  value={fromData?.companyName}
                />
                <TextField
                  label="Your job title (optional)"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="jobTitle"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                  value={fromData?.jobTitle}
                />
              </div>

              <div className="flex gap-2">
                <CountryCodeSelector
                  value={idc}
                  onChange={setIdc}
                  label="Country Code"
                  color="#000000"
                />
                <TextField
                  type="number"
                  label="Your phone number"
                  variant="standard"
                  className="w-[85%] outline-[#000000]"
                  name="phone"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                  value={fromData?.phone}
                  error={!!fromDataErr?.phone}
                  helperText={fromDataErr?.phone}
                  required
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
                  value={fromData?.industry}
                  error={!!fromDataErr?.industry}
                  helperText={fromDataErr?.industry}
                  required
                />
                <TextField
                  label="Your specific needs (optional)"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="specificNeeds"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                  value={fromData?.specificNeeds}
                />
              </div>
            </div>
          </div>
          <CommonButton
            className={`w-full !border-0 !outline-0 !bg-[#FFDE5A] shadow-md !text-[#060606] text-[20px]`}
            buttontext={`Schedule Meeting`}
            onClick={() => submitScheduleMeeting()}
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
