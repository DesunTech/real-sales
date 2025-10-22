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
import { showToast } from "../../utils/toastConfig";
import LoopIcon from "@mui/icons-material/Loop";
import { AddAuth, AddUser } from "../../redux/AuthReducer";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CountryCodeSelector from "../CountryCodeSelector";
import ForgotPasswordModal from "./ForgotPasswordModal";

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
    general: "",
  };
  const initialLoginFormData = {
    email: "",
    password: "",
    remember_me: true,
    general: "",
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
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);


  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(width, "width___");
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

  const validateImage = (file) => {
    // Reset error state
    setImageError("");

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setImageError("Please upload a valid image file (JPG, PNG, or GIF)");
      return false;
    }

    // Check file size (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setImageError("Image size should be less than 5MB");
      return false;
    }

    return true;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!validateImage(file)) {
      event.target.value = ""; // Reset input
      return;
    }

    // Create image object to check dimensions
    const img = new window.Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Check dimensions
      const minDimension = 100; // minimum width/height in pixels
      const maxDimension = 2000; // maximum width/height in pixels

      if (img.width < minDimension || img.height < minDimension) {
        setImageError(
          `Image dimensions should be at least ${minDimension}x${minDimension} pixels`
        );
        event.target.value = ""; // Reset input
        return;
      }

      if (img.width > maxDimension || img.height > maxDimension) {
        setImageError(
          `Image dimensions should not exceed ${maxDimension}x${maxDimension} pixels`
        );
        event.target.value = ""; // Reset input
        return;
      }

      // If all validations pass
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    };

    img.onerror = () => {
      setImageError("Failed to load image. Please try another file.");
      event.target.value = ""; // Reset input
    };
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    setImageError("");
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
      setSignupLoading(true);
      try {
        // const formData = new FormData();

        // Object.keys(fromData).forEach((key) => {
        //   if (key !== "phone_number") {
        //     formData.append(key, fromData[key]);
        //   }
        // });
        // if (profileImage) {
        //   formData.append("profile_image", profileImage);
        // }
        // formData.append("phone_number", `+${idc}${fromData?.phone_number}`);

        const data = await Post(signup, {
          ...fromData,
          phone_number: `+${idc}${fromData?.phone_number}`,
        });
        if (data?.token) {
          setFromDataErr(initialFormData);
          setFromData(initialFormData);
          localStorage.setItem("user", data?.user?.user_id);
          localStorage.setItem("token", data?.token);
          dispatch(TryRealsalesValue(false));
          dispatch(AddAuth(data?.token));
          dispatch(AddUser(data?.user));
          router.push("/pricing/free-trial");
        }
      } catch (error) {
        console.log(error, "error");
      } finally {
        setSignupLoading(false);
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
      setLoginLoading(true);
      try {
        let data = await Post(sign_in, loginfromData);
        if (data?.token) {
          localStorage.setItem("user", data?.user?.user_id);
          localStorage.setItem("token", data?.token);
          setLoginFromDataErr(initialLoginFormData);
          setLoginfromData(initialLoginFormData);
          dispatch(TryRealsalesValue(false));
          dispatch(AddAuth(data?.token));
          dispatch(AddUser(data?.user));
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
      } finally {
        setLoginLoading(false);
      }
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      let data = await Post(google, { id_token: credential });
      if (data?.token) {
        // Store user data in localStorage
        localStorage.setItem("user", data?.user?.user_id);
        localStorage.setItem("token", data?.token);
        
        // Dispatch to Redux store
        dispatch(AddAuth(data?.token));
        dispatch(AddUser(data?.user));
        
        // Clear any errors
        setFromDataErr(initialFormData);
        setLoginFromDataErr(initialLoginFormData);
        
        // Close modal and redirect
        dispatch(TryRealsalesValue(false));
        router.push("/pricing/free-trial");
      } else {
        // Show error in the appropriate form
        if (openLogin) {
          setLoginFromDataErr((prev) => ({
            ...prev,
            general: "Google login failed. Please try again.",
          }));
        } else {
          setFromDataErr((prev) => ({
            ...prev,
            general: "Google signup failed. Please try again.",
          }));
        }
      }
    } catch (error) {
      console.log(error, "_error_");
      // Show error in the appropriate form
      if (openLogin) {
        setLoginFromDataErr((prev) => ({
          ...prev,
          general: "Google login failed. Please try again.",
        }));
      } else {
        setFromDataErr((prev) => ({
          ...prev,
          general: "Google signup failed. Please try again.",
        }));
      }
    }
  };

  const handleGoogleLoginError = () => {
    if (openLogin) {
      setLoginFromDataErr((prev) => ({
        ...prev,
        general: "Google login was cancelled or failed. Please try again.",
      }));
    } else {
      setFromDataErr((prev) => ({
        ...prev,
        general: "Google signup was cancelled or failed. Please try again.",
      }));
    }
  };

  console.log(fromData, "fromData");

  const tryRealsalesValue = useSelector(
    (state) => state.openModal.tryRealsalesValue
  );

  // Debug: Check if Google Client ID is loaded
  console.log("Google Client ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  console.log("Site URL:", process.env.NEXT_PUBLIC_SITE_URL);
  console.log("Current URL:", typeof window !== 'undefined' ? window.location.origin : 'Server side');

  return (
    <CommonModal
      open={tryRealsalesValue}
      onClose={() => {
        setFromDataErr(initialFormData);
        dispatch(TryRealsalesValue(false));
        setOpenLogin(false);
        removeImage();
      }}
      width={"60%"}
    >
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
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
            {/* <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Profile Picture</label>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 hover:border-[#FFDE5A] transition-colors">
                  {imagePreview ? (
                    <div className="relative w-full h-full group">
                      <Image
                        src={imagePreview}
                        alt="Profile preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <span className="text-white text-sm">Remove</span>
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <CloudUploadIcon className="text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    Upload a profile picture (max 5MB)
                  </p>
                  <p className="text-xs text-gray-400">
                    Supported formats: JPG, PNG, GIF
                  </p>
                  <p className="text-xs text-gray-400">
                    Min dimensions: 100x100px, Max: 2000x2000px
                  </p>
                  {imageError && (
                    <p className="text-xs text-red-500 mt-1">{imageError}</p>
                  )}
                </div>
              </div>
            </div> */}
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
          {/* Error message display for signup */}
          {fromDataErr?.general && (
            <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {fromDataErr.general}
            </div>
          )}

          <div className="flex items-center lg:flex-row flex-col gap-4">
            <CommonButton
              className={`w-full !border-0 !outline-0 !bg-[#FFDE5A] shadow-md !text-[#060606] text-[20px]`}
              buttontext={
                signupLoading ? (
                  <LoopIcon className="animate-spin" />
                ) : (
                  "START session"
                )
              }
              onClick={() => submitTryRealsales()}
              disabled={signupLoading}
              icon={
                !signupLoading && (
                  <DoneOutlinedIcon className="text-[#060606] !font-normal !text-[20px]" />
                )
              }
            />
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              useOneTap={false}
              theme="outline"
              size="large"
              text="signup_with"
              shape="rectangular"
            />
          </div>
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
              <div className="flex justify-between items-center">
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
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-[#060606] hover:text-[#060606E5] underline m-plus-rounded-1c-regular"
                >
                  Forgot Password?
                </button>
              </div>
              {/* Error message display */}
              {loginfromDataErr?.general && (
                <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {loginfromDataErr.general}
                </div>
              )}
              
              <div className="flex items-center lg:flex-row flex-col gap-4">
                <CommonButton
                  className={`w-full !border-0 !outline-0 !bg-[#FFDE5A] shadow-md !text-[#060606] lg:text-[20px] text-base`}
                  buttontext={
                    loginLoading ? (
                      <LoopIcon className="animate-spin" />
                    ) : (
                      "START session"
                    )
                  }
                  onClick={() => loginUser()}
                  disabled={loginLoading}
                  icon={
                    !loginLoading && (
                      <DoneOutlinedIcon className="text-[#060606] !font-normal !text-[20px]" />
                    )
                  }
                />
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  useOneTap={false}
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                />
              </div>
            </div>
        )}
      </GoogleOAuthProvider>
      
      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </CommonModal>
  );
};

export default TryRealsales;
