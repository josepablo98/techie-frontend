import { MessageComponentProps } from "../interfaces"
import { Box, Typography } from "@mui/material";

export const Message = ({ text, isBotResponse } : MessageComponentProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isBotResponse ? 'flex-start' : 'flex-end',
                mb: 2
            }}
        >
            <Box
                sx={{
                    maxWidth: '60%',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: isBotResponse ? 'grey.300' : 'primary.main',
                    color: isBotResponse ? 'black' : 'white',
                }}
            >
                <Typography variant="body1">{text}</Typography>
            </Box>
        </Box>
    );
}
