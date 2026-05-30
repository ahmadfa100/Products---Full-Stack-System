import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Chip,
  Tooltip,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import api from "../api/axios";
import "./ManageProducts.css";
import "./Home.css"; // Reuse header styles

const initialFormData = {
  title: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  image: null,
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/products");
      setProducts(response.data.data);
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch products.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateDialog = () => {
    setEditingProduct(null);
    setFormData(initialFormData);
    setFormError("");
    setFormOpen(true);
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "",
      stock: product.stock || "",
      image: null,
    });
    setFormError("");
    setFormOpen(true);
  };

  const closeFormDialog = () => {
    setFormOpen(false);
    setEditingProduct(null);
    setFormData(initialFormData);
    setFormError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.category
    ) {
      setFormError("Title, description, price, and category are required.");
      return false;
    }
    if (Number(formData.price) <= 0) {
      setFormError("Price must be greater than 0.");
      return false;
    }
    if (formData.stock !== "" && Number(formData.stock) < 0) {
      setFormError("Stock cannot be negative.");
      return false;
    }
    setFormError("");
    return true;
  };

  const buildProductFormData = () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock || 0);
    if (formData.image) {
      data.append("image", formData.image);
    }
    if (editingProduct?.image_url) {
      data.append("old_image_url", editingProduct.image_url);
    }
    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setFormLoading(true);
      setFormError("");
      const productFormData = buildProductFormData();

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/products", productFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      closeFormDialog();
      fetchProducts();
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to save product.";
      setFormError(message);
    } finally {
      setFormLoading(false);
    }
  };

  const openDeleteDialog = (product) => {
    setDeleteTarget(product);
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteTarget(null);
    setDeleteOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/products/${deleteTarget.id}`);
      closeDeleteDialog();
      fetchProducts();
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to delete product.";
      setError(message);
    }
  };

  const getFullImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "https://via.placeholder.com/80?text=Product";
    }
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
    return `http://localhost:3001${imageUrl}`;
  };

  if (loading) {
    return (
      <Box>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", animation: "fadeInUp 0.4s ease forwards" }}>
          <Box>
            <Skeleton variant="text" width={220} height={48} />
            <Skeleton variant="text" width={260} height={24} />
          </Box>
          <Skeleton variant="rectangular" width={140} height={40} sx={{ borderRadius: 1 }} />
        </Box>
        <div className="table-container">
          {[1, 2, 3, 4].map((i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, borderBottom: "1px solid #F0F0F8" }}>
              <Skeleton variant="rectangular" width={48} height={48} sx={{ borderRadius: 1 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="60%" />
              </Box>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
          ))}
        </div>
      </Box>
    );
  }

  return (
    <Box>
      <div className="page-header">
        <div className="page-header-content">
          <div className="page-icon-box">
            <InventoryIcon fontSize="medium" />
          </div>
          <div>
            <Typography variant="h4" className="page-title">
              Manage Products
            </Typography>
            <Typography variant="body2" className="page-subtitle">
              Create, update, and delete your products
            </Typography>
          </div>
        </div>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreateDialog}
          sx={{ whiteSpace: "nowrap" }}
        >
          Add Product
        </Button>
      </div>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <div className="table-container">
        <Table sx={{ minWidth: { xs: 600, md: "auto" } }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Stock</TableCell>
              <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>Description</TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <div className="empty-state" style={{ padding: "40px 20px" }}>
                    <div className="empty-icon">📦</div>
                    <Typography variant="body1" sx={{ color: "#1A1A2E", fontWeight: 600 }}>
                      No products yet
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#5A5A7A", mt: 0.5 }}>
                      Click "Add Product" to create your first one.
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{ animation: `fadeInUp 0.3s ease ${index * 0.05}s both` }}
                >
                  <TableCell sx={{ pl: 3 }}>
                    <Avatar
                      src={getFullImageUrl(product.image_url)}
                      alt={product.title}
                      variant="rounded"
                      className="product-avatar"
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" className="title-cell">
                      {product.title}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    <Chip label={product.category} size="small" color="primary" />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" className="price-cell">
                      ${product.price}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    <span className={`stock-badge ${product.stock > 0 ? "stock-in" : "stock-out"}`}>
                      {product.stock}
                    </span>
                  </TableCell>

                  <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                    <Typography variant="body2" className="desc-cell">
                      {product.description}
                    </Typography>
                  </TableCell>

                  <TableCell align="right" sx={{ pr: 2 }}>
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                      <Tooltip title="Edit product" placement="top">
                        <IconButton
                          size="small"
                          onClick={() => openEditDialog(product)}
                          className="action-btn-edit"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete product" placement="top">
                        <IconButton
                          size="small"
                          onClick={() => openDeleteDialog(product)}
                          className="action-btn-delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={formOpen}
        onClose={closeFormDialog}
        fullWidth
        maxWidth="sm"
        classes={{ paper: "dialog-paper" }}
      >
        <DialogTitle className="dialog-header">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </DialogTitle>

        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent className="dialog-content">
            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
            />

            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon sx={{ color: "#A0A0B8", fontSize: "1.1rem" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                margin="normal"
              />
            </Box>

            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              margin="normal"
            />

            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                className={`upload-btn ${formData.image ? "upload-btn-active" : ""}`}
              >
                {formData.image ? `✓ ${formData.image.name}` : "Upload Product Image"}
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>

              {editingProduct?.image_url && !formData.image && (
                <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#5A5A7A", textAlign: "center" }}>
                  Current image will be kept if no new image is selected.
                </Typography>
              )}
            </Box>
          </DialogContent>

          <DialogActions className="dialog-actions">
            <Button onClick={closeFormDialog} disabled={formLoading} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={formLoading}>
              {formLoading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : (editingProduct ? "Update" : "Create")}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onClose={closeDeleteDialog}
        maxWidth="xs"
        fullWidth
        classes={{ paper: "dialog-paper" }}
      >
        <Box sx={{ textAlign: "center", pt: 4, px: 3 }}>
          <div className="delete-icon-wrapper">
            <DeleteIcon fontSize="inherit" />
          </div>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 700, color: "#1A1A2E" }}>
            Delete Product
          </Typography>
          <Typography variant="body2" sx={{ color: "#5A5A7A", mt: 1 }}>
            Are you sure you want to delete <span style={{ fontWeight: 600, color: "#1A1A2E" }}>"{deleteTarget?.title}"</span>? This action cannot be undone.
          </Typography>
        </Box>

        <DialogActions className="dialog-actions" sx={{ mt: 2, justifyContent: "center" }}>
          <Button onClick={closeDeleteDialog} variant="outlined" color="inherit" fullWidth>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error" fullWidth>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageProducts;