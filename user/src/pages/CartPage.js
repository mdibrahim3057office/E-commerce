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
import { logout } from "../features/auth/authSlice";
import UserNavbar from "../components/UserNavbar";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const items = cart?.items || [];

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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const total = items.reduce(
    (sum, item) => sum + item.productId.sellingPrice * item.quantity,
    0,
  );

  return (
    <>
      <UserNavbar onLogout={handleLogout} />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 4,
            color: "#111827",
          }}
        >
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
            {items?.map((item) => (
              <Paper
                key={item.productId._id}
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: "20px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  {/* IMAGE */}
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
                      borderRadius: "16px",
                      border: "1px solid #f1f5f9",
                      backgroundColor: "#f8fafc",
                    }}
                  />

                  {/* DETAILS */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {/* LEFT CONTENT */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#111827",
                          mb: 0.5,
                        }}
                      >
                        {item.productId.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#6b7280",
                          fontSize: "15px",
                        }}
                      >
                        ₹{item.productId.sellingPrice}
                      </Typography>

                      {/* Quantity */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          width: "fit-content",
                          mt: 2,
                          overflow: "hidden",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleDecrease(item)}
                          sx={{
                            borderRadius: 0,
                            px: 1,
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography
                          sx={{
                            px: 2,
                            fontWeight: 700,
                            fontSize: "15px",
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() => handleIncrease(item)}
                          sx={{
                            borderRadius: 0,
                            px: 1,
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* RIGHT CONTENT */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 2,
                      }}
                    >
                      {/* Total */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: "#7c3aed",
                        }}
                      >
                        ₹{item.productId.sellingPrice * item.quantity}
                      </Typography>

                      {/* Delete Icon */}
                      <IconButton
                        onClick={() => handleRemove(item.productId._id)}
                        sx={{
                          border: "1px solid #fee2e2",
                          color: "#dc2626",
                          borderRadius: "12px",

                          "&:hover": {
                            backgroundColor: "#fee2e2",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* RIGHT SIDE */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "20px",
              border: "1px solid #e5e7eb",
              position: "sticky",
              top: 20,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "#111827",
              }}
            >
              Order Summary
            </Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography
                sx={{
                  color: "#6b7280",
                  fontSize: "16px",
                }}
              >
                Total
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#7c3aed",
                }}
              >
                ₹{total}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => navigate("/checkout")}
              sx={{
                py: 1.5,
                borderRadius: "14px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "15px",
                background: "linear-gradient(90deg, #6d28d9, #a855f7)",

                "&:hover": {
                  background: "linear-gradient(90deg, #5b21b6, #9333ea)",
                },
              }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
