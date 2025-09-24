import React, { useState, useEffect } from 'react';
import { usePayment } from '../hooks/usePayment';
import { useSubscription } from '../hooks/useSubscription';

const PaymentStatus = ({ paymentIntentId, onSuccess, onError }) => {
  const { getPaymentStatus } = usePayment();
  const { getUserSubscription } = useSubscription();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!paymentIntentId) return;

    let pollCount = 0;
    const maxPolls = 3; // Increased to 3 polls (15 seconds total)
    let timeoutId = null;
    let isMounted = true; // Track if component is still mounted

    const checkPaymentStatus = async () => {
      // Stop if component is unmounted
      if (!isMounted) return;
      
      try {
        const response = await getPaymentStatus(paymentIntentId);
        
        if (response && response.status === 'succeeded') {
          setStatus('success');
          // Refresh user subscription only once
          if (isMounted) {
            await getUserSubscription();
            onSuccess && onSuccess(response);
          }
          return; // Stop polling immediately
        } else if (response && response.status === 'failed') {
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
          setError('Payment status check timed out. Please check your subscription status.');
          onError && onError('Payment status check timed out');
        }
      } catch (err) {
        console.error('Payment status check error:', err);
        if (isMounted) {
          // If it's a network error or API error, try again
          if (pollCount < maxPolls) {
            pollCount++;
            timeoutId = setTimeout(checkPaymentStatus, 5000);
          } else {
            setStatus('error');
            setError('Unable to verify payment status. Please check your subscription.');
            onError && onError(err.message);
          }
        }
      }
    };

    // Start checking after a short delay to allow webhook processing
    timeoutId = setTimeout(checkPaymentStatus, 2000);

    // Cleanup function to clear timeout and stop polling
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [paymentIntentId, getPaymentStatus, getUserSubscription, onSuccess, onError]);

  if (status === 'processing') {
    return (
      <div className="text-center p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Processing Payment...</h2>
        <p className="text-gray-600">Please wait while we confirm your payment and activate your subscription.</p>
        <p className="text-sm text-gray-500 mt-2">This may take a few moments...</p>
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
