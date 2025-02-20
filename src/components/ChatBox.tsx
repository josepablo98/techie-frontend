import { IconButton, Paper, TextField, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "../hooks";
import { ChatBoxProps, ChatFormProps } from "../interfaces";
import { useEffect, useState, useRef } from "react";
import { Message } from "./Message";
import { fetchGeminiApi, saveNewChat, updateChat, updateTitle } from "../helpers";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const initialState: ChatFormProps = {
  message: "",
  index: -1,
};

export const ChatBox = ({ context = [] }: ChatBoxProps) => {
  const { email } = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = useState<ChatFormProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { formState, handleInputChange, handleSubmit } = useForm(initialState);

  // Solo al cargar, si aún no hay mensajes, inicializamos desde context.
  useEffect(() => {
  console.log("ChatBox useEffect: context =", context, "messages length =", messages.length);

  // Si context cambia y tiene mensajes nuevos, actualizamos messages
  if (context.length > 0) {
    console.log("ChatBox: Actualizando mensajes con context");
    setMessages(context);
    formState.index = context[context.length - 1].index;
    console.log("ChatBox: formState.index =", formState.index);
  }
}, [context]); // ← Ahora depende de `context`, se ejecutará siempre que cambie


  useEffect(() => {
    console.log("ChatBox: messages actualizados =", messages);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async () => {
    if (formState.message === "") return;
    console.log("ChatBox onSubmit: mensaje enviado =", formState.message);
    setIsLoading(true);

    // Crear el mensaje del usuario
    const newMessage: ChatFormProps = {
      message: formState.message,
      index: messages.length,
    };
    const newMessages = [...messages, newMessage];
    console.log("ChatBox onSubmit: newMessages =", newMessages);
    setMessages(newMessages);
    formState.message = "";

    if (newMessage.index === 0 && email) {
      const data = await saveNewChat({ email, message: newMessage.message });
      console.log("ChatBox: saveNewChat devuelve =", data);
      if (data && data.chatId) {
        window.history.pushState(null, "", `/chat/${data.chatId}`);
      }
    } else if (email) {
      await updateChat({
        chatId: Number(window.location.pathname.split("/")[2]),
        email,
        message: newMessage.message,
      });
    }

    let response;
    if (newMessage.index === 0) {
      response = await fetchGeminiApi({ text: newMessage.message });
    } else {
      response = await fetchGeminiApi({ text: newMessage.message, context: newMessages });
    }
    console.log("ChatBox: fetchGeminiApi response =", response);
    const chatTitle = response.response.split("//")[0].trim();
    const chatMessage = response.response.split("//").slice(1).join(" ").trim();
    const aiMessage: ChatFormProps = {
      message: chatMessage,
      index: newMessages.length,
    };

    if (newMessage.index === 0 && email) {
      await updateTitle({
        chatId: Number(window.location.pathname.split("/")[2]),
        email,
        title: chatTitle,
      });
    }
    if (email) {
      await updateChat({
        chatId: Number(window.location.pathname.split("/")[2]),
        email,
        message: chatMessage,
      });
    }

    const finalMessages = [...newMessages, aiMessage];
    console.log("ChatBox: finalMessages =", finalMessages);
    setMessages(finalMessages);
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          scrollbarWidth: "thin",
        }}
      >
        {messages.map((message, index) => (
          <Message key={index} text={message.message} isBotResponse={index % 2 !== 0} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Paper
        component="form"
        onSubmit={(e) => handleSubmit(e, onSubmit)}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "6px 10px",
          boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          height: "55px",
        }}
      >
        <TextField
          fullWidth
          name="message"
          variant="outlined"
          size="small"
          placeholder="Escribe un mensaje..."
          value={formState.message}
          onChange={handleInputChange}
          sx={{
            marginRight: "8px",
            "& .MuiInputBase-root": { height: "40px" },
          }}
          disabled={isLoading}
        />
        <IconButton type="submit" color="primary" sx={{ width: "40px", height: "40px" }} disabled={isLoading}>
          <SendIcon fontSize="small" />
        </IconButton>
      </Paper>
    </Box>
  );
};
