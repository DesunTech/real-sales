import React, { useState } from "react";
import CommonModal from "../commonModal";
import { useDispatch, useSelector } from "react-redux";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import CommonButton from "../commonButton";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";
import { showToast } from "../../utils/toastConfig";
import LoopIcon from "@mui/icons-material/Loop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const { Post } = useApi();
  const { password_reset_request, password_reset_final, verify_otp } = apis;
  
  // Custom API call that doesn't re-throw errors
  const customPost = async (url, data) => {
    try {
      console.log("customPost: Making request to", url, "with data", data);
      
      // Use direct axios call without interceptors
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log("customPost: Success response", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("customPost: Caught error", error);
      console.log("customPost: Error response", error.response);
      return { success: false, error };
    }
  };
  
  const [step, setStep] = useState(1); // 1: Email input, 2: OTP verification, 3: New password
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const initialErrors = {
    email: "",
    otpCode: "",
    newPassword: "",
    confirmPassword: "",
    general: ""
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailSubmit = async () => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setLoading(true);
      const response = await customPost(password_reset_request, { email });
      
      if (response.success) {
        if (response.data?.message) {
          showToast.success("Password reset OTP sent to your email");
          setStep(2);
        }
      } else {
        // Handle error
        const error = response.error;
        console.error("Password reset request error:", error);
        
        // Handle specific error cases
        let errorMessage = "Failed to send reset email. Please try again.";
        
        if (error.response?.status === 404) {
          errorMessage = "No account found with this email address. Please check your email and try again.";
        } else if (error.response?.status === 500) {
          errorMessage = "Unable to send email at the moment. Please try again later.";
        } else {
          const detail = error.response?.data?.detail;
          if (detail) {
            errorMessage = detail;
          }
        }
        
        showToast.error(errorMessage);
        
        setErrors(prev => ({
          ...prev,
          general: errorMessage
        }));
      }
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (!otpCode.trim()) {
      newErrors.otpCode = "OTP code is required";
      isValid = false;
    } else if (otpCode.length !== 6) {
      newErrors.otpCode = "OTP code must be 6 digits";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setLoading(true);
      console.log("handleOtpSubmit: Starting OTP verification");
      
      try {
        // Verify OTP with backend first
        const response = await customPost(verify_otp, {
          email,
          otp_code: otpCode
        });
        
        console.log("handleOtpSubmit: Response received", response);
        
        if (response.success) {
          // If OTP is correct, proceed to password step
          if (response.data?.message) {
            showToast.success("OTP verified successfully! Please enter your new password.");
            setStep(3);
          }
        } else {
          // Handle error
          const error = response.error;
          console.log("handleOtpSubmit: Handling error", error);
        console.error("OTP verification error:", error);
        console.error("Error type:", typeof error);
        console.error("Error response:", error.response);
        console.error("Error response data:", error.response?.data);
        console.error("Error response status:", error.response?.status);
        
        // Handle specific error cases
        let errorMessage = "Failed to verify OTP. Please try again.";
        
        if (error.response?.status === 400) {
          const detail = error.response?.data?.detail;
          console.log("Error detail:", detail);
          if (detail === "Invalid OTP code") {
            errorMessage = "The OTP code you entered is incorrect. Please check and try again.";
          } else if (detail === "OTP expired") {
            errorMessage = "The OTP code has expired. Please request a new one.";
          } else {
            errorMessage = detail || errorMessage;
          }
        } else if (error.response?.status === 404) {
          errorMessage = "User not found. Please check your email address.";
        }
        
        // Always show custom toast for debugging
        showToast.error(errorMessage);
        
        setErrors(prev => ({
          ...prev,
          general: errorMessage
        }));
        }
      } catch (outerError) {
        console.error("handleOtpSubmit: Outer error caught", outerError);
        showToast.error("An unexpected error occurred. Please try again.");
        setErrors(prev => ({
          ...prev,
          general: "An unexpected error occurred. Please try again."
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePasswordSubmit = async () => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (!validatePassword(newPassword)) {
      newErrors.newPassword = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setLoading(true);
      const response = await customPost(password_reset_final, {
        email,
        new_password: newPassword
      });
      
      if (response.success) {
        if (response.data?.message) {
          showToast.success("Password reset successfully! You can now login with your new password.");
          handleClose();
        }
      } else {
        // Handle error
        const error = response.error;
        console.error("Password reset confirm error:", error);
        console.error("Error response:", error.response);
        console.error("Error response data:", error.response?.data);
        
        // Handle specific error cases
        let errorMessage = "Failed to reset password. Please try again.";
        
        if (error.response?.status === 400) {
          const detail = error.response?.data?.detail;
          console.log("Error detail:", detail);
          if (detail === "OTP verification required") {
            errorMessage = "Please verify your OTP first before setting a new password.";
          } else {
            errorMessage = detail || errorMessage;
          }
        } else if (error.response?.status === 404) {
          errorMessage = "User not found. Please check your email address.";
        }
        
        showToast.error(errorMessage);
        
        setErrors(prev => ({
          ...prev,
          general: errorMessage
        }));
      }
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setOtpCode("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors(initialErrors);
    onClose();
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setOtpCode("");
    } else if (step === 3) {
      setStep(2);
      setNewPassword("");
      setConfirmPassword("");
    }
    setErrors(initialErrors);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col justify-center items-center lg:w-[80%] w-full gap-2">
                <h1 className="lg:text-4xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular text-center">
                  <span className="m-plus-rounded-1c-medium">Forgot</span>
                  &nbsp;Password?
                </h1>
                <p className="text-[16px] text-[#060606] m-plus-rounded-1c-regular text-center">
                  Enter your email address and we'll send you a code to reset your password.
                </p>
              </div>
            </div>
            
            <TextField
              type="email"
              label="Your email address"
              variant="standard"
              className="w-full outline-[#000000]"
              color="#000000"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              required
            />

            {errors.general && (
              <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.general}
              </div>
            )}

            <CommonButton
              onClick={handleEmailSubmit}
              disabled={loading}
              className="w-full !border-0 !outline-0 !bg-[#FFDE5A] shadow-md !text-[#060606] lg:text-[20px] text-base"
              buttontext={
                loading ? (
                  <LoopIcon className="animate-spin" />
                ) : (
                  "Send Reset Code"
                )
              }
              icon={
                !loading && (
                  <DoneOutlinedIcon className="text-[#060606] !font-normal !text-[20px]" />
                )
              }
            />
          </div>
        );

      case 2:
        return (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col justify-center items-center lg:w-[80%] w-full gap-2">
                <h1 className="lg:text-4xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular text-center">
                  <span className="m-plus-rounded-1c-medium">Enter</span>
                  &nbsp;Verification Code
                </h1>
                <p className="text-[16px] text-[#060606] m-plus-rounded-1c-regular text-center">
                  We've sent a 6-digit code to <strong>{email}</strong>
                </p>
              </div>
            </div>
            
            <TextField
              label="Verification Code"
              variant="standard"
              className="w-full outline-[#000000]"
              color="#000000"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              error={!!errors.otpCode}
              helperText={errors.otpCode}
              placeholder="000000"
              inputProps={{ maxLength: 6 }}
              required
            />

            {errors.general && (
              <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.general}
              </div>
            )}

            <div className="flex items-center lg:flex-row flex-col gap-4">
              <CommonButton
                onClick={handleBack}
                variant="outlined"
                className="flex-1 !border-[#060606] !text-[#060606]"
                buttontext="Back"
              />
              <CommonButton
                onClick={handleOtpSubmit}
                disabled={loading || otpCode.length !== 6}
                className="flex-1 !border-0 !outline-0 !bg-[#FFDE5A] shadow-md !text-[#060606] lg:text-[20px] text-base"
                buttontext={
                  loading ? (
                    <LoopIcon className="animate-spin" />
                  ) : (
                    "Verify Code"
                  )
                }
                icon={
                  !loading && (
                    <DoneOutlinedIcon className="text-[#060606] !font-normal !text-[20px]" />
                  )
                }
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col justify-center items-center lg:w-[80%] w-full gap-2">
                <h1 className="lg:text-4xl text-2xl text-[#060606E5] m-plus-rounded-1c-regular text-center">
                  <span className="m-plus-rounded-1c-medium">Create</span>
                  &nbsp;New Password
                </h1>
                <p className="text-[16px] text-[#060606] m-plus-rounded-1c-regular text-center">
                  Enter your new password below.
                </p>
              </div>
            </div>
            
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              variant="standard"
              className="w-full outline-[#000000]"
              color="#000000"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />

            <TextField
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="standard"
              className="w-full outline-[#000000]"
              color="#000000"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />

            {errors.general && (
              <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.general}
              </div>
            )}

            <div className="flex items-center lg:flex-row flex-col gap-4">
              <CommonButton
                onClick={handleBack}
                variant="outlined"
                className="flex-1 !border-[#060606] !text-[#060606]"
                buttontext="Back"
              />
              <CommonButton
                onClick={handlePasswordSubmit}
                disabled={loading}
                className="flex-1 !border-0 !outline-0 !bg-[#FFDE5A] shadow-md !text-[#060606] lg:text-[20px] text-base"
                buttontext={
                  loading ? (
                    <LoopIcon className="animate-spin" />
                  ) : (
                    "Reset Password"
                  )
                }
                icon={
                  !loading && (
                    <DoneOutlinedIcon className="text-[#060606] !font-normal !text-[20px]" />
                  )
                }
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CommonModal
      open={isOpen}
      onClose={handleClose}
      width="500px"
    >
      {renderStepContent()}
    </CommonModal>
  );
};

export default ForgotPasswordModal;