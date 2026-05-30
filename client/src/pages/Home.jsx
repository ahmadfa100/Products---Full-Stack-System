import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  Container,
  Typography,
  Skeleton,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import api from "../api/axios";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getFullImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "https://via.placeholder.com/600x400?text=Product+Image";
    }
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
    return `http://localhost:3001${imageUrl}`;
  };

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

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, animation: "fadeInUp 0.4s ease forwards" }}>
          <Skeleton variant="text" width={200} height={48} />
          <Skeleton variant="text" width={320} height={24} />
        </Box>
        <div className="product-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Box key={i} sx={{ border: "1px solid #E8E8F0", borderRadius: "12px", overflow: "hidden", bgcolor: "#fff" }}>
              <Skeleton variant="rectangular" height={200} />
              <Box sx={{ p: 2 }}>
                <Skeleton variant="text" width="70%" height={28} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Skeleton variant="text" width={60} height={28} />
                  <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                </Box>
              </Box>
            </Box>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <div className="page-header">
        <div className="page-header-content">
          <div className="page-icon-box">
            <StorefrontIcon fontSize="medium" />
          </div>
          <div>
            <Typography variant="h4" className="page-title">
              Products
            </Typography>
            <Typography variant="body2" className="page-subtitle">
              Browse all products from the catalogue
            </Typography>
          </div>
        </div>

        {!error && products.length > 0 && (
          <div className="count-badge">
            <span style={{ fontWeight: 800, marginRight: 4 }}>{products.length}</span>
            {products.length === 1 ? "product" : "products"}
          </div>
        )}
      </div>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!error && products.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <Typography variant="h6" sx={{ color: "#1A1A2E", fontWeight: 700, mb: 1 }}>
            No products yet
          </Typography>
          <Typography variant="body2" sx={{ color: "#5A5A7A" }}>
            Products added from the management page will appear here.
          </Typography>
        </div>
      )}

      <div className="product-grid">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="product-card"
            style={{ animation: `fadeInUp 0.4s ease ${index * 0.05}s both` }}
          >
            <div className="product-image-container">
              <img
                src={getFullImageUrl(product.image_url)}
                alt={product.title}
                className="product-image"
              />
              <Chip
                label={product.category}
                size="small"
                className="product-chip"
                color="primary"
              />
            </div>

            <div className="product-content">
              <Typography variant="h6" className="product-title">
                {product.title}
              </Typography>

              <Typography variant="body2" className="product-desc">
                {product.description}
              </Typography>

              <div className="product-footer">
                <span className="product-price">${product.price}</span>
                <span className={`stock-badge ${product.stock > 0 ? "stock-in" : "stock-out"}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;