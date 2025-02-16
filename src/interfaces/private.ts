
export interface ChatFormProps {
    message: string;
    index: number;
}

export interface ChatBoxProps {
    context?: ChatFormProps[];
}


export interface MessageComponentProps {
    text: string;
    isBotResponse: boolean;
}

export interface SaveNewChatProps {
    email: string;
    message: string;
}

export interface UpdateChatProps {
    chatId: number;
    email: string;
    message: string;
}