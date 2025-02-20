
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
    token: string;
    message: string;
}

export interface UpdateChatProps {
    chatId: number;
    token: string;
    message: string;
}

export interface GeminiRequestProps {
    text: string;
    context?: ChatFormProps[];
}

export interface UpdateTitleProps {
    title: string;
    token: string;
    chatId: number;
}

export interface GetChatsProps {
    token: string;
}

export interface GetChatProps {
    token: string;
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