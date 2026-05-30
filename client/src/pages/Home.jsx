import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import api from "../api/axios";

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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Products
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Browse products fetched from the backend API.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!error && products.length === 0 && (
        <Alert severity="info">No products found.</Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              height="190"
              image={getFullImageUrl(product.image_url)}
              alt={product.title}
              sx={{ objectFit: "cover" }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {product.title}
                </Typography>

                <Chip label={product.category} size="small" color="primary" />
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {product.description}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                ${product.price}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Stock: {product.stock}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Home;