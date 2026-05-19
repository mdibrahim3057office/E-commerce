import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
} from "../features/cart/cartSlice";

import {
  Container,
  Typography,
  Button,
  Box,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import UserNavbar from "../components/UserNavbar";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (item) => {
    dispatch(
      updateCartItem({
        productId: item.productId._id,
        quantity: item.quantity + 1,
      }),
    );
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateCartItem({
          productId: item.productId._id,
          quantity: item.quantity - 1,
        }),
      );
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeCartItem({ productId }));
  };

  const total = items.reduce(
    (sum, item) => sum + item.productId.sellingPrice * item.quantity,
    0,
  );

  return (
    <>
      <UserNavbar />
      <Container
        maxWidth="lg"
        sx={{
          py: 5,
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={4}>
          Shopping Cart
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr",
            },
            gap: 4,
            alignItems: "start",
          }}
        >
          {/* LEFT SIDE */}
          <Box display="flex" flexDirection="column" gap={2}>
            {items.map((item) => (
              <Paper
                key={item.productId._id}
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                  }}
                >
                  {/* LEFT - IMAGE */}
                  <Box
                    component="img"
                    src={
                      item.productId.image
                        ? `${BASE_URL}${item.productId.image}`
                        : "https://via.placeholder.com/120"
                    }
                    alt={item.productId.title}
                    sx={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 2,
                      border: "1px solid #eee",
                      flexShrink: 0,
                    }}
                  />

                  {/* RIGHT - DETAILS */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: 120,
                    }}
                  >
                    {/* TOP */}
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {item.productId.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                      >
                        ₹{item.productId.sellingPrice}
                      </Typography>
                    </Box>

                    {/* BOTTOM */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={2}
                      flexWrap="wrap"
                      gap={2}
                    >
                      {/* Quantity */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #ddd",
                          borderRadius: 2,
                          px: 0.5,
                          height: 36,
                          width: 80,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleDecrease(item)}
                          sx={{
                            p: 0.5,
                            width: 28,
                            height: 28,
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography
                          sx={{
                            minWidth: 24,
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: 14,
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() => handleIncrease(item)}
                          sx={{
                            p: 0.5,
                            width: 28,
                            height: 28,
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      {/* Right actions */}
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          color="success.main"
                        >
                          ₹{item.productId.sellingPrice * item.quantity}
                        </Typography>

                        <Button
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleRemove(item.productId._id)}
                          sx={{
                            whiteSpace: "nowrap",
                            minWidth: "auto",
                            px: 1,
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* RIGHT SIDE */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              position: "sticky",
              top: 20,
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Order Summary
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Total</Typography>

              <Typography variant="h5" fontWeight={700} color="success.main">
                ₹{total}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Button
              fullWidth
              variant="contained"
              size="large"
              color="success"
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
