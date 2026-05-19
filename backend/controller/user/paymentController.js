import crypto from "crypto";
import Cart from "../../models/Cart.js";
import Order from "../../models/Order.js";

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      await Order.findByIdAndUpdate(orderId, { status: "failed" });
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // ✅ Update order status
    await Order.findByIdAndUpdate(orderId, { status: "paid" });

    // ✅ Clear cart only after success
    await Cart.deleteOne({ userId: req.user.id });

    res.json({ message: "Payment verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
