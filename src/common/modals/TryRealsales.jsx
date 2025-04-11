import React, { useEffect, useState } from "react";
import CommonModal from "../commonModal";
import { TryRealsalesValue } from "../../redux/OpenModal";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CommonButton from "../commonButton";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import textFieldEnd from "../../../public/assets/images/aboutus/textFieldEnd.png";
import Image from "next/image";
import { useRouter } from "next/router";

const TryRealsales = (props) => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    idc: "",
    couponCode: "",
  };

  const dispatch = useDispatch();
  const router = useRouter();

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

  const submitTryRealsales = () => {
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

    // Coupon Code validation
    if (!fromData.couponCode.trim()) {
      valid = false;
      errors.couponCode = "Coupon code is required";
    }

    setFromDataErr(errors);

    if (valid) {
      try {
        setFromDataErr(initialFormData);
        dispatch(TryRealsalesValue(false));
        router.push("/pricing/free-trial");
      } catch (error) {
        console.log(error, "error");
      }
    }
  };

  useEffect(() => {
    setFromData((pre) => ({ ...pre, idc: idc }));
  }, [idc]);

  console.log(fromData, "fromData");

  const tryRealsalesValue = useSelector(
    (state) => state.openModal.tryRealsalesValue
  );

  return (
    <>
      <CommonModal
        open={tryRealsalesValue}
        onClose={() => {
          setFromDataErr(initialFormData);
          dispatch(TryRealsalesValue(false));
        }}
        width={width > 720 ? "60%" : "90%"}
      >
        <div className="w-full flex flex-col items-center gap-4">
          <div className="flex flex-col items-center lg:w-[80%] w-full gap-2">
            <h1 className="lg:text-4xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular text-center">
              <span className="m-plus-rounded-1c-medium">Register</span>
              &nbsp;with Session code
              <br className="lg:flex hidden" />
              as&nbsp;
              <span className="m-plus-rounded-1c-medium">MVP User</span>
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
                    <MenuItem value={91}>+91</MenuItem>
                    <MenuItem value={92}>+92</MenuItem>
                    <MenuItem value={93}>+93</MenuItem>
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
                  value={fromData?.phone}
                  error={!!fromDataErr?.phone}
                  helperText={fromDataErr?.phone}
                  required
                />
              </div>

              <div className="flex gap-2 relative">
                <TextField
                  label="Your MVP Coupon Code"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="couponCode"
                  color="#000000"
                  InputProps={{
                    sx: { paddingRight: "150px" },
                  }}
                  onChange={(e) => handleChange(e)}
                  value={fromData?.couponCode}
                  error={!!fromDataErr?.couponCode}
                  helperText={fromDataErr?.couponCode}
                  required
                />
                <Image
                  src={textFieldEnd}
                  alt="textFieldEnd"
                  className="absolute right-0"
                />
              </div>
            </div>
          </div>
          <CommonButton
            className={`w-full !border-0 !outline-0 !bg-[#FFDE5A] shadow-md !text-[#060606] text-[20px]`}
            buttontext={`START session`}
            onClick={() => submitTryRealsales()}
            icon={
              <DoneOutlinedIcon className="text-[#060606] !font-normal !text-[20px]" />
            }
          />
          <hr className="border-[#060606CC] w-full" />
          <div className="flex items-center w-full">
            <div className="bg-[#26AD35] w-12 h-12 rounded-full lg:flex hidden" />
            <p className="bg-gradient-to-r from-[#26AD35] to-[#077A15] text-white sora-regular lg:-ml-4 text-[13px] lg:w-[calc(100%_-_48px)] w-full py-1.5 lg:px-0 px-1.5">
              * Note: This form only Accessible for Specially Invited/MVP user
              with Promo Code.
            </p>
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default TryRealsales;
