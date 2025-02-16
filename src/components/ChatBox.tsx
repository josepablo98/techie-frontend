import { IconButton, Paper, TextField, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "../hooks";
import { ChatBoxProps, ChatFormProps } from "../interfaces";
import { useEffect, useState, useRef } from "react";
import { Message } from "./Message";
import { validateChat } from "../validators";
import { saveNewChat, updateChat } from "../helpers"
import { useSelector } from "react-redux";
import { RootState } from "../store";

const initialState: ChatFormProps = {
    message: "",
    index: -1,
};

export const ChatBox = ({ context }: ChatBoxProps) => {
    const { email } = useSelector((state: RootState) => state.auth);
    const [messages, setMessages] = useState<ChatFormProps[]>(context || []);
    const messagesEndRef = useRef<HTMLDivElement | null>(null); // 🔹 Referencia para el último mensaje
    const { formState, errors, handleInputChange, handleSubmit } = useForm(
        initialState,
        validateChat
    );

    useEffect(() => {
        if (context) {
            setMessages(context);
            formState.index = context[context.length - 1].index; // Actualiza formState.index
        }
    }, [context]);

    useEffect(() => {
        // 🔹 Hace scroll al final cuando hay nuevos mensajes
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSubmit = async () => {
        const newMessage = { message: formState.message, index: formState.index + 1 };
        if (newMessage.index === 0 && email) {
            const data = await saveNewChat({ email, message: newMessage.message });
            if (data && data.chatId) {
                window.history.pushState(null, "", `/chat/${data.chatId}`);
            }
        } else if (email) {
            await updateChat({ chatId: Number(window.location.pathname.split("/")[2]), email, message: newMessage.message });
        } 
        setMessages([...messages, newMessage]);
        formState.message = "";
        formState.index = newMessage.index;
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
            {/* Contenedor de mensajes con scroll interno */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "10px",
                    scrollbarWidth: "thin",
                }}
            >
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        text={message.message}
                        isBotResponse={message.index % 2 !== 0}
                    />
                ))}
                {/* 🔹 Div invisible que hará scroll al final */}
                <div ref={messagesEndRef} />
            </Box>

            {/* Input del chat */}
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
                    error={!!errors.message}
                    helperText={errors.message}
                    sx={{
                        marginRight: "8px",
                        "& .MuiInputBase-root": {
                            height: "40px",
                        },
                    }}
                />
                <IconButton type="submit" color="primary" sx={{ width: "40px", height: "40px" }}>
                    <SendIcon fontSize="small" />
                </IconButton>
            </Paper>
        </Box>
    );
};