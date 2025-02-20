
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

export interface GeminiRequestProps {
    text: string;
    context?: ChatFormProps[];
}

export interface UpdateTitleProps {
    title: string;
    email: string;
    chatId: number;
}

export interface GetChatsProps {
    email: string;
}

export interface GetChatProps {
    email: string;
    chatId: number;
}

export interface ChatHistoryModalProps {
    open: boolean;
    onClose: () => void;
}

export interface Chat {
    id: number;
    title: string;
}