import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { apis } from "../utils/apis";

export const useSubscription = () => {
  const { Get } = useApi();
  const { user_subscriptions } = apis;

  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSubscription = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Get(`${user_subscriptions}all`);
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
  }, [Get, user_subscriptions]);

  return { getSubscription, subscriptions, isLoading, error, setSubscriptions };
};
