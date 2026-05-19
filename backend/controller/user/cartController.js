import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();

    // ✅ Populate before sending back
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.productId",
    );
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove Product
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );
    await cart.save();

    // ✅ Populate product details before sending back
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.productId",
    );
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId",
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
