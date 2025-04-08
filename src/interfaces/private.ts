import { AppDispatch } from "../store";

// Interfaces auxiliares internas para evitar duplicación

// Para todas las interfaces que incluyen la propiedad "language"
interface LanguageProps {
  language: string;
}

// Para aquellas interfaces que requieren tanto "chatId" como "language"
interface ChatActionProps extends LanguageProps {
  chatId: number;
}

// Para las interfaces que incluyen "language" y "detailLevel"
interface DetailedLanguageProps extends LanguageProps {
  detailLevel: string;
}

// Para las interfaces de actualización de settings (comparten language, theme, detailLevel y autoSaveChats)
interface BaseUpdateSettings {
  language: string;
  theme?: string;
  detailLevel?: string;
  autoSaveChats?: number;
}

// Para las interfaces de formulario de settings (comparten exactamente los mismos campos)
interface BaseSettingsForm {
  theme: string;
  language: string;
  detailLevel: string;
  tempChats: boolean;
}

// Interfaces exportadas (sin modificar su API externa)

export interface DeleteAccountProps extends LanguageProps {}

export interface ChatFormProps {
  message: string;
  index: number;
}

export interface CheckTokenProps {
  dispatch: AppDispatch;
}

export interface ChatBoxProps {
  context?: ChatFormProps[];
}

export interface MessageComponentProps {
  text: string;
  isBotResponse: boolean;
}

export interface SaveNewChatProps extends LanguageProps {
  message: string;
}

export interface UpdateChatProps extends ChatActionProps {
  message: string;
}

export interface GeminiRequestProps extends DetailedLanguageProps {
  text: string;
  context?: ChatFormProps[];
}

export interface UpdateTitleProps extends ChatActionProps {
  title: string;
}

export interface GetChatProps extends ChatActionProps {}

export interface DeleteChatProps extends ChatActionProps {}

export interface DeleteAllChatsProps extends LanguageProps {}

export interface GetChatsByUserIdProps extends LanguageProps {}

export interface ChatHistoryModalProps {
  open: boolean;
  onClose: () => void;
  chats: Chat[];
}

export interface Chat {
  id: number;
  title: string;
}

export interface GetSettingsProps extends LanguageProps {}

export interface GetSettingsThunkProps extends LanguageProps {}

export interface UpdateSettingsProps extends BaseUpdateSettings {}

export interface UpdateSettingsThunkProps extends BaseUpdateSettings {}

export interface SettingsFormProps extends BaseSettingsForm {}

export interface SettingsForm extends BaseSettingsForm {}

export interface SettingsFormStore extends BaseSettingsForm {}
