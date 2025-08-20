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
				// Fulfill the purchase... e.g., grant access, store in DB, etc.
				break;
			}
			case "payment_intent.succeeded": {
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


