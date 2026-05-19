import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  createOrderAPI,
  verifyPaymentAPI,
} from "../features/checkout/checkoutAPI";
import { Container, Typography, TextField, Button } from "@mui/material";
import UserNavbar from "../components/UserNavbar";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // 1. Create order on backend
      const res = await createOrderAPI({ address: data.address });

      // 2. Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "Mini E-Commerce",
        description: "Order Payment",
        order_id: res.data.razorpayOrderId,
        handler: async function (response) {
          console.log("response", response);
          try {
            // 3. Verify payment
            await verifyPaymentAPI({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: res.data.orderId,
            });
            // 4. Redirect or show success
            // window.location.href = `/order-success/${res.data.orderId}`;
             navigate("/products");
          } catch (err) {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#1976d2" },
      };

      // 5. Open Razorpay modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <UserNavbar onLogout={handleLogout} />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Shipping Address"
            {...register("address", { required: true })}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay with Razorpay"}
          </Button>
        </form>
      </Container>
    </>
  );
}
