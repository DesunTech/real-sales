import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { apis } from "../utils/apis";

export const useSubscription = () => {
  const { Get } = useApi();
  const { subscription, get_user_subscription } = apis;

  const [subscriptions, setSubscriptions] = useState([]);
  const [userSubscription, setUserSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSubscription = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Get(`${subscription}`);
      const items = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.results)
        ? response.results
        : [];
      setSubscriptions(items);
      return items;
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [Get, subscription]);

  const getUserSubscription = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (isLoading) return userSubscription;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await Get(get_user_subscription);
      setUserSubscription(response);
      return response;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [Get, get_user_subscription, isLoading, userSubscription]);

  return { 
    getSubscription, 
    getUserSubscription,
    subscriptions, 
    userSubscription,
    isLoading, 
    error, 
    setSubscriptions,
    setUserSubscription
  };
};
