import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import { addToCart } from "../features/cart/cartSlice"; // 👈 import thunk
import UserNavbar from "../components/UserNavbar";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <Typography>Loading...</Typography>;
  if (status === "failed")
    return <Typography color="error">{error}</Typography>;

  // Handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  return (
    <>
      <UserNavbar />
      <Container>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={3} key={p._id}>
              <Card sx={{ maxWidth: 280, mx: "auto" }}>
                {/* Product Image */}
                {p.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${BASE_URL}${p.image}`}
                    alt={p.title}
                  />
                )}

                <CardContent sx={{ p: 2 }}>
                  {/* Title */}
                  <Typography variant="subtitle1" noWrap>
                    {p.title}
                  </Typography>

                  {/* Selling Price */}
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ₹{p.sellingPrice}
                  </Typography>

                  {/* Original Price */}
                  {p.originalPrice && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ₹{p.originalPrice}
                    </Typography>
                  )}

                  {/* Stock */}
                  <Typography variant="caption" color="textSecondary">
                    Stock: {p.stock}
                  </Typography>

                  {/* Add to Cart */}
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => handleAddToCart(p)} // 👈 dispatch addToCart
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
