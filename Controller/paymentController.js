const paymentModel = require("../Model/paymentModel");

const stripe = require("stripe")(
  "sk_test_51OseCYP2IA2J9iAqKFb1DCf07vTUOZA3e9cGhiV8ciC5Tkdt6i3yUIh2r88kerPFnzN3lNECGw7yA3Icf11o01FM006pMdhEax"
);

// create stripe payment
const createPayment = async (req, res) => {
  try {
    const { email, items } = req.body;

    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: Number(item.sale_price) * 100,
        product_data: {
          name: item.name,
          images: [item.images[0]],
          description: item.description,
        },
      },
      quantity: 1,
    }));

    const success_url = `${process.env.CLIENT_URL}`;
    const cancel_url = `${process.env.CLIENT_URL}/purchase`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      success_url,
      cancel_url,
      line_items: transformedItems,
    });

    res.status(200).send({ success: true, url: session.url });
  } catch (error) {
    res.status(501).send({ success: false, massage: "Create payment failed" });
  }
};

// save payment info
const savePayment = async (req, res) => {
  try {
    const { total, subtotal, tax, totalItem } = req.body;

    const data = await new paymentModel({});
  } catch (error) {
    res.status(500).send({ success: false, massage: "Internal server error" });
  }
};

module.exports = { createPayment };
