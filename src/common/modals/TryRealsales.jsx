import React, { useEffect, useState } from "react";
import CommonModal from "../commonModal";
import { TryRealsalesValue } from "../../redux/OpenModal";
import { useDispatch, useSelector } from "react-redux";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
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
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";
import google_logo from "../../../public/assets/icons/google-logo.svg";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const TryRealsales = (props) => {
  const { Post } = useApi();
  const { signup, sign_in, google } = apis;
  const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    // idc: "",
    // couponCode: "",
    password: "",
  };
  const initialLoginFormData = {
    email: "",
    password: "",
    remember_me: true,
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const [idc, setIdc] = useState(91);
  const [fromData, setFromData] = useState(initialFormData);
  const [fromDataErr, setFromDataErr] = useState(initialFormData);
  const [loginfromData, setLoginfromData] = useState(initialLoginFormData);
  const [loginfromDataErr, setLoginFromDataErr] =
    useState(initialLoginFormData);
  const [width, setWidth] = useState(1366);
  const [openLogin, setOpenLogin] = useState(false);

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

  const loginhandleChange = (e) => {
    let { value, name } = e.target;
    setLoginfromData((pre) => ({ ...pre, [name]: value }));
    // Clear error for the field being typed in
    setLoginFromDataErr((pre) => ({ ...pre, [name]: "" }));
  };

  const submitTryRealsales = async () => {
    let valid = true;
    const errors = { ...initialFormData };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    // Name validation
    if (!fromData.first_name.trim()) {
      valid = false;
      errors.first_name = "First Name is required";
    }

    if (!fromData.last_name.trim()) {
      valid = false;
      errors.last_name = "Last Name is required";
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
    if (!fromData.phone_number.trim()) {
      valid = false;
      errors.phone_number = "Phone number is required";
    } else if (!phoneRegex.test(fromData.phone_number)) {
      valid = false;
      errors.phone_number = "Please enter a valid 10-digit phone number";
    }

    // Coupon Code validation
    // if (!fromData.couponCode.trim()) {
    //   valid = false;
    //   errors.couponCode = "Coupon code is required";
    // }

    // Password validation
    if (!fromData.password.trim()) {
      valid = false;
      errors.password = "Password is required";
    } else if (fromData.password.length < 6) {
      valid = false;
      errors.password = "Password must be at least 6 characters long";
    }

    setFromDataErr(errors);

    if (valid) {
      try {
        const data = await Post(signup, {
          ...fromData,
          phone_number: `${idc}${fromData?.phone_number}`,
          role_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          access_level: "free_trial",
        });
        if (data?.token) {
          setFromDataErr(initialFormData);
          dispatch(TryRealsalesValue(false));
          router.push("/pricing/free-trial");
        }
      } catch (error) {
        console.log(error, "error");
      }
    }
  };

  const loginUser = async () => {
    let valid = true;
    const errors = { ...initialLoginFormData };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!loginfromData.email.trim()) {
      valid = false;
      errors.email = "Email is required";
    } else if (!emailRegex.test(loginfromData.email)) {
      valid = false;
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!loginfromData.password.trim()) {
      valid = false;
      errors.password = "Password is required";
    } else if (loginfromData.password.length < 6) {
      valid = false;
      errors.password = "Password must be at least 6 characters long";
    }

    setLoginFromDataErr(errors);

    if (valid) {
      try {
        let data = await Post(sign_in, loginfromData);
        if (data?.token) {
          localStorage.setItem("user", data?.user?.user_id);
          localStorage.setItem("token", data?.token);
          setLoginFromDataErr(initialLoginFormData);
          dispatch(TryRealsalesValue(false));
          router.push("/pricing/free-trial");
        } else {
          setLoginFromDataErr((prev) => ({
            ...prev,
            general: "Invalid email or password",
          }));
        }
      } catch (error) {
        console.log(error, "_error_");
        setLoginFromDataErr((prev) => ({
          ...prev,
          general: "An error occurred. Please try again.",
        }));
      }
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      let data = await Post(google, { id_token: credential });
      if (data?.token) {
        dispatch(TryRealsalesValue(false));
        router.push("/pricing/free-trial");
      } else {
        console.log("Login failed", data);
      }
    } catch (error) {
      console.log(error, "_error_");
    }
  };

  console.log(fromData, "fromData");

  const tryRealsalesValue = useSelector(
    (state) => state.openModal.tryRealsalesValue
  );

  return (
    <CommonModal
      open={tryRealsalesValue}
      onClose={() => {
        setFromDataErr(initialFormData);
        dispatch(TryRealsalesValue(false));
        setOpenLogin(false);
      }}
      width={width > 720 ? "60%" : "90%"}
    >
      {!openLogin ? (
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
                  label="First Name"
                  variant="standard"
                  className="w-full"
                  name="first_name"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                  value={fromData?.first_name}
                  error={!!fromDataErr?.first_name}
                  helperText={fromDataErr?.first_name}
                  required
                />
                <TextField
                  label="Last Name"
                  variant="standard"
                  className="w-full"
                  name="last_name"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                  value={fromData?.last_name}
                  error={!!fromDataErr?.last_name}
                  helperText={fromDataErr?.last_name}
                  required
                />
              </div>

              <div className="flex lg:flex-row flex-col gap-2">
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
                <div className="flex gap-2 w-full">
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
                    name="phone_number"
                    color="#000000"
                    onChange={(e) => handleChange(e)}
                    value={fromData?.phone_number}
                    error={!!fromDataErr?.phone_number}
                    helperText={fromDataErr?.phone_number}
                    required
                  />
                </div>
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

              <div className="flex gap-2 relative">
                <TextField
                  type="password"
                  label="Your Password"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="password"
                  color="#000000"
                  onChange={(e) => handleChange(e)}
                  value={fromData?.password}
                  error={!!fromDataErr?.password}
                  helperText={fromDataErr?.password}
                  required
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
          <div className="flex items-center">
            You have already signed up. Please go to the&nbsp;
            <div
              onClick={() => setOpenLogin(true)}
              className="cursor-pointer border border-solid border-gray-200 rounded px-3 py-0.5"
            >
              signin
            </div>
          </div>
          <hr className="border-[#060606CC] w-full" />
          <div className="flex items-center w-full">
            <div className="bg-[#26AD35] w-12 h-12 rounded-full lg:flex hidden" />
            <p className="bg-gradient-to-r from-[#26AD35] to-[#077A15] text-white sora-regular lg:-ml-4 text-[13px] lg:w-[calc(100%_-_48px)] w-full py-1.5 lg:px-0 px-1.5">
              * Note: This form only Accessible for Specially Invited/MVP user
              with Promo Code.
            </p>
          </div>
        </div>
      ) : (
        <>
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center justify-center">
                <div className="flex flex-col justify-center items-center lg:w-[80%] w-full gap-2">
                  <h1 className="lg:text-4xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular text-center">
                    <span className="m-plus-rounded-1c-medium">Signin</span>
                    &nbsp;to the Session
                    {/* <br className="lg:flex hidden" />
                    as&nbsp;
                    <span className="m-plus-rounded-1c-medium">MVP User</span> */}
                  </h1>
                  <p className="text-[16px] text-[#060606] m-plus-rounded-1c-regular text-center">
                    Discover how we can Transform your Sales team's Performance
                  </p>
                </div>
              </div>
              <TextField
                type="email"
                label="Your email address"
                variant="standard"
                className="w-full outline-[#000000]"
                name="email"
                color="#000000"
                onChange={(e) => loginhandleChange(e)}
                value={loginfromData?.email}
                error={!!loginfromDataErr?.email}
                helperText={loginfromDataErr?.email}
                required
              />
              <TextField
                type="password"
                label="Your Password"
                variant="standard"
                className="w-full outline-[#000000]"
                name="password"
                color="#000000"
                onChange={(e) => loginhandleChange(e)}
                value={loginfromData?.password}
                error={!!loginfromDataErr?.password}
                helperText={loginfromDataErr?.password}
                required
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="success"
                      onChange={(e) => {
                        setLoginfromData((pre) => ({
                          ...pre,
                          remember_me: e.target.checked,
                        }));
                        console.log(e.target.checked, "tatarget_checked");
                      }}
                      checked={loginfromData?.remember_me}
                    />
                  }
                  label={
                    <p className="text-base m-plus-rounded-1c-regular text-[#000000de]">
                      Remember me
                    </p>
                  }
                />
              </FormGroup>
              <div className="flex items-center gap-4">
                <CommonButton
                  className={`w-full !border-0 !outline-0 !bg-[#FFDE5A] shadow-md !text-[#060606] text-[20px]`}
                  buttontext={`START session`}
                  onClick={() => loginUser()}
                  icon={
                    <DoneOutlinedIcon className="text-[#060606] !font-normal !text-[20px]" />
                  }
                />
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => console.log("Login Failed")}
                />
              </div>
            </div>
          </GoogleOAuthProvider>
        </>
      )}
    </CommonModal>
  );
};

export default TryRealsales;
