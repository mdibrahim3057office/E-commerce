import Cart from "../../models/Cart.js";
import Order from "../../models/Order.js";
import getRazorpayInstance from "../../utils/razorpay.js";

export const checkout = async (req, res) => {
  try {
    const { address } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.productId.sellingPrice * item.quantity,
      0,
    );

    // ✅ Get Razorpay instance
    const razorpay = getRazorpayInstance();

    // Create Razorpay order
    const options = {
      amount: totalAmount * 100, // amount in paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save order in DB
    const order = new Order({
      userId: req.user.id,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      address,
      totalAmount,
      status: "pending",
    });

    await order.save();

    // Clear cart
    // await Cart.deleteOne({ userId: req.user.id });

    res.json({
      message: "Order created successfully",
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
