import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginAdmin } from "../features/auth/authSlice";
import "../styles/AdminLogin.scss";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { status, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const result = await dispatch(loginAdmin(data));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/products"); // redirect to product page
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage: 'url("/images/login-bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left side: Login form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Glassmorphism effect
          backdropFilter: "blur(6px)",
          bgcolor: "rgba(255, 255, 255, 0.6)",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              bgcolor: "rgba(255,255,255,0.85)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#b77ed8" }}
            >
              Admin Login
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.2,
                  fontWeight: "bold",
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #6a11cb, #b77ed8)",
                }}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Logging in..." : "Login"}
              </Button>

              {error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </form>
          </Box>
        </Container>
      </Box>

      {/* Right side: Empty flex area showing background image */}
      <Box sx={{ flex: 1 }} />
    </Box>
  );
};

export default AdminLogin;
