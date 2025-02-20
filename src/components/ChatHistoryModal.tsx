// ChatHistoryModal.tsx
import { useEffect, useState } from "react";
import { Dialog, List, ListItem, ListItemButton, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkToken, getChatsByUserId } from "../helpers";
import { Chat, ChatHistoryModalProps } from "../interfaces";
import { useDispatch } from "react-redux";



export const ChatHistoryModal = ({ open, onClose }: ChatHistoryModalProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && token) {
      getChatsByUserId({ token })
        .then((data) => {
          if (data) setChats(data);
          else setChats([]);
        })
        .catch((error) => {
          console.error("Error cargando chats:", error);
        }
      );
    }
  }, [open, token]);

  const handleChatClick = (chatId: number) => {
    onClose();
    checkToken(dispatch);
    navigate(`/chat/${chatId}`);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Historial de Chats</DialogTitle>
      <List>
        {
          chats.length > 0
          ? chats.map((chat) => (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton onClick={() => handleChatClick(chat.id)}>
                {chat.title}
              </ListItemButton>
            </ListItem>
          ))
          :
          <ListItem disablePadding>
            <ListItemButton>No hay chats</ListItemButton>
          </ListItem>
        }
      </List>
    </Dialog>
  );
};

