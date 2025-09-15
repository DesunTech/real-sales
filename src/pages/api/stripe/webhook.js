import Stripe from "stripe";
import axios from "axios";

export const config = {
	api: {
		bodyParser: false,
	},
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
	apiVersion: "2024-06-20",
});

// Function to update payment record
const updatePaymentRecord = async (session) => {
	try {
		const paymentData = {
			subscription_id: session.metadata?.subscription_id || "temp_subscription_id",
			user_id: session.metadata?.user_id || "temp_user_id",
			amount: session.amount_total || 0,
			currency: session.currency || "usd",
			payment_status: "completed",
			payment_method: "stripe",
			provider: "stripe",
			external_payment_id: session.id,
			payment_date: new Date().toISOString(),
			receipt_url: session.receipt_url || "",
			failure_reason: ""
		};

		console.log("Updating payment record:", paymentData);

		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/v1/payments/`,
			paymentData,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		return response.data;
	} catch (error) {
		console.error("Failed to update payment record:", error);
		return null;
	}
};

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
				// Fulfill the purchase... e.g., grant access, store in DB, etc.
				await updatePaymentRecord(event.data.object);
				break;
			}
			case "payment_intent.succeeded": {
				// Handle successful payment intent
				console.log("Payment intent succeeded:", event.data.object.id);
				break;
			}
			default: {
				break;
			}
		}
		return res.status(200).json({ received: true });
	} catch (error) {
		console.error("Webhook handler error", error);
		return res.status(500).json({ error: "Webhook handler failed" });
	}
}


