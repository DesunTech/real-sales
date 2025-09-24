import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { apis } from "../utils/apis";

export const usePayment = () => {
  const { Post, Get } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPaymentIntent = useCallback(async (planType, billingCycle) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Post(apis.create_payment_intent, {
        plan_type: planType,
        billing_cycle: billingCycle
      });
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [Post]);

  const getPaymentStatus = useCallback(async (paymentIntentId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Get(`${apis.get_payment_status}/${paymentIntentId}`);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [Get]);

  const getUserPayments = useCallback(async (userId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Get(`${apis.get_user_payments}/${userId}`);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [Get]);

  const getUserSubscription = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Get(apis.get_user_subscription);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [Get]);

  return {
    createPaymentIntent,
    getPaymentStatus,
    getUserPayments,
    getUserSubscription,
    isLoading,
    error
  };
};

