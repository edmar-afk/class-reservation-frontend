import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import VillaIcon from '@mui/icons-material/Villa';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Sidebar({ user }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Rooms", icon: <VillaIcon />, path: "/profile" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
    { text: "Reservation", icon: <AccessTimeIcon />, path: "/settings" },
  ];

  const drawerContent = (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          ZDSPGC Room Reservation
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              mx: 1.5,
              my: 0.5,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
                transform: "translateX(5px)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }} />

        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            ID: {user?.user?.id || "-"}
          </Typography>
        </Box>

        <ListItemButton
          sx={{
            mt: 2,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
          }}
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* ✅ Mobile AppBar */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: 1300 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap>
              ZDSPGC Room Reservation
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* ✅ Sidebar Drawer */}
      <Box component="nav">
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "linear-gradient(180deg, #0d47a1 0%, #1976d2 100%)",
              color: "#fff",
              boxShadow: "4px 0 20px rgba(0,0,0,0.2)",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* ✅ FIX: pushes content below AppBar on mobile */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: isMobile ? "64px" : 0,
        }}
      >
        {/* Your page content will go here if you wrap layout */}
      </Box>
    </Box>
  );
}

export default Sidebar;
