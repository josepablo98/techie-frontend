import { Navigate, Route, Routes } from "react-router-dom"
import { ChatPage } from "../pages/ChatPage";

export const PrivateRouter = () => {

  return (
    <Routes>
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/*" element={<Navigate to="/chat" />} />
    </Routes>
  )
}