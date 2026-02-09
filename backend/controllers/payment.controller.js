import crypto from "crypto";
import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import Cart from "../models/cart.model.js";
import Address from "../models/address.model.js";
import Order from "../models/order.model.js";
import Variant from "../models/variant.model.js";
import razorpayInstance from "../config.js/razorpay.js";


const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const cart = await Cart.findOne({ user: userId })
    .populate("items.productId", "name available")
    .populate("items.variantId", "price stock");

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  let subTotal = 0;
  for (const item of cart.items) {
    subTotal += item.variantId.price * item.quantity;
  }

  const shipping = 60;
  const tax = 0.18 * subTotal;
  const total = Math.round((subTotal + tax + shipping) * 100) / 100;

  const razorpayOrder = await razorpayInstance.orders.create({
    amount: total * 100,
    currency: "INR",
    receipt: `rcpt_${Date.now()}`
  });

  return res.status(200).json(
    new ApiResponse(200, "Razorpay order created", true, {
      key: process.env.RAZORPAY_API_KEY,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency
    })
  );
});


const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
  const userId = req.user._id;

  if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
    throw new ApiError(400, "Payment details missing");
  }

  
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    throw new ApiError(400, "Invalid payment signature");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    
    const existingOrder = await Order.findOne({
      "paymentDetails.razorpayPaymentId": razorpayPaymentId
    }).session(session);

    if (existingOrder) {
      throw new ApiError(409, "Payment already processed");
    }

    const cart = await Cart.findOne({ user: userId })
      .populate("items.productId")
      .populate("items.variantId")
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Cart is empty");
    }

    const address = await Address.findOne({
      user: userId,
      isDefault: true
    }).session(session);

    if (!address) {
      throw new ApiError(404, "Address not found");
    }

    let subTotal = 0;

    
    for (const item of cart.items) {
      const product = item.productId;
      const variant = item.variantId;

      if (!product.available) {
        throw new ApiError(400, `${product.name} is unavailable`);
      }

      const updatedVariant = await Variant.findOneAndUpdate(
        { _id: variant._id, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { session, new: true }
      );

      if (!updatedVariant) {
        throw new ApiError(400, "Insufficient stock");
      }

      subTotal += variant.price * item.quantity;
    }

    const shipping = 60;
    const tax = 0.18 * subTotal;
    const total = Math.round((subTotal + tax + shipping) * 100) / 100;

    
    const order = await Order.create(
      [
        {
          user: userId,
          orderNumber: `order_${Date.now()}`,
          items: cart.items.map(item => ({
            productId: item.productId._id,
            variantId: item.variantId._id,
            name: item.productId.name,
            price: item.variantId.price,
            quantity: item.quantity,
            size:item.variantId.size,
          })),
          totalAmount: total,
          paymentMethod: "online",
          orderStatus: "confirmed",
          paymentStatus: "paid",
          shippingAddress: {
            fullName: address.fullName,
            phone: address.phone,
            address: address.address,
            city: address.city,
            state: address.state,
            pinCode: address.pinCode,
            country: address.country
          },
          paymentDetails: {
            razorpayPaymentId,
            razorpayOrderId
          }
        }
      ],
      { session }
    );

    
    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Payment verified & order placed successfully",
        true,
        order[0]
      )
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

export { createOrder, verifyPayment };
