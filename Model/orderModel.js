const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    order_item: [
      {_id: {
        type: mongoose.ObjectId,
        ref: "Product",
        required: true,
      },
        item_name: {
          type: String,
          required: true,
        },
        unit_price: {
          type: Number,
          default: 0,
          required: true,
        },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    vouchers: {
      type: String,
      default : '',
    },
    subTotalPrice: {
      type: Number,
      default : 0,
    },
    discountedPrice: {
      type: Number,
      default : 0,
    },
    shippingCharge:{
      type :Number ,
      require:true,
      default:0,
    },
    finalPrice:{
      type :Number ,
      require:true,
      default:0,
    },
    status: {
      type: String,
      default: "Payment Pending",
      enum: ["Payment Pending","Processing","Processed And Ready to Ship", "Shipped","Ready To Delivery", "Delivered","Cancelled"],
    },
    cash_status: {
      type: String,
      default: "Not Paid",
      enum: ["Not Paid", "Cash Recieved", "Not Refunded", "Refunded"],
    },
    type_of_payment: {
      type: String,
      enum: ["Bkash", "Roket", "Nagad", "Card","Cash On Delivery (COD)"],
    },
    transactionId: {
      type:String,
    },
    OTP:{
      type:String,

    },
    phone:{
      type:String,
    }

}) 