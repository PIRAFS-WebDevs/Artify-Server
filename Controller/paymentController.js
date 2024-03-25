const paymentModel = require("../Model/paymentModel");

const stripe = require("stripe")(
  "sk_test_51OseCYP2IA2J9iAqKFb1DCf07vTUOZA3e9cGhiV8ciC5Tkdt6i3yUIh2r88kerPFnzN3lNECGw7yA3Icf11o01FM006pMdhEax"
);

// create stripe payment
const createPayment = async (req, res) => {
  try {
    const { email, items } = req.body;

    const total = items.reduce((accumulator, currentItem) => {
      return accumulator + parseFloat(currentItem.sale_price);
    }, 0);

    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: Math.round(total * 100),
        product_data: {
          name: item.name,
          images: [item.images[0]] || "",
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

    if (session) {
      const data = {
        email,
        products: items.map((item) => item._id),
        total: total.toFixed(2),
      };

      await new paymentModel(data).save();
    }

    res.status(200).send({ success: true, url: session.url });
  } catch (error) {
    res.status(501).send({ success: false, massage: "Create payment failed" });
  }
};

// save payment info
const savePayment = async (data) => {
  const existPayment = await paymentModel.findOne({ email: data.email });

  if (existPayment) {
    await paymentModel.findOneAndUpdate(existPayment._id, data, { new: true });
  } else {
    await new paymentModel(data).save();
  }
};

// get all payment info
const getAllPayment = async (req, res) => {
  try {
    const data = await paymentModel.find();
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

// get payment info by email
const getPaymentByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    try {
      const data = await paymentModel.find({ email });
      if (data) {
        res.status(200).send({ success: true, data });
      } else {
        res.status(404).send({ success: false, massage: "user not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ success: false, massage: "internal server error" });
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

module.exports = { createPayment, getAllPayment, getPaymentByEmail };
