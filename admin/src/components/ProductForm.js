// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   TextField,
//   Button,
//   Grid,
//   Paper,
//   Typography,
//   Box,
//   Divider,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const ProductForm = ({ onSubmit, defaultValues }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//      setValue,
//     formState: { errors },
//   } = useForm({ defaultValues });

//   const navigate = useNavigate();
//   const [preview, setPreview] = useState(null);

//   useEffect(() => {
//     reset(defaultValues);
//   }, [defaultValues, reset]);

//   const handleImageChange = (e) => {
//   const file = e.target.files[0];

//   if (file) {
//     setPreview(URL.createObjectURL(file));

//     // IMPORTANT
//     setValue("image", e.target.files);
//   }
// };

//   const handleClearImage = () => {
//     setPreview(null);
//     reset({ ...defaultValues, image: null });
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3 }}>
//       {/* Header */}
//       <Typography variant="h6" gutterBottom>
//         {defaultValues?._id ? "Update Product" : "Add Product"}
//       </Typography>

//       <Divider sx={{ mb: 3 }} />

//       <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//         <Grid container spacing={2}>
//           {/* Title */}
//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               size="small"
//               label="Title"
//               {...register("title", { required: "Title is required" })}
//               error={!!errors.title}
//               helperText={errors.title?.message}
//             />
//           </Grid>

//           {/* SKU */}
//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               size="small"
//               label="SKU"
//               {...register("sku", { required: "SKU is required" })}
//               error={!!errors.sku}
//               helperText={errors.sku?.message}
//             />
//           </Grid>

//           {/* Stock */}
//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               size="small"
//               type="number"
//               label="Stock"
//               {...register("stock", { required: "Stock is required" })}
//               error={!!errors.stock}
//               helperText={errors.stock?.message}
//             />
//           </Grid>

//           {/* Prices */}
//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               size="small"
//               type="number"
//               label="Original Price"
//               {...register("originalPrice", {
//                 required: "Original price is required",
//               })}
//               error={!!errors.originalPrice}
//               helperText={errors.originalPrice?.message}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               size="small"
//               type="number"
//               label="Selling Price"
//               {...register("sellingPrice", {
//                 required: "Selling price is required",
//               })}
//               error={!!errors.sellingPrice}
//               helperText={errors.sellingPrice?.message}
//             />
//           </Grid>

//           {/* Description - improved */}
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Description"
//               multiline
//               minRows={4}
//               maxRows={6}
//               {...register("description", {
//                 required: "Description is required",
//               })}
//               error={!!errors.description}
//               helperText={errors.description?.message}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: 2,
//                 },
//               }}
//             />
//           </Grid>

//           {/* Image Upload Card */}
//           <Grid item xs={12}>
//             <Box
//               sx={{
//                 border: "1px dashed #bbb",
//                 borderRadius: 2,
//                 p: 2,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 gap: 2,
//               }}
//             >
//               <Button variant="outlined" component="label">
//                 Upload Image
//                 <input
//                   type="file"
//                   accept="image/*"
//                   hidden
//                   {...register("image")}
//                   onChange={handleImageChange}
//                 />
//               </Button>

//               {preview && (
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                   <Box
//                     component="img"
//                     src={preview}
//                     alt="Preview"
//                     sx={{
//                       width: 90,
//                       height: 90,
//                       objectFit: "cover",
//                       borderRadius: 2,
//                       border: "1px solid #ddd",
//                     }}
//                   />
//                   <Button color="error" onClick={handleClearImage}>
//                     Remove
//                   </Button>
//                 </Box>
//               )}
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Bottom Action Bar */}
//         <Box
//           sx={{
//             mt: 4,
//             pt: 2,
//             borderTop: "1px solid #eee",
//             display: "flex",
//             justifyContent: "flex-end",
//             gap: 2,
//           }}
//         >
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={() => navigate("/products")}
//           >
//             Cancel
//           </Button>

//           <Button type="submit" variant="contained" color="success">
//             {defaultValues?._id ? "Update Product" : "Add Product"}
//           </Button>
//         </Box>
//       </form>
//     </Paper>
//   );
// };

// export default ProductForm;


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const navigate = useNavigate();

  const [preview, setPreview] = useState(
    defaultValues?.image || null,
  );

  useEffect(() => {
    reset(defaultValues);

    // show existing image while editing
    if (defaultValues?.image) {
      setPreview(defaultValues.image);
    }
  }, [defaultValues, reset]);

  // image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // preview image
      setPreview(URL.createObjectURL(file));

      // store file in react-hook-form
      setValue("image", e.target.files);
    }
  };

  // remove image
  const handleClearImage = () => {
    setPreview(null);
    setValue("image", null);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h6" gutterBottom>
        {defaultValues?._id ? "Update Product" : "Add Product"}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Title"
              {...register("title", {
                required: "Title is required",
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>

          {/* SKU */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="SKU"
              {...register("sku", {
                required: "SKU is required",
              })}
              error={!!errors.sku}
              helperText={errors.sku?.message}
            />
          </Grid>

          {/* Stock */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Stock"
              {...register("stock", {
                required: "Stock is required",
              })}
              error={!!errors.stock}
              helperText={errors.stock?.message}
            />
          </Grid>

          {/* Original Price */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Original Price"
              {...register("originalPrice", {
                required: "Original price is required",
              })}
              error={!!errors.originalPrice}
              helperText={errors.originalPrice?.message}
            />
          </Grid>

          {/* Selling Price */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Selling Price"
              {...register("sellingPrice", {
                required: "Selling price is required",
              })}
              error={!!errors.sellingPrice}
              helperText={errors.sellingPrice?.message}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              minRows={4}
              maxRows={6}
              {...register("description", {
                required: "Description is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <Box
              sx={{
                border: "1px dashed #bbb",
                borderRadius: 2,
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button variant="outlined" component="label">
                Upload Image

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>

              {preview && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={preview}
                    alt="Preview"
                    sx={{
                      width: 90,
                      height: 90,
                      objectFit: "cover",
                      borderRadius: 2,
                      border: "1px solid #ddd",
                    }}
                  />

                  <Button
                    color="error"
                    variant="outlined"
                    onClick={handleClearImage}
                  >
                    Remove
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Action Bar */}
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/products")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="success"
          >
            {defaultValues?._id
              ? "Update Product"
              : "Add Product"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ProductForm;
