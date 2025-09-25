import { useState, useCallback } from "react";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Only set Content-Type to application/json if data is not FormData
    if (
      config.data &&
      typeof window.FormData !== 'undefined' &&
      config.data instanceof window.FormData
    ) {
      // Let axios set the correct Content-Type for FormData
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * Silent GET request that doesn't show toast errors
 * Used for subscription checks during payment processing
 */
const GetSilent = async (url) => {
  try {
    const data = await axiosInstance.get(url);
    if (data?.data) {
      return data?.data;
    }
  } catch (error) {
    // Don't show toast errors for silent calls
    throw error; // Re-throw to allow calling code to handle
  }
};

export const useSubscriptionSilent = () => {
  const [userSubscription, setUserSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserSubscriptionSilent = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (isLoading) return userSubscription;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await GetSilent('/v1/user-subscriptions/my-subscription');
      setUserSubscription(response);
      return response;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, userSubscription]);

  const getPaymentDataSilent = useCallback(async (userId) => {
    try {
      const response = await GetSilent(`/v1/payments/by-user/${userId}`);
      return response;
    } catch (err) {
      console.error('Failed to fetch payment data silently:', err);
      return null;
    }
  }, []);

  return { 
    getUserSubscriptionSilent,
    getPaymentDataSilent,
    userSubscription,
    isLoading, 
    error, 
    setUserSubscription
  };
};
