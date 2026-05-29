import { Container, Typography, Paper } from "@mui/material";

const ManageProducts = () => {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Manage Products
        </Typography>

        <Typography>
          CRUD table and product forms will be built here.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ManageProducts;