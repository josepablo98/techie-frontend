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
    const [messages, setMessages] = useState<ChatFormProps[]>(context || []);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const { formState, handleInputChange, handleSubmit } = useForm(
        initialState,
    );

    useEffect(() => {
        if (context.length > 0) {
            formState.index = context[context.length - 1].index;
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSubmit = async () => {
        if (formState.message === "") return;
        setIsLoading(true);

        // Mensaje del usuario
        const newMessage = { message: formState.message, index: messages.length };
        setMessages([...messages, newMessage]);

        formState.message = "";

        if (newMessage.index === 0 && email) {
            const data = await saveNewChat({ email, message: newMessage.message });
            if (data && data.chatId) {
                window.history.pushState(null, "", `/chat/${data.chatId}`);
            }
        } else if (email) {
            await updateChat({ chatId: Number(window.location.pathname.split("/")[2]), email, message: newMessage.message });
        }
        context = [...messages, newMessage];
        let response;
        if (newMessage.index === 0) {
            response = await fetchGeminiApi({ text: newMessage.message });
        } else {
            response = await fetchGeminiApi({ text: newMessage.message, context });
        }
        const chatTitle = response.response.split("//")[0].trim();
        const chatMessage = response.response.split("//").slice(1).join(" ").trim();
        context = [...messages, { message: chatMessage, index: messages.length + 1 }];

        // Si es el primer mensaje, actualizar el título del chat
        if (newMessage.index === 0 && email) {
            await updateTitle({ chatId: Number(window.location.pathname.split("/")[2]), email, title: chatTitle });
        }

        if (email) {
            await updateChat({ chatId: Number(window.location.pathname.split("/")[2]), email, message: chatMessage });
        }

        // Mensaje de la IA
        setMessages((prevMessages) => [
            ...prevMessages,
            { message: chatMessage, index: messages.length + 1 }, // La IA responde con el siguiente índice
        ]);

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
                    <Message
                        key={index}
                        text={message.message}
                        isBotResponse={index % 2 !== 0}
                    />
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
                        "& .MuiInputBase-root": {
                            height: "40px",
                        },
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