import React, { useState, useEffect } from 'react';
import { usePayment } from '../hooks/usePayment';
import { useSubscriptionSilent } from '../hooks/useSubscriptionSilent';

const PaymentStatus = ({ paymentIntentId, onSuccess, onError }) => {
  const { getPaymentStatus } = usePayment();
  const { getUserSubscriptionSilent } = useSubscriptionSilent();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  // Function to refresh user subscription with retry logic
  const refreshUserSubscriptionWithRetry = async (retryCount = 0) => {
    const maxRetries = 5; // Increased retries
    const retryDelay = 3000; // Increased delay to 3 seconds

    try {
      await getUserSubscriptionSilent();
      console.log('Subscription successfully loaded');
    } catch (err) {
      console.log(`Subscription not ready yet (attempt ${retryCount + 1}/${maxRetries + 1})`);
      
      if (retryCount < maxRetries && isMounted) {
        // Retry after delay
        setTimeout(() => {
          if (isMounted) {
            refreshUserSubscriptionWithRetry(retryCount + 1);
          }
        }, retryDelay);
      } else {
        console.error('Failed to refresh subscription after retries:', err);
        // Don't show error to user during payment processing
      }
    }
  };

  useEffect(() => {
    if (!paymentIntentId) return;

    let pollCount = 0;
    const maxPolls = 2; // Reduced to 2 polls (10 seconds total)
    let timeoutId = null;
    let isMounted = true; // Track if component is still mounted

    const checkPaymentStatus = async () => {
      // Stop if component is unmounted
      if (!isMounted) return;
      
      try {
        const response = await getPaymentStatus(paymentIntentId);
        
        if (response.status === 'succeeded') {
          setStatus('success');
          // Always wait a bit for backend processing before fetching subscription
          if (isMounted) {
            // Wait 3 seconds for backend to process subscription
            setTimeout(async () => {
              if (isMounted) {
                await refreshUserSubscriptionWithRetry();
                onSuccess && onSuccess(response);
              }
            }, 3000);
          }
          return; // Stop polling immediately
        } else if (response.status === 'failed') {
          setStatus('failed');
          setError('Payment failed');
          if (isMounted) {
            onError && onError('Payment failed');
          }
          return; // Stop polling immediately
        } else if (pollCount < maxPolls && isMounted) {
          // Still processing, check again in 5 seconds
          pollCount++;
          timeoutId = setTimeout(checkPaymentStatus, 5000);
        } else if (isMounted) {
          // Max polls reached, show timeout
          setStatus('timeout');
          setError('Payment status check timed out');
          onError && onError('Payment status check timed out');
        }
      } catch (err) {
        if (isMounted) {
          setStatus('error');
          setError(err.message);
          onError && onError(err.message);
        }
      }
    };

    checkPaymentStatus();

    // Cleanup function to clear timeout and stop polling
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [paymentIntentId, getPaymentStatus, getUserSubscriptionSilent, onSuccess, onError]);

  if (status === 'processing') {
    return (
      <div className="text-center p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Processing Payment...</h2>
        <p className="text-gray-600">Please wait while we confirm your payment and activate your subscription.</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center p-4 text-green-600">
        <div className="text-4xl mb-2">✅</div>
        <h3 className="text-xl font-semibold">Payment Successful!</h3>
        <p>Your subscription has been activated.</p>
      </div>
    );
  }

  if (status === 'failed' || status === 'error' || status === 'timeout') {
    return (
      <div className="text-center p-4 text-red-600">
        <div className="text-4xl mb-2">❌</div>
        <h3 className="text-xl font-semibold">
          {status === 'timeout' ? 'Payment Status Unknown' : 'Payment Failed'}
        </h3>
        <p>{error || 'Something went wrong. Please try again.'}</p>
        {status === 'timeout' && (
          <p className="text-sm mt-2">
            The payment may still be processing. Please check your subscription status.
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default PaymentStatus;
