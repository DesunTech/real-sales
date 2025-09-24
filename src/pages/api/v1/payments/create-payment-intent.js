import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ 
        error: "Missing STRIPE_SECRET_KEY environment variable. Please add it to your .env.local file." 
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const { plan_type, billing_cycle, user_id, subscription_id } = req.body;

    if (!plan_type || !billing_cycle) {
      return res.status(400).json({ 
        error: "Missing required fields: plan_type and billing_cycle" 
      });
    }

    // Define pricing based on plan type and billing cycle
    // Stripe requires amounts in cents (smallest currency unit)
    const pricing = {
      starter: {
        monthly: 5900, // $29.99 (29.99 * 100)
        yearly: 24900  // $299.99 (299.99 * 100)
      },
      manager: {
        monthly: 84900, // $59.99 (59.99 * 100) - Adjust this price as needed
        yearly: 134900  // $599.99 (599.99 * 100) - Adjust this price as needed
      },
      // Add more plans as needed
    };

    const amount = pricing[plan_type]?.[billing_cycle];
    if (!amount) {
      return res.status(400).json({ 
        error: "Invalid plan type or billing cycle" 
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      metadata: {
        plan_type,
        billing_cycle,
        user_id: user_id || 'anonymous',
        subscription_id: subscription_id || `sub_${Date.now()}`,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Created payment intent:', {
      id: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      amount_dollars: `$${(paymentIntent.amount / 100).toFixed(2)}`,
      currency: paymentIntent.currency,
      plan_type,
      billing_cycle
    });

    return res.status(200).json({ 
      client_secret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      plan_type,
      billing_cycle,
      subscription_id: paymentIntent.metadata.subscription_id
    });
  } catch (error) {
    console.error("Payment intent creation error", error);
    return res
      .status(500)
      .json({ error: error?.message || "Failed to create payment intent" });
  }
}
