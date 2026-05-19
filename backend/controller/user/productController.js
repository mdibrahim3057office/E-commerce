import Product from "../../models/Product.js";

// Get all products with search, filter, pagination
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", minPrice, maxPrice } = req.query;

    // Build query object
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive search
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(query).skip(skip).limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Existing single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
