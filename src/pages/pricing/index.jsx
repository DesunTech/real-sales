import React, { useEffect } from "react";
import Pricing from "../../container/Pricing";
import { useSubscription } from "../../hooks/useSubscription";

const PricingPage = () => {
  const { getSubscription, subscriptions, isLoading } = useSubscription();
  
  useEffect(() => {
    getSubscription();
  }, []);

  console.log(subscriptions, "subscriptions__");
  
  // Show loader while data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FFDE5A]"></div>
          <p className="text-gray-600 sora-regular text-lg">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Pricing subscription={subscriptions} />
    </div>
  );
};

export default PricingPage;
