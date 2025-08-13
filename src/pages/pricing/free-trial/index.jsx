import React, { useEffect } from 'react'
import Free from '../../../container/Pricing/free'
import { useSubscription } from '../../../hooks/useSubscription'

const FreePage = () => {
  const { getSubscription, subscriptions } = useSubscription();
  useEffect(() => {
    getSubscription();
  }, []);

  return <Free subscription={subscriptions} />
}

export default FreePage