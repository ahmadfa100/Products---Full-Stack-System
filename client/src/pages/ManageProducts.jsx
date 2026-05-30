import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/axios";

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

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });
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

    if (!validateForm()) {
      return;
    }

    try {
      setFormLoading(true);
      setFormError("");

      const productFormData = buildProductFormData();

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/products", productFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
    if (!deleteTarget) {
      return;
    }

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
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Manage Products
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Create, update, and delete products.
          </Typography>
        </Box>

        <Button variant="contained" onClick={openCreateDialog}>
          Add Product
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Avatar
                      src={getFullImageUrl(product.image_url)}
                      alt={product.title}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>

                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>

                  <TableCell sx={{ maxWidth: 260 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.description}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => openEditDialog(product)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => openDeleteDialog(product)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={formOpen} onClose={closeFormDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>

        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
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

            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              margin="normal"
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

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              {formData.image ? formData.image.name : "Upload Product Image"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {editingProduct?.image_url && !formData.image && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Current image will be kept if no new image is selected.
              </Typography>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={closeFormDialog} disabled={formLoading}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={formLoading}>
              {formLoading ? (
                <CircularProgress size={22} />
              ) : editingProduct ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={deleteOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Product</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{deleteTarget?.title}</strong>?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>

          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageProducts;