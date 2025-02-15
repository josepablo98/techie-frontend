import { IconButton, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "../hooks";
import { validateChat } from "../validators";
import { ChatFormProps } from "../interfaces";

const initialState : ChatFormProps = {
    message: ""
}


export const ChatBox = () => {

    const { formState, errors, handleInputChange, handleSubmit, message } =
        useForm(initialState, validateChat);
    
      const onSubmit = () => {
        console.log("Mensaje enviado:", message);
        formState.message = "";
      };
    return (
        <Paper
            component="form"
            onSubmit={(e) => handleSubmit(e, onSubmit)}
            sx={{
                position: "fixed",
                bottom: "69px",
                left: 0,
                width: "100vw",
                display: "flex",
                alignItems: "center",
                padding: "6px 10px",
                borderRadius: 0,
                boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                height: "72px", // 🔹 Altura fija para evitar que se expanda
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
                    "& .MuiFormHelperText-root": {
                        position: "absolute", // 🔹 Evita que el helperText empuje el botón
                        bottom: "-20px", // 🔹 Lo coloca justo debajo sin cambiar la altura del Paper
                    },
                }}
            />
            <IconButton
                type="submit"
                color="primary"
                sx={{
                    width: "40px",
                    height: "40px",
                    marginBottom: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <SendIcon fontSize="small" />
            </IconButton>
        </Paper>

    );
};
