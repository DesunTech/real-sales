import Stripe from "stripe";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
	apiVersion: "2024-06-20",
});

// Function to create payment record
const createPaymentRecord = async (session, metadata) => {
	try {
		const paymentData = {
			subscription_id: metadata?.subscription_id || "temp_subscription_id",
			user_id: metadata?.user_id || "temp_user_id",
			amount: session.amount_total || 0,
			currency: session.currency || "usd",
			payment_status: "pending",
			payment_method: "stripe",
			provider: "stripe",
			external_payment_id: session.id,
			payment_date: new Date().toISOString(),
			receipt_url: session.receipt_url || "",
			failure_reason: ""
		};

		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/v1/payments/`,
			paymentData,
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${metadata?.token || ''}`
				}
			}
		);

		return response.data;
	} catch (error) {
		console.error("Failed to create payment record:", error);
		// Don't throw error to avoid breaking the checkout flow
		return null;
	}
};

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		if (!process.env.STRIPE_SECRET_KEY) {
			return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });
		}

		const origin =
			req.headers.origin ||
			process.env.NEXT_PUBLIC_SITE_URL ||
			`http://localhost:${process.env.PORT || 3000}`;

		const {
			mode = "payment",
			ui_mode = "embedded",
			line_items: providedLineItems,
			success_url,
			cancel_url,
			return_url,
			customer_email,
			metadata,
		} = req.body || {};

		const defaultLineItems = [
			{
				price_data: {
					currency: "usd",
					product_data: { name: "RealSales Payment" },
					unit_amount: 9900,
				},
				quantity: 1,
			},
		];

		const baseParams = {
			ui_mode,
			mode,
			line_items: Array.isArray(providedLineItems)
				? providedLineItems
				: defaultLineItems,
			allow_promotion_codes: true,
			automatic_tax: { enabled: false },
			customer_email,
			metadata,
		};

		const hostedParams = {
			...baseParams,
			success_url:
				success_url || `${origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: cancel_url || `${origin}/pricing`,
		};

		const embeddedParams = {
			...baseParams,
			return_url:
				return_url || `${origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
		};

		const session = await stripe.checkout.sessions.create(
			ui_mode === "embedded" ? embeddedParams : hostedParams
		);

		// Create payment record before returning success response
		await createPaymentRecord(session, metadata);

		if (ui_mode === "embedded") {
			return res.status(200).json({ client_secret: session.client_secret });
		}

		return res.status(200).json({ id: session.id, url: session.url });
	} catch (error) {
		console.error("Stripe session error", error);
		return res
			.status(500)
			.json({ error: error?.message || "Failed to create checkout session" });
	}
}


