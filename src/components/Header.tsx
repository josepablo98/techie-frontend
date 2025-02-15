import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { startLogout } from "../store/auth";
import { AppDispatch, RootState } from "../store";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { name } = useSelector((state : RootState) => state.auth);
  

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(startLogout());
    handleMenuClose();
  };

  const openModal = () => {
    setIsModalOpen(true);
    handleMenuClose();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Texto a la izquierda */}
        <Typography variant="h6" sx={{ ml: -1 }}>{`Buenas, ${name}`}</Typography>

        {/* Logo TECHIE centrado */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" fontWeight="bold">
            TECHIE
          </Typography>
        </Box>

        {/* Botón de Nuevo Chat y Menú */}
        <Box>
          <Button variant="contained" color="secondary">
            Nuevo Chat
          </Button>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem component={NavLink} to="/account" onClick={handleMenuClose}>
              Información de cuenta
            </MenuItem>
            <MenuItem component={NavLink} to="/settings" onClick={handleMenuClose}>
              Configuración
            </MenuItem>
            <MenuItem onClick={openModal}>Historial de chats</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {/* Modal Historial de Chats */}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Historial de Chats</DialogTitle>
        <List>
          {["Chat 1", "Chat 2", "Chat 3", "Chat 4", "Chat 5"].map((chat, index) => (
            <ListItem key={index}>
              <ListItemButton>{chat}</ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button onClick={closeModal} variant="contained" sx={{ margin: 2 }}>
          Cerrar
        </Button>
      </Dialog>
    </AppBar>
  );
};
