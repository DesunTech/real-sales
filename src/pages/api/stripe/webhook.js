import Stripe from "stripe";

export const config = {
	api: {
		bodyParser: false,
	},
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
	apiVersion: "2024-06-20",
});

async function buffer(readable) {
	const chunks = [];
	for await (const chunk of readable) {
		chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
	}
	return Buffer.concat(chunks);
}

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).json({ error: "Method not allowed" });
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });
	}

	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
	let event;

	try {
		const buf = await buffer(req);
		const sig = req.headers["stripe-signature"];

		if (endpointSecret) {
			event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
		} else {
			event = JSON.parse(buf.toString());
		}
	} catch (err) {
		console.error("Webhook signature verification failed.", err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				console.log("Checkout session completed:", event.data.object.id);
				break;
			}
			case "payment_intent.succeeded": {
				// Handle successful payment intent - forward to FastAPI backend
				const paymentIntent = event.data.object;
				console.log("Payment intent succeeded:", paymentIntent.id);
				
				// Extract metadata
				const { user_id, plan_type, billing_cycle, subscription_id } = paymentIntent.metadata;
				
				if (!user_id || !plan_type || !billing_cycle || !subscription_id) {
					console.error("Missing required metadata in payment intent");
					return res.status(400).json({ error: "Missing required metadata" });
				}

				try {
					// Forward the webhook to your FastAPI backend
					const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
					
					// Create the webhook payload for FastAPI
					const webhookPayload = {
						id: event.id,
						object: "event",
						api_version: "2020-08-27",
						created: event.created,
						data: {
							object: paymentIntent
						},
						livemode: event.livemode,
						pending_webhooks: event.pending_webhooks,
						request: event.request,
						type: "payment_intent.succeeded"
					};

					console.log('Forwarding webhook to FastAPI backend...');

					// Forward to FastAPI webhook endpoint
					const response = await fetch(`${baseUrl}/api/v1/payments/webhook`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Stripe-Signature': req.headers["stripe-signature"] // Forward the signature
						},
						body: JSON.stringify(webhookPayload)
					});

					if (response.ok) {
						const result = await response.json();
						console.log('FastAPI webhook processed successfully:', result);
					} else {
						const errorText = await response.text();
						console.error('FastAPI webhook failed:', response.status, errorText);
					}
				} catch (error) {
					console.error('Error forwarding webhook to FastAPI:', error);
				}
				
				break;
			}
			case "payment_intent.payment_failed": {
				// Handle failed payment intent
				const paymentIntent = event.data.object;
				console.log("Payment intent failed:", paymentIntent.id);
				
				// Forward to FastAPI backend
				const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
				
				const webhookPayload = {
					id: event.id,
					object: "event",
					api_version: "2020-08-27",
					created: event.created,
					data: {
						object: paymentIntent
					},
					livemode: event.livemode,
					pending_webhooks: event.pending_webhooks,
					request: event.request,
					type: "payment_intent.payment_failed"
				};

				try {
					const response = await fetch(`${baseUrl}/api/v1/payments/webhook`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Stripe-Signature': req.headers["stripe-signature"]
						},
						body: JSON.stringify(webhookPayload)
					});

					if (response.ok) {
						const result = await response.json();
						console.log('FastAPI webhook processed failed payment:', result);
					} else {
						console.error('FastAPI webhook failed for failed payment:', response.status);
					}
				} catch (error) {
					console.error('Error forwarding failed payment webhook:', error);
				}
				
				break;
			}
			default: {
				console.log(`Unhandled event type: ${event.type}`);
				break;
			}
		}
		return res.status(200).json({ received: true });
	} catch (error) {
		console.error("Webhook handler error", error);
		return res.status(500).json({ error: "Webhook handler failed" });
	}
}