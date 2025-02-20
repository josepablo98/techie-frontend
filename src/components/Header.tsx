import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { startLogout } from "../store/auth";
import { AppDispatch, RootState } from "../store";
import { ChatHistoryModal } from "./ChatHistoryModal";
import { checkToken } from "../helpers";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

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
    checkToken(dispatch);
    setIsModalOpen(true);
    handleMenuClose();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNewChat = () => {
    checkToken(dispatch);
    navigate("/chat");
    window.location.reload();
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Texto a la izquierda */}
          <Typography variant="h6" sx={{ ml: -1 }}>
            {`Buenas, ${name}`}
          </Typography>

          {/* Logo TECHIE centrado */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="h6" fontWeight="bold">
              TECHIE
            </Typography>
          </Box>

          {/* Botón de Nuevo Chat y Menú */}
          <Box>
            <Button variant="contained" color="secondary" onClick={handleNewChat}>
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
      </AppBar>
      <ChatHistoryModal open={isModalOpen} onClose={closeModal} />
    </>
  );
};
