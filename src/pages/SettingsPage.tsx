import { useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  MenuItem,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getChatsByUserId, deleteChat, checkToken } from "../helpers";
import { useDispatch } from "react-redux";
import { Chat } from "../interfaces";

export const SettingsPage = () => {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("es");
  const [detailLevel, setDetailLevel] = useState("simplified");
  const [tempChats, setTempChats] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    checkToken(dispatch);
    const token = localStorage.getItem("token");
    if (token) {
      getChatsByUserId({ token })
        .then(setChats)
        .catch(console.error);
    }
  }, [dispatch]);

  const handleDeleteChat = async (chatId: number) => {
    const token = localStorage.getItem("token");
    if (token) {
      await deleteChat({ token, chatId });
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh", // Para evitar que se corte el contenido
        p: 4, // Espaciado en el contenedor principal
        backgroundColor: "#f5f5f5", // Color de fondo suave
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600, // Ancho máximo de la tarjeta
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Configuración
        </Typography>

        {/* Campo: Tema */}
        <TextField
          select
          label="Tema"
          variant="outlined"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="light">Claro</MenuItem>
          <MenuItem value="dark">Oscuro</MenuItem>
        </TextField>

        {/* Campo: Idioma */}
        <TextField
          select
          label="Idioma"
          variant="outlined"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="es">Español</MenuItem>
          <MenuItem value="en">Inglés</MenuItem>
        </TextField>

        {/* Campo: Nivel de detalle */}
        <TextField
          select
          label="Nivel de detalle"
          variant="outlined"
          value={detailLevel}
          onChange={(e) => setDetailLevel(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="simplified">Simplificado</MenuItem>
          <MenuItem value="detailed">Extenso</MenuItem>
        </TextField>

        {/* Chats temporales */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          my={2}
        >
          <Typography>Chats temporales</Typography>
          <Switch
            checked={tempChats}
            onChange={(e) => setTempChats(e.target.checked)}
          />
        </Box>

        {/* Accordion para Eliminar Chats */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-chats-content"
            id="panel-chats-header"
          >
            <Typography variant="h6">Eliminar Chats</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {chats.map((chat) => (
                <ListItem key={chat.id}>
                  <ListItemText primary={chat.title} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteChat(chat.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  );
};
