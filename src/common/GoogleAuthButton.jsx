import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useApi } from '../hooks/useApi';
import { apis } from '../utils/apis';
import { AddAuth, AddUser } from '../redux/AuthReducer';

const GoogleAuthButton = ({ className = "", text = "Sign in with Google", onSuccess, onError }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { Post } = useApi();
  const { google } = apis;

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    console.log("Google OAuth credential received:", credential);
    
    try {
      console.log("Sending request to backend...");
      let data = await Post(google, { id_token: credential });
      console.log("Backend response:", data);
      
      if (data?.token) {
        // Store user data in localStorage
        localStorage.setItem("user", data?.user?.user_id);
        localStorage.setItem("token", data?.token);
        
        // Dispatch to Redux store
        dispatch(AddAuth(data?.token));
        dispatch(AddUser(data?.user));
        
        // Redirect to dashboard or pricing page
        router.push("/pricing/free-trial");
        
        // Call custom success handler if provided
        if (onSuccess) {
          onSuccess(data);
        }
      } else {
        console.error("Google login failed - no token in response:", data);
        if (onError) {
          onError("Google login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Google login error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error headers:", error.response?.headers);
      
      let errorMessage = "Google login failed. Please try again.";
      
      if (error.response?.data?.detail) {
        errorMessage = `Google login failed: ${error.response.data.detail}`;
      } else if (error.response?.data?.message) {
        errorMessage = `Google login failed: ${error.response.data.message}`;
      } else if (error.message) {
        errorMessage = `Google login failed: ${error.message}`;
      }
      
      if (onError) {
        onError(errorMessage);
      }
    }
  };

  const handleGoogleLoginError = () => {
    console.error("Google login was cancelled or failed");
    if (onError) {
      onError("Google login was cancelled or failed. Please try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginError}
        useOneTap={false}
        theme="outline"
        size="large"
        text={text}
        shape="rectangular"
        className={className}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthButton;
