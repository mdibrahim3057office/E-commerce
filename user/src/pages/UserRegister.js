import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function UserRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const { status, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const result = await dispatch(userRegister(data));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
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
      {/* Left Side */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(6px)",
          bgcolor: "rgba(255,255,255,0.55)",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              p: 4,
              borderRadius: "20px",
              bgcolor: "rgba(255,255,255,0.88)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "#7c3aed",
                mb: 3,
              }}
            >
              Create Account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                {...register("name", { required: true })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />

              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register("email", { required: true })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("password", { required: true })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={status === "loading"}
                sx={{
                  mt: 3,
                  py: 1.3,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                  background: "linear-gradient(90deg, #6d28d9, #a855f7)",

                  "&:hover": {
                    background: "linear-gradient(90deg, #5b21b6, #9333ea)",
                  },
                }}
              >
                {status === "loading" ? "Creating Account..." : "Register"}
              </Button>

              {status === "failed" && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </form>
          </Box>
        </Container>
      </Box>

      {/* Right Side */}
      <Box sx={{ flex: 1 }} />
    </Box>
  );
}
