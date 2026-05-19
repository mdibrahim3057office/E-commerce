import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductList = ({ products, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleMenuOpen = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: "14px",
        border: "1px solid #e5e7eb",
      }}
    >
      <Table>
        {/* Header */}
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#f8fafc",
            }}
          >
            <TableCell>
              <Typography fontWeight={700} color="#374151">
                Title
              </Typography>
            </TableCell>

            <TableCell>
              <Typography fontWeight={700} color="#374151">
                SKU
              </Typography>
            </TableCell>

            <TableCell>
              <Typography fontWeight={700} color="#374151">
                Selling Price
              </Typography>
            </TableCell>

            <TableCell align="right">
              <Typography fontWeight={700} color="#374151"></Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Body */}
        <TableBody>
          {products.map((p) => (
            <TableRow
              key={p._id}
              hover
              sx={{
                transition: "0.2s ease",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                },
                "& .MuiTableCell-root": {
                  py: 0.8, // smaller row height
                },
              }}
            >
              <TableCell>
                <Typography fontWeight={500}>{p.title}</Typography>
              </TableCell>

              <TableCell>
                <Typography color="text.secondary">{p.sku}</Typography>
              </TableCell>

              <TableCell>
                <Typography fontWeight={600}>₹{p.sellingPrice}</Typography>
              </TableCell>

              <TableCell align="right">
                <IconButton
                  onClick={(e) => handleMenuOpen(e, p)}
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            width: "140px",
            maxWidth: "140px",
            borderRadius: "12px",
            mt: 1,
            p: 1,
            transform: "translateX(-140px) !important",
          },
        }}
      >
        <MenuItem
          sx={{
            pl: 1, // move content left
            borderRadius: "8px",
            py: 1.2,
            gap: 1.2,

            "&:hover": {
              backgroundColor: "#ede9fe",
              color: "#6d28d9",
            },
          }}
          onClick={() => {
            onEdit(selectedProduct);
            handleMenuClose();
          }}
        >
          <EditIcon fontSize="small" />
          Edit
        </MenuItem>

        <MenuItem
          sx={{
            pl: 1, // move content left
            borderRadius: "8px",
            py: 1.2,
            gap: 1.2,

            "&:hover": {
              backgroundColor: "#fee2e2",
              color: "#dc2626",
            },
          }}
          onClick={() => {
            onDelete(selectedProduct._id);
            handleMenuClose();
          }}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default ProductList;
