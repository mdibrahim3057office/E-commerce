// src/pages/UserRegister.js
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../features/auth/authSlice";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.scss";

export default function UserRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const { status, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const result = await dispatch(userRegister(data));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login"); // redirect to product page
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          {...register("name", { required: true })}
          fullWidth
          margin="normal"
        />
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
          Register
        </Button>
      </form>
      {status === "failed" && <Typography color="error">{error}</Typography>}
    </Container>
  );
}
