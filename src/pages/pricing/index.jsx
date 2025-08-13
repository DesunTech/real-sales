import React, { useEffect } from "react";
import Pricing from "../../container/Pricing";
import { useSubscription } from "../../hooks/useSubscription";

const PricingPage = () => {
  const { getSubscription, subscriptions } = useSubscription();
  useEffect(() => {
    getSubscription();
  }, []);

  console.log(subscriptions, "subscriptions__");
  return (
    <div>
      <Pricing subscription={subscriptions} />
    </div>
  );
};

export default PricingPage;
