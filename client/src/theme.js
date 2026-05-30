import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF6A00",
      light: "#FF8C3A",
      dark: "#CC5500",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1A1A2E",
      light: "#2D2D4E",
      dark: "#0D0D1A",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F5F6F8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A2E",
      secondary: "#5A5A7A",
    },
    divider: "#E8E8F0",
    error: {
      main: "#D32F2F",
    },
    success: {
      main: "#2E7D32",
    },
    warning: {
      main: "#FF6A00",
    },
    info: {
      main: "#0277BD",
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F6F8",
      200: "#E8E8F0",
      300: "#D0D0E0",
      400: "#A0A0B8",
      500: "#5A5A7A",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.03em" },
    h2: { fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    "none",
    "0px 1px 4px rgba(0,0,0,0.06)",
    "0px 2px 8px rgba(0,0,0,0.08)",
    "0px 4px 16px rgba(0,0,0,0.08)",
    "0px 6px 20px rgba(0,0,0,0.1)",
    "0px 8px 28px rgba(0,0,0,0.1)",
    "0px 10px 36px rgba(0,0,0,0.1)",
    "0px 12px 40px rgba(0,0,0,0.12)",
    "0px 14px 48px rgba(0,0,0,0.12)",
    "0px 16px 56px rgba(0,0,0,0.12)",
    "0px 18px 64px rgba(0,0,0,0.14)",
    "0px 20px 72px rgba(0,0,0,0.14)",
    "0px 22px 80px rgba(0,0,0,0.14)",
    "0px 24px 88px rgba(0,0,0,0.16)",
    "0px 26px 96px rgba(0,0,0,0.16)",
    "0px 28px 104px rgba(0,0,0,0.16)",
    "0px 30px 112px rgba(0,0,0,0.18)",
    "0px 32px 120px rgba(0,0,0,0.18)",
    "0px 34px 128px rgba(0,0,0,0.18)",
    "0px 36px 136px rgba(0,0,0,0.18)",
    "0px 38px 144px rgba(0,0,0,0.18)",
    "0px 40px 152px rgba(0,0,0,0.18)",
    "0px 42px 160px rgba(0,0,0,0.18)",
    "0px 44px 168px rgba(0,0,0,0.18)",
    "0px 46px 176px rgba(0,0,0,0.18)",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F5F6F8",
          color: "#1A1A2E",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "9px 22px",
          fontSize: "0.875rem",
          fontWeight: 600,
          transition: "all 0.2s ease",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0px)",
          },
        },
        contained: {
          backgroundColor: "#FF6A00",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#E55F00",
          },
          "&:disabled": {
            backgroundColor: "#FFB380",
            color: "#fff",
          },
        },
        outlined: {
          borderColor: "#D0D0E0",
          color: "#1A1A2E",
          "&:hover": {
            borderColor: "#FF6A00",
            backgroundColor: "#FFF5EE",
            color: "#FF6A00",
          },
        },
        text: {
          color: "#FF6A00",
          "&:hover": {
            backgroundColor: "#FFF5EE",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            fontSize: "0.9rem",
            "& fieldset": {
              borderColor: "#D0D0E0",
              transition: "border-color 0.2s ease",
            },
            "&:hover fieldset": {
              borderColor: "#A0A0B8",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF6A00",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: "0.875rem",
            color: "#5A5A7A",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#FF6A00",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          border: "1px solid #E8E8F0",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 32px rgba(255,106,0,0.15)",
            borderColor: "#FFD0AA",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
          fontSize: "0.72rem",
        },
        colorPrimary: {
          backgroundColor: "#FFF0E6",
          color: "#CC5500",
          border: "1px solid #FFD0AA",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#1A1A2E",
          borderBottom: "1px solid #E8E8F0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E8E8F0",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: "#FAFAFA",
            color: "#5A5A7A",
            fontWeight: 700,
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            borderBottom: "1px solid #E8E8F0",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 0.15s ease",
          "&:hover": {
            backgroundColor: "#FFF8F4 !important",
          },
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #F0F0F8",
          color: "#1A1A2E",
          fontSize: "0.875rem",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          border: "1px solid #E8E8F0",
          boxShadow: "0 24px 64px rgba(0,0,0,0.14)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: "1.15rem",
          color: "#1A1A2E",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: "0.875rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "all 0.2s ease",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "2px 8px",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#FFF5EE",
          },
          "&.Mui-selected": {
            backgroundColor: "#FFF0E6",
            color: "#FF6A00",
            "&:hover": {
              backgroundColor: "#FFE8D9",
            },
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#FF6A00",
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "#F0F0F8",
        },
      },
    },
  },
});

export default theme;
