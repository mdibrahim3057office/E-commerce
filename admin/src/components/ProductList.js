import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Selling Price</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {products.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.sku}</TableCell>
              <TableCell>₹{p.sellingPrice}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => onEdit(p)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => onDelete(p._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
