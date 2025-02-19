import { MessageComponentProps } from "../interfaces";

export const Message = ({ text, isBotResponse }: MessageComponentProps) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: isBotResponse ? "flex-start" : "flex-end",
                margin: "10px 0",
            }}
        >
            <div
                style={{
                    backgroundColor: isBotResponse ? "#f1f0f0" : "#007bff",
                    color: isBotResponse ? "#000" : "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "60%",
                }}
            >
                {text}
            </div>
        </div>
    );
};