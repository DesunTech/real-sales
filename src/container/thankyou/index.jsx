import React, { useState, useEffect } from "react";
import Link from "next/link";
import Highlighter from "../../common/highlighter";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import pdfIcon from "../../../public/assets/icons/pdfIcon.svg";
import Image from "next/image";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import lets_icons_back_3 from "../../../public/assets/icons/lets_icons_back_3.svg";
import { useSelector } from "react-redux";
import { useSubscriptionSilent } from "../../hooks/useSubscriptionSilent";
import PaymentStatus from "../../common/PaymentStatus";

const ThankYou = () => {
  const { getUserSubscriptionSilent, getPaymentDataSilent, userSubscription } = useSubscriptionSilent();
  const user = useSelector((state) => state?.auth?.user);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [paymentData, setPaymentData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [dataLoadError, setDataLoadError] = useState(null);
  const [loadingStartTime, setLoadingStartTime] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(true);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isOrderInfoOpen, setIsOrderInfoOpen] = useState(false);

  // Function to refresh user subscription with retry logic
  const refreshUserSubscriptionWithRetry = async (retryCount = 0) => {
    const maxRetries = 5; // Increased retries
    const retryDelay = 3000; // Increased delay to 3 seconds

    try {
      await getUserSubscriptionSilent();
      console.log('Subscription successfully loaded in ThankYou component');
    } catch (err) {
      console.log(`Subscription not ready yet (attempt ${retryCount + 1}/${maxRetries + 1})`);
      
      if (retryCount < maxRetries) {
        // Retry after delay
        setTimeout(() => {
          refreshUserSubscriptionWithRetry(retryCount + 1);
        }, retryDelay);
      } else {
        console.error('Failed to refresh subscription after retries:', err);
        // Don't set error state during payment processing
      }
    }
  };

  // Function to fetch latest payment data silently
  const fetchLatestPayment = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        // Use silent API call to avoid showing errors during payment processing
        const response = await getPaymentDataSilent(userId);
        if (response && response.length > 0) {
          // Get the latest payment
          const latestPayment = response[response.length - 1];
          setPaymentData(latestPayment);
          console.log('Latest payment data:', latestPayment);
        }
      }
      return true; // Success
    } catch (error) {
      console.error('Failed to fetch payment data:', error);
      // Don't set error state during payment processing, just log it
      return false; // Error
    }
  };

  useEffect(() => {
    // Get payment intent ID from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const piId = urlParams.get('payment_intent');
    
    if (piId) {
      setPaymentIntentId(piId);
    }

    // Load both user subscription and payment data, then set loading to false
    const loadAllData = async () => {
      setIsDataLoading(true);
      setDataLoadError(null);
      setLoadingStartTime(Date.now());
      
      // Wait longer for backend processing before fetching data
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      try {
        // Load both data sources in parallel with retry logic for subscription
        const [subscriptionResult, paymentResult] = await Promise.allSettled([
          refreshUserSubscriptionWithRetry(),
          fetchLatestPayment()
        ]);
        
        // Check if both operations completed successfully
        const subscriptionSuccess = subscriptionResult.status === 'fulfilled';
        const paymentSuccess = paymentResult.status === 'fulfilled';
        
        // Only set error if both fail, otherwise continue with partial data
        if (!subscriptionSuccess && !paymentSuccess) {
          console.error('Failed to load both subscription and payment data');
          setDataLoadError('Failed to load payment and subscription data');
        } else if (!subscriptionSuccess) {
          console.log('Subscription not ready yet, but payment data loaded successfully');
        } else if (!paymentSuccess) {
          console.log('Payment data not ready yet, but subscription loaded successfully');
        }
        
        // Ensure loading shows for at least 10 seconds
        const minLoadingTime = 10000; // 10 seconds in milliseconds
        const elapsedTime = Date.now() - loadingStartTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        // Start progress update interval
        const progressInterval = setInterval(() => {
          const currentElapsed = Date.now() - loadingStartTime;
          const progress = Math.min(100, (currentElapsed / minLoadingTime) * 100);
          setLoadingProgress(progress);
        }, 100);
        
        setTimeout(() => {
          clearInterval(progressInterval);
          setIsDataLoading(false);
        }, remainingTime);
        
      } catch (error) {
        console.error('Error loading data:', error);
        setDataLoadError('Failed to load data');
        
        // Ensure loading shows for at least 10 seconds even on error
        const minLoadingTime = 10000; // 10 seconds in milliseconds
        const elapsedTime = Date.now() - loadingStartTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        // Start progress update interval
        const progressInterval = setInterval(() => {
          const currentElapsed = Date.now() - loadingStartTime;
          const progress = Math.min(100, (currentElapsed / minLoadingTime) * 100);
          setLoadingProgress(progress);
        }, 100);
        
        setTimeout(() => {
          clearInterval(progressInterval);
          setIsDataLoading(false);
        }, remainingTime);
      }
    };

    loadAllData();
  }, []); // Remove getUserSubscription from dependencies to prevent re-calls

  const handlePaymentSuccess = () => {
    setPaymentStatus('success');
    // Wait for backend processing before refreshing subscription data
    setTimeout(() => {
      refreshUserSubscriptionWithRetry();
    }, 3000); // Wait 3 seconds for backend processing
  };

  const handlePaymentError = (error) => {
    setPaymentStatus('error');
    console.error('Payment error:', error);
  };

  // Show loading state while data is being fetched
  if (isDataLoading) {
    return (
      <div className="relative h-full bg-[url(../../public/assets/images/RealSales-backgrounds/bg-2.png)] bg-cover bg-center bg-no-repeat">
        <div className="page-container mx-auto container p-4 flex flex-col items-center justify-center gap-4">
          <Highlighter highlight={"Payment done !"} />
          <div className="text-center p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-[#060606E5]">Loading Payment Details...</h2>
            <p className="text-gray-600 mb-4">Please wait while we fetch your latest payment and subscription information.</p>
            
            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto mb-4">
              <div className="bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {Math.round(loadingProgress)}% Complete
              </p>
            </div>
            
            <p className="text-sm text-gray-500">
              This will take approximately 10 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if data loading failed
  if (dataLoadError) {
    return (
      <div className="relative h-full bg-[url(../../public/assets/images/RealSales-backgrounds/bg-2.png)] bg-cover bg-center bg-no-repeat">
        <div className="page-container mx-auto container p-4 flex flex-col items-center justify-center gap-4">
          <Highlighter highlight={"Payment done !"} />
          <div className="text-center p-6 text-red-600">
            <div className="text-4xl mb-2">⚠️</div>
            <h2 className="text-xl font-semibold mb-2">Unable to Load Payment Details</h2>
            <p className="text-gray-600">{dataLoadError}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-[url(../../public/assets/images/RealSales-backgrounds/bg-2.png)] bg-cover bg-center bg-no-repeat">
      <div className="page-container mx-auto container p-4 flex flex-col items-center justify-center gap-4">
        <Highlighter highlight={"Payment done !"} />
        
        {paymentIntentId ? (
          paymentStatus === 'success' ? (
            <div className="text-center p-4 text-green-600">
              <div className="text-6xl mb-4">✅</div>
              <h1 className="lg:text-6xl text-3xl text-[#060606E5] m-plus-rounded-1c-regular text-center mb-4">
                Payment Successful!
              </h1>
              <p className="lg:text-[30px] text-xl text-center text-[#060606E5] m-plus-rounded-1c-regular">
                Your subscription has been activated
              </p>
            </div>
          ) : (
            <PaymentStatus 
              paymentIntentId={paymentIntentId}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )
        ) : (
          <>
            <div className="text-center p-4 text-green-600">
              <div className="text-6xl mb-4">✅</div>
              <h1 className="lg:text-6xl text-3xl text-[#060606E5] m-plus-rounded-1c-regular text-center mb-4">
                Payment Successful!
              </h1>
              <p className="lg:text-[30px] text-xl text-center text-[#060606E5] m-plus-rounded-1c-regular">
                Your subscription has been activated
              </p>
            </div>
          </>
        )}
        
        {/* Only show order details when data is fully loaded */}
        {!isDataLoading && !dataLoadError && (
          <>
            <hr className="border-[#06060680] lg:w-[80%] w-full" />
            <div className="w-full flex flex-col gap-4">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsSubscriptionOpen(!isSubscriptionOpen)}
              >
                <div class="shadow-[0px_2px_5px_0px_#0000004D] py-2 px-2.25 rounded-full w-fit h-fit bg-white">
                  <ArrowForwardIosSharpIcon 
                    className={`transition-transform duration-200 ${
                      isSubscriptionOpen ? 'rotate-90' : 'rotate-0'
                    }`}
                  />
                </div>
                <p className="lg:text-[16px] text-[14px] text-[#060606] text-start sora-regular">{`Subscription #`}</p>
              </div>
              
              {/* Subscription details - Accordion content */}
              {isSubscriptionOpen && (
                <div className="shadow-[0px_4px_4px_0px_#00000040] border border-solid border-[#06060699] bg-white rounded-[5px] flex flex-col md:flex-row">
            <div className="w-full md:w-[33.33%] !p-1 flex items-center justify-center border-b md:border-b-0 md:border-r border-solid border-[#06060699]">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-start gap-2">
                  <div className="border border-solid border-[#060606E5] p-0.5 w-fit h-fit rounded-full mt-0.75">
                    <div className="bg-[#060606E5] w-2 h-2 rounded-full" />
                  </div>
                  <p className="sora-light text-[#060606] lg:text-sm text-[12px]">
                    Subscription Status:
                  </p>
                </div>
                <div className="bg-[#26AD35] py-1 px-8">
                  <p className="m-plus-rounded-1c-regular text-[12px] text-white leading-[14px] text-center">
                    {userSubscription ? 'Subscription Active' : 'Trial ends in:'}
                  </p>
                  <p className="m-plus-rounded-1c-regular text-[14px] text-white leading-[16px] text-center">
                    {userSubscription 
                      ? new Date(userSubscription.end_date).toLocaleDateString()
                      : '10 th April, 2025'
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[33.33%] !p-1 flex items-center justify-center border-b md:border-b-0 md:border-r border-solid border-[#06060699]">
              <div className="py-1 px-8">
                <p className="m-plus-rounded-1c-regular text-[14px] text-[#060606] text-center">
                  Payment Start date:
                </p>
                <p className="m-plus-rounded-1c-medium text-[18px] text-[#060606] text-center">
                  {userSubscription 
                    ? new Date(userSubscription.start_date).toLocaleDateString()
                    : '12 th March, 2025'
                  }
                </p>
              </div>
            </div>
            <div
              align="center"
              className="w-full md:w-[33.33%] !p-1 flex items-center justify-center"
            >
              <div className="py-1 px-8">
                <p className="m-plus-rounded-1c-regular text-[14px] text-[#060606] text-center">
                  Next Payment Due date:
                </p>
                <p className="m-plus-rounded-1c-medium text-[18px] text-[#060606] text-center">
                  {userSubscription 
                    ? new Date(userSubscription.end_date).toLocaleDateString()
                    : '12 th April, 2025'
                  }
                </p>
              </div>
            </div>
                </div>
              )}
              
          <div className="flex lg:flex-row flex-col items-start md:gap-16 gap-8">
            {/* left */}
            <div className="w-full flex flex-col items-start gap-4">
              <div 
                className="w-full flex items-center gap-2 cursor-pointer"
                onClick={() => setIsOrderDetailsOpen(!isOrderDetailsOpen)}
              >
                <div class="shadow-[0px_2px_5px_0px_#0000004D] py-2 px-2.25 rounded-full w-fit h-fit bg-white">
                  <ArrowForwardIosSharpIcon 
                    className={`transition-transform duration-200 ${
                      isOrderDetailsOpen ? 'rotate-90' : 'rotate-0'
                    }`}
                  />
                </div>
                <p className="lg:text-[16px] text-[14px] text-[#060606] text-start sora-regular">{`Order Details`}</p>
              </div>
              
              {/* Order Details - Accordion content */}
              {isOrderDetailsOpen && (
                <div className="flex flex-col gap-1 w-full">
                  <div className="shadow-[0px_4px_4px_0px_#00000040] border border-solid border-[#06060699] bg-white rounded-[5px] flex flex-row">
                    <div className="border-r border-solid border-[#06060699] flex items-center justify-center w-full p-1.5">
                      <p className="m-plus-rounded-1c-medium uppercase text-lg text-[#060606D9]">
                        PRODUCT
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-full p-1.5">
                      <p className="m-plus-rounded-1c-medium uppercase text-lg text-[#060606D9]">
                        TOTAL
                      </p>
                    </div>
                  </div>
                  <div className="shadow-[0px_4px_4px_0px_#00000040] border border-solid border-[#06060699] bg-white rounded-[1px] flex flex-col">
                    <div className="w-full flex border-b border-solid border-[#06060699]">
                      <div className="border-r border-solid border-[#06060699] flex items-center justify-center w-full p-1.5">
                        <p className="m-plus-rounded-1c-regular uppercase text-sm text-[#060606]">
                          {userSubscription?.subscription?.plan_type || 'Basic'} Plan ({userSubscription?.subscription?.billing_cycle || 'monthly'}) * 1
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-full p-1.5">
                        <p className="m-plus-rounded-1c-regular uppercase text-sm text-[#060606]">
                          ${paymentData?.amount ? (paymentData.amount / 100).toFixed(2) : (userSubscription?.subscription?.billing_cycle === 'yearly' 
                            ? userSubscription?.subscription?.yearly_price 
                            : userSubscription?.subscription?.monthly_price)} ({userSubscription?.subscription?.credits_per_month || '10'} Session)
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex border-b border-solid border-[#06060699]">
                      <div className="border-r border-solid border-[#06060699] flex items-center justify-center w-full p-1.5">
                        <p className="m-plus-rounded-1c-regular uppercase text-sm text-[#060606]">
                          Subtotal
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-full p-1.5">
                        <p className="m-plus-rounded-1c-regular uppercase text-sm text-[#060606]">
                          ${paymentData?.amount ? (paymentData.amount / 100).toFixed(2) : (userSubscription?.subscription?.billing_cycle === 'yearly' 
                            ? userSubscription?.subscription?.yearly_price 
                            : userSubscription?.subscription?.monthly_price)}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex border-b border-solid border-[#06060699]">
                      <div className="border-r border-solid border-[#06060699] flex items-center justify-center w-full p-1.5">
                        <p className="m-plus-rounded-1c-medium uppercase text-sm text-[#060606]">
                          Grand Total:
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-full p-1.5">
                        <p className="m-plus-rounded-1c-medium uppercase text-sm text-[#060606]">
                          ${paymentData?.amount ? (paymentData.amount / 100).toFixed(2) : (userSubscription?.subscription?.billing_cycle === 'yearly' 
                            ? userSubscription?.subscription?.yearly_price 
                            : userSubscription?.subscription?.monthly_price)}
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex items-center justify-center w-full p-1.5">
                      <div className="bg-[#CF2427] rounded-[5px] px-2 py-1 flex items-center gap-2 w-fit cursor-pointer">
                        <Image src={pdfIcon} alt="pdfIcon" className="w-5 h-7" />
                        <p className="m-plus-rounded-1c-regular text-white text-base">
                          Download Receipt Invoice
                        </p>
                      </div>
                    </div> */}
                  </div>
                </div>
              )}
            </div>
            
            {/* right */}
            <div className="w-full flex flex-col items-start gap-4">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsOrderInfoOpen(!isOrderInfoOpen)}
              >
                <div class="shadow-[0px_2px_5px_0px_#0000004D] py-2 px-2.25 rounded-full w-fit h-fit bg-white">
                  <ArrowForwardIosSharpIcon 
                    className={`transition-transform duration-200 ${
                      isOrderInfoOpen ? 'rotate-90' : 'rotate-0'
                    }`}
                  />
                </div>
                <p className="lg:text-[16px] text-[14px] text-[#060606] text-start sora-regular">{`Order Information`}</p>
              </div>
              
              {/* Order Information - Accordion content */}
              {isOrderInfoOpen && (
                <div className="flex flex-col gap-1 w-full">
                <div className="shadow-[0px_4px_4px_0px_#00000040] border border-solid border-[#06060699] bg-white rounded-[5px] md:px-8 px-4 py-1.5">
                  <p className="m-plus-rounded-1c-medium capitalize text-lg text-[#060606D9]">
                    Billing To
                  </p>
                </div>
                <div className="shadow-[0px_4px_4px_0px_#00000040] border border-solid border-[#06060699] bg-white rounded-[1px] flex flex-col">
                  <div className="w-full flex border-b border-solid border-[#06060699] md:px-8 px-4 py-1.5">
                    <p className="m-plus-rounded-1c-regular uppercase text-sm text-[#060606]">
                      Customer Name: {user?.first_name && user?.last_name 
                        ? `${user.first_name} ${user.last_name}` 
                        : user?.name || user?.email || 'User'}
                    </p>
                  </div>
                  {/* <div className="w-full flex border-b border-solid border-[#06060699] md:px-8 px-4 py-2.5">
                    <p className="m-plus-rounded-1c-medium uppercase text-sm text-[#060606]">
                      Address: {user?.address || user?.billing_address || ''}
                    </p>
                  </div> */}
                  <div className="w-full flex md:flex-row flex-col items-center gap-2 md:px-8 px-4 py-1.5">
                    <Link
                      href="/"
                      className={`uppercase border-b-[2px] border-dolid flex items-center justify-center gap-2 px-10 py-1 rounded border-white bg-[#000000] text-[#060606] hover:bg-[#FFDE5A] m-plus-rounded-1c-regular !border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !flex-row-reverse !text-[14px] !px-5 !py-2 h-fit w-full`}
                    >
                      Back to home
                      <Image
                        src={lets_icons_back_3}
                        alt="lets_icons_back_3"
                      />
                    </Link>
                    <Link
                      href="/about#custom"
                      className={`!border-[2px] !border-[#060606] !text-[#060606] !text-[14px] !px-5 !py-1.5 flex !items-center gap-2 h-fit w-full`}
                    >
                      JUMP TO SESSION
                      <ArrowRight width={19} height={13} />
                    </Link>
                  </div>
                </div>
                </div>
              )}
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ThankYou;
