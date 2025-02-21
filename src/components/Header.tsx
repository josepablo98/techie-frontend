import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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
import { checkToken, getChatByUserIdAndChatId, getChatsByUserId } from "../helpers";
import { toast } from "react-toastify";
import { Chat } from "../interfaces";

export const Header = () => {

  
  const { chatId } = useParams<{ chatId: string }>();

  const token = localStorage.getItem("token");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tit, setTit] = useState("TECHIE");
  const [chats, setChats] = useState<Chat[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatId && token) {
      getChatByUserIdAndChatId({ token, chatId: Number(chatId) })
        .then((chat) => setTit(chat[0].title))
        .catch((error) => console.error(error))
    }
  }, [chatId])
  

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

  const openModal = async () => {
    checkToken(dispatch);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const chats = await getChatsByUserId({ token });
        if (chats && chats.length > 0) {
          setChats(chats);
          setIsModalOpen(true);
        } else {
          toast.info("No hay chats disponibles");
        }
      } catch (error) {
        console.error("Error cargando chats:", error);
        toast.error("Error cargando chats");
      }
    }
    handleMenuClose();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNewChat = () => {
    navigate("/newchat");
    checkToken(dispatch);
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
              {tit}
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
      <ChatHistoryModal open={isModalOpen} onClose={closeModal} chats={chats} />
    </>
  );
};