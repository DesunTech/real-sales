import React, { useEffect, useState } from "react";
import Highlighter from "../../common/highlighter";
import Link from "next/link";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import { Switch } from "@mui/material";
import PricingCard from "../../common/pricingCard";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CommonModal from "../../common/commonModal";
import { usePayment } from "../../hooks/usePayment";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";
import { showToast } from "../../utils/toastConfig";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51RvIUt2fIsOm1r9oISb8MIWW7N30UDtMBJQnBykpeFZUWXrytUD4rDR2qfZX6dYMBZKnhE8r2r3uXimAA0g5PWo300chQJiNrw"
);

// Payment Form Component
const PaymentForm = ({ clientSecret, onSuccess, onError, amount, billingCycle }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/thankyou?payment_intent={PAYMENT_INTENT_ID}`,
        },
        redirect: 'if_required' // Only redirect if required
      });

      if (error) {
        console.error('Payment failed:', error);
        onError(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment successful!', paymentIntent);
        // Redirect to thank you page after successful payment
        window.location.href = `${window.location.origin}/thankyou?payment_intent=${paymentIntent.id}`;
      } else {
        console.log('Payment requires additional action');
        // Payment requires additional action, redirect to return URL
        window.location.href = `${window.location.origin}/thankyou?payment_intent=${paymentIntent.id}`;
      }
    } catch (err) {
      console.error('Payment error:', err);
      onError(err.message);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold text-lg">Payment Summary</h3>
        <p className="text-2xl font-bold text-blue-600">
          ${(amount / 100).toFixed(2)} {billingCycle === 'yearly' ? '/ year' : '/ month'}
        </p>
        <p className="text-sm text-gray-600">
          {billingCycle === 'yearly' ? 'Billed annually' : 'Billed monthly'}
        </p>
        <p className="text-xs text-gray-500">
          {billingCycle === 'yearly' ? '65 credits per month' : '5 credits per month'}
        </p>
      </div>
      <PaymentElement />
      <button 
        type="submit" 
        disabled={!stripe}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Pay ${(amount / 100).toFixed(2)} Now
      </button>
    </form>
  );
};

const Pricing = ({ subscription = [] }) => {
  const [checked, setChecked] = useState(false);
  const { createPaymentIntent, getUserSubscription } = usePayment();
  const { Get } = useApi();

  const pricingArr = [
    {
      name: "Starter",
      description: "Best for solo Sales Rep",
      descriptionSub: "2 personas, personal coaching insight",
      price1: "$59",
      price2: "$249",
      features: [
        { allow: true, title: "1 User" },
        { allow: true, title: "Max 2 Personas" },
        { allow: true, title: "1 Industry" },
        { allow: false, title: "Saved Interactions" },
        { allow: false, title: "Sales Coaching" },
        {
          allow: false,
          title:
            "Upload Company info and Case Studies for customized experience",
        },
        { allow: false, title: "Team Reporting for Manager" },
        { allow: false, title: "Customer Persona development" },
        {
          allow: false,
          title: "Business Intelligence for Product Development",
        },
      ],
    },
    {
      name: "Starter",
      description: "Best for solo Sales Rep",
      descriptionSub: "2 personas, personal coaching insight",
      price1: "$59",
      price2: "$249",
      features: [
        { allow: true, title: "Up to 5 Users" },
        { allow: true, title: "Max 5 Personas" },
        { allow: true, title: "1 Industry" },
        { allow: false, title: "Saved Interactions" },
        { allow: false, title: "Sales Coaching" },
        {
          allow: false,
          title:
            "Upload Company info and Case Studies for customized experience",
        },
        { allow: false, title: "Team Reporting for Manager" },
        { allow: false, title: "Customer Persona development" },
        {
          allow: false,
          title: "Business Intelligence for Product Development",
        },
      ],
    },
    {
      name: "Starter",
      description: "Best for solo Sales Rep",
      descriptionSub: "2 personas, personal coaching insight",
      price1: "$59",
      price2: "$249",
      features: [
        { allow: true, title: "Up to 5 Users" },
        { allow: true, title: "Unlimited Personas" },
        { allow: true, title: "Unlimited Industry" },
        { allow: false, title: "Saved Interactions" },
        { allow: false, title: "Sales Coaching" },
        {
          allow: false,
          title:
            "Upload Company info and Case Studies for customized experience",
        },
        { allow: false, title: "Team Reporting for Manager" },
        { allow: false, title: "Customer Persona development" },
        {
          allow: false,
          title: "Business Intelligence for Product Development",
        },
      ],
    },
  ];

  const pricingArr2 = [
    {
      name: "Starter",
      description: "Best for solo Sales Rep",
      descriptionSub: "2 personas, personal coaching insight",
      price1: "$59",
      price2: "$249",
      features: [
        { allow: true, title: "Unlimited Users" },
        { allow: true, title: "Unlimited Personas" },
        { allow: true, title: "Unlimited Industry" },
      ],
    },
  ];

  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentBillingCycle, setPaymentBillingCycle] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Load subscriptions from props
  useEffect(() => {
    if (subscription && Array.isArray(subscription)) {
      // Load all subscriptions except free ones
      const allPlans = subscription.filter(sub => sub.plan_type !== "free");
      setAllSubscriptions(allPlans);
    }
  }, [subscription]);

  // Filter subscriptions based on toggle state
  useEffect(() => {
    const currentBillingCycle = checked ? "yearly" : "monthly";
    const filteredSubscriptions = allSubscriptions.filter(sub => 
      sub.billing_cycle === currentBillingCycle
    );
    
    // Sort subscriptions: Starter first, then Manager
    const sortedSubscriptions = filteredSubscriptions.sort((a, b) => {
      const order = { 'starter': 1, 'manager': 2 };
      return (order[a.plan_type] || 999) - (order[b.plan_type] || 999);
    });
    
    setSubscriptions(sortedSubscriptions);
  }, [checked, allSubscriptions]);

  console.log(subscriptions, "subscription___");

  // Show loader if no subscription data is available yet
  if (!subscription || subscription.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FFDE5A]"></div>
          <p className="text-gray-600 sora-regular text-lg">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  const parsePriceToCents = (priceStr) => {
    if (!priceStr || typeof priceStr !== "string") return null;
    const numeric = priceStr.replace(/[^0-9.]/g, "");
    if (!numeric) return null;
    const amount = Math.round(parseFloat(numeric) * 100);
    return Number.isFinite(amount) ? amount : null;
  };

  const handleChoosePlan = async (plan) => {
    try {
      setSelectedPlan(plan);
      
      // Determine billing cycle based on toggle and plan availability
      const billingCycle = checked ? 'yearly' : 'monthly';
      
      console.log('Creating payment intent for:', {
        plan_type: plan.plan_type,
        billing_cycle: billingCycle,
        plan_data: plan
      });
      
      // 1. Create payment intent using the payment hook
      const response = await createPaymentIntent(
        plan.plan_type || 'starter',
        billingCycle
      );

      console.log('Payment intent response:', response);

      if (!response || !response.client_secret) {
        throw new Error('No client secret received from payment intent API');
      }

      // 2. Set up the payment element modal
      setClientSecret(response.client_secret);
      setPaymentAmount(response.amount * 100); // Convert to cents
      setPaymentBillingCycle(billingCycle);
      setIsCheckoutOpen(true);
      
    } catch (err) {
      console.error("Failed to process payment", err);
      showToast.error(`Payment processing failed: ${err.message || err}`);
    }
  };

  // COMMENTED OUT OLD PAYMENT GATEWAY LOGIC
  // const handleChoosePlan = async (plan) => {
  //   try {
  //     const displayPrice = checked ? plan?.yearly_price : plan?.monthly_price;
  //     const unitAmount = parsePriceToCents(displayPrice) ?? 9900;
  //     const productName = plan?.plan_type || plan?.name || "RealSales Plan";

  //     const { data } = await axios.post("/api/stripe/create-checkout-session", {
  //       mode: "payment",
  //       ui_mode: "embedded",
  //       line_items: [
  //         {
  //           price_data: {
  //             currency: "usd",
  //             product_data: { name: productName },
  //             unit_amount: unitAmount,
  //           },
  //           quantity: 1,
  //         },
  //       ],
  //       metadata: {
  //         plan: productName,
  //         billing_cycle: checked ? "yearly" : "monthly",
  //       },
  //       return_url: `${window.location.origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
  //     });

  //     if (data?.client_secret) {
  //       setClientSecret(data.client_secret);
  //       setIsCheckoutOpen(true);
  //       return;
  //     }

  //     if (data?.url) {
  //       window.location.href = data.url;
  //     }
  //   } catch (err) {
  //     const serverMsg = err?.response?.data || err?.message;
  //     console.error("Failed to create embedded checkout session", serverMsg);
  //     alert(
  //       typeof serverMsg === "string"
  //         ? serverMsg
  //         : serverMsg?.error || "Failed to create checkout session"
  //     );
  //   }
  // };

  return (
    <div className="page-container mx-auto px-4 py-8 container flex flex-col items-center lg:gap-4 gap-8">
      <Highlighter highlight={`Our Pricing`} />
      <p className="lg:text-2xl text-[16px] text-center m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-center gap-2">
        Get fully reliable Price for every session.
        <Link
          href={`/pricing/free-trial`}
          className="underline sora-regular flex items-center gap-2"
        >
          Free Trial available
          <ArrowRight width={19} height={13} />
        </Link>
      </p>
      <div className="flex items-center gap-4">
        <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-7.png)] bg-cover bg-center bg-no-repeat rounded-[10px]">
          <div className="bg-[#FFFFFFD9] p-4">
            <p className="m-plus-rounded-1c-light text-[#060606] text-3xl">
              Monthly
            </p>
            <p className="m-plus-rounded-1c-regular text-[#060606B2] text-xl">
              Limited benefit !
            </p>
          </div>
        </div>

        <Switch
          className="coustomPricingSwitch !h-[35px] !w-[70px] !p-0"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />

        <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-6.png)] bg-cover bg-center bg-no-repeat rounded-[10px]">
          <div className="bg-[#FFFFFFD9] p-4">
            <p className="m-plus-rounded-1c-light text-[#060606] text-3xl">
              Yearly
            </p>
            <p className="m-plus-rounded-1c-medium text-[#AEAE27] text-xl">
              Save upto 10% !!
            </p>
          </div>
        </div>
      </div>
      <div className="w-full pl-[2%] flex flex-col gap-8">
        {clientSecret ? (
          <CommonModal
            open={isCheckoutOpen}
            onClose={() => {
              setIsCheckoutOpen(false);
              setClientSecret(null);
            }}
            width={500}
          >
            <div className="w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                  },
                }}
              >
                <PaymentForm 
                  clientSecret={clientSecret}
                  amount={paymentAmount}
                  billingCycle={paymentBillingCycle}
                  onSuccess={async (paymentIntent) => {
                    console.log('Payment successful!', paymentIntent);
                    // The redirect will happen in the PaymentForm component
                    // This handler is called before redirect
                    setIsCheckoutOpen(false);
                    setClientSecret(null);
                    setPaymentAmount(0);
                    setPaymentBillingCycle('');
                    setSelectedPlan(null);
                  }}
                  onError={(error) => {
                    showToast.error(`Payment failed: ${error}`);
                  }}
                />
              </Elements>
            </div>
          </CommonModal>
        ) : null}
        <div className="flex lg:flex-row flex-col flex-wrap gap-8">
          {subscriptions?.length
            ? subscriptions?.map((v, i) => (
                <div className="lg:w-[31%] w-full h-full">
                  <PricingCard
                    key={i}
                    footerCls={`bg-none`}
                    yearly={checked}
                    // ExtPricing={true}
                    headingCls={`lg:flex-row flex-col`}
                    cardValue={v}
                    link={`#`}
                    onClick={() => handleChoosePlan(v)}
                    // crdExtraCls={`flex lg:flex-col md:flex-row flex-col item-center justify-between`}
                  />
                </div>
              ))
            : null}
          
          {/* Enterprise Plan - Hardcoded */}
          <div className="lg:w-[31%] w-full h-full">
            <PricingCard
              footerCls={`bg-none`}
              yearly={checked}
              headingCls={`lg:flex-row flex-col`}
              cardValue={{
                plan_type: "enterprise",
                name: "Enterprise",
                description: "Best for large organizations",
                monthly_price: "Custom",
                yearly_price: "Custom",
                credits_per_month: "Custom",
                max_users: "Unlimited",
                features: {
                  advanced_scenarios: { enabled: true },
                  basic_ai_chat: { enabled: true },
                  basic_analytics: { enabled: true },
                  custom_branding: { enabled: true },
                  email_support: { enabled: true },
                  priority_support: { enabled: true },
                  standard_scenarios: { enabled: true },
                  team_dashboard: { enabled: true }
                }
              }}
              link={`#`}
              onClick={() => window.location.href = '/payment-details'}
            />
          </div>
        </div>
        
        {/* {pricingArr2?.length
          ? pricingArr2?.map((v, i) => (
              <PricingCard
                key={i}
                hidePricing={true}
                ExtPricing={true}
                headingCls={`flex-col-reverse items-start`}
                pricingFetSls={`lg:w-[33%] w-full`}
                footerCls={`bg-none lg:w-[33%] w-full flex flex-col items-center justify-center gap-4`}
                crdExtraCls={`flex lg:flex-row flex-col item-center justify-between`}
                cardValue={v}
                link={`/payment-details`}
              />
            ))
          : null} */}
      </div>
    </div>
  );
};

export default Pricing;
