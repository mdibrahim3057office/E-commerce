import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import UserNavbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../features/auth/authSlice";

import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  // search input
  const [search, setSearch] = useState("");

  // debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { products, status, error, pages } = useSelector(
    (state) => state.product,
  );

  /* =========================
     DEBOUNCE SEARCH
  ========================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search]);

  /* =========================
     FETCH PRODUCTS
  ========================= */
  useEffect(() => {
    dispatch(
      fetchProducts({
        page,
        limit: 8,
        search: debouncedSearch,
      }),
    );
  }, [dispatch, page, debouncedSearch]);

  /* =========================
     ADD TO CART
  ========================= */
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
      }),
    );
  };

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (status === "loading") {
    return <Typography sx={{ p: 5 }}>Loading...</Typography>;
  }

  if (status === "failed") {
    return (
      <Typography color="error" sx={{ p: 5 }}>
        {error}
      </Typography>
    );
  }

  return (
    <>
      <UserNavbar onLogout={handleLogout} />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Products
          </Typography>

          {/* SEARCH */}
          <TextField
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{
              width: {
                xs: "100%",
                sm: 320,
              },

              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                backgroundColor: "#fff",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* PRODUCTS */}
        <Grid container spacing={2.2}>
          {products?.map((p) => (
            <Grid item xs={6} sm={4} md={3} key={p._id}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "14px",
                  border: "1px solid #ececec",
                  overflow: "hidden",
                  transition: "0.2s ease",
                  backgroundColor: "#fff",

                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* IMAGE */}
                <CardMedia
                  component="img"
                  height="170"
                  image={
                    p.image
                      ? `${BASE_URL}${p.image}`
                      : "https://via.placeholder.com/300"
                  }
                  alt={p.title}
                  sx={{
                    objectFit: "cover",
                  }}
                />

                {/* CONTENT */}
                <CardContent
                  sx={{
                    p: 1.5,
                    "&:last-child": {
                      pb: 1.5,
                    },
                  }}
                >
                  {/* TITLE */}
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 600,
                      fontSize: "15px",
                      color: "#111827",
                    }}
                  >
                    {p.title}
                  </Typography>

                  {/* STOCK */}
                  <Typography
                    sx={{
                      color: "#6b7280",
                      fontSize: "12px",
                      mt: 0.3,
                    }}
                  >
                    Stock: {p.stock}
                  </Typography>

                  {/* PRICE */}
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "18px",
                        color: "#7c3aed",
                      }}
                    >
                      ₹{p.sellingPrice}
                    </Typography>

                    {p.originalPrice && (
                      <Typography
                        sx={{
                          textDecoration: "line-through",
                          color: "#9ca3af",
                          fontSize: "12px",
                        }}
                      >
                        ₹{p.originalPrice}
                      </Typography>
                    )}
                  </Box>

                  {/* BUTTON */}
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleAddToCart(p)}
                    sx={{
                      mt: 1.5,
                      py: 0.9,
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "13px",
                      background: "linear-gradient(90deg, #6d28d9, #a855f7)",

                      "&:hover": {
                        background: "linear-gradient(90deg, #5b21b6, #9333ea)",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* PAGINATION */}
        <Box display="flex" justifyContent="center" mt={5}>
          <Pagination
            count={pages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Box>
      </Container>
    </>
  );
}
