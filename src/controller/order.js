import { OrderModel } from "../models/orders.js";
import mongoose from "mongoose";

export async function createOrUpdateOrder({
  merchantOrderId,
  status,
  amount,
  cart,
  user,
}) {
  try {
    const order = await OrderModel.findOneAndUpdate(
      { orderId: merchantOrderId },
      {
        price: amount,
        status,
        items: cart,
        user: new mongoose.Types.ObjectId(user._id),
      },
      {
        new: true, // Return the modified document
        upsert: true, // Create the document if it doesn't exist
      }
    );

    return order;
  } catch (error) {
    console.error("Error creating or updating order:", error);
    throw error;
  }
}

export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate({
      path: "user",
      select: "name _id email",
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findOne({ orderId: id }).populate({
      path: "user",
      select: "name _id email",
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log({ userId });
    const order = await OrderModel.find({ user: userId }).populate({
      path: "user",
      select: "name _id email",
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
