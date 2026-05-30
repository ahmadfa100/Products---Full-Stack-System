import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: { xs: 2, sm: 4 },
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E8E8F0",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Typography variant="body2" sx={{ color: "#5A5A7A", fontWeight: 500 }}>
        © 2026 Ahmad Bani Hamad. Full-stack Developer.
      </Typography>
    </Box>
  );
};

export default Footer;