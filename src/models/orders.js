import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

// Item Schema
const ItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Order Schema
const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  },
  items: [ItemSchema],
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Creating the Mongoose model
const OrderModel = model("Order", OrderSchema);

export { OrderModel };
