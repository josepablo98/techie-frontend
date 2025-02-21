import { Dialog, List, ListItem, ListItemButton, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../helpers";
import { ChatHistoryModalProps } from "../interfaces";
import { useDispatch } from "react-redux";

export const ChatHistoryModal = ({ open, onClose, chats }: ChatHistoryModalProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChatClick = (chatId: number) => {
    onClose();
    checkToken(dispatch);
    navigate(`/chat/${chatId}`);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Historial de Chats</DialogTitle>
      <List>
        {chats.length > 0 && chats.map((chat) => (
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