import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../features/product/productSlice";
import { Container, Typography, Button } from "@mui/material";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (status === "loading") return <Typography>Loading...</Typography>;
  if (status === "failed")
    return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>No product found</Typography>;

  return (
    <Container>
      <Typography variant="h4">{product.name}</Typography>
      <img
        src={product.image}
        alt={product.name}
        style={{ maxWidth: "300px" }}
      />
      <Typography>{product.description}</Typography>
      <Typography>₹{product.price}</Typography>
      <Typography>
        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        disabled={product.countInStock === 0}
      >
        Add to Cart
      </Button>
    </Container>
  );
}
