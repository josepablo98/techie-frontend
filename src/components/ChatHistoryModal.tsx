// ChatHistoryModal.tsx
import { useEffect, useState } from "react";
import { Dialog, List, ListItem, ListItemButton, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getChatsByUserId } from "../helpers";
import { Chat, ChatHistoryModalProps } from "../interfaces";



export const ChatHistoryModal = ({ open, onClose }: ChatHistoryModalProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const navigate = useNavigate();
  const { email } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (open && email) {
      getChatsByUserId({ email })
        .then((data) => {
          if (data) setChats(data);
        })
        .catch((error) => console.error("Error obteniendo chats:", error));
    }
  }, [open, email]);

  const handleChatClick = (chatId: number) => {
    onClose();
    navigate(`/chat/${chatId}`);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Historial de Chats</DialogTitle>
      <List>
        {chats.map((chat) => (
          <ListItem key={chat.id} disablePadding>
            <ListItemButton onClick={() => handleChatClick(chat.id)}>
              {chat.title}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

