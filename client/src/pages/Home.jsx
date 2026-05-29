import { Container, Typography, Paper } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Home Page
        </Typography>

        <Typography>
          Products will be displayed here from the backend API.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;