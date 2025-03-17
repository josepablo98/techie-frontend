import { ThemeProvider } from "../context";
import { Navigate, Route, Routes } from "react-router-dom";
import { ChatPage, SettingsPage } from "../pages";

export const PrivateRouter = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/newchat" element={<Navigate to="/chat" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/*" element={<Navigate to="/chat" />} />
      </Routes>
    </ThemeProvider>
  );
};
