// src/pages/UserLogin.js
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authSlice";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.scss";

export default function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const { status, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const result = await dispatch(userLogin(data));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/products"); // redirect to product page
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          {...register("email", { required: true })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          {...register("password", { required: true })}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      {status === "failed" && <Typography color="error">{error}</Typography>}
    </Container>
  );
}
