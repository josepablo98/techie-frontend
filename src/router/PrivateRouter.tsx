import { useDispatch } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { AppDispatch } from "../store";
import { logout } from "../store/auth";
import { ChatPage } from "../pages/ChatPage";

export const PrivateRouter = () => {

  const dispatch : AppDispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout({}));
    localStorage.clear();
  }

  return (
    <Routes>
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/*" element={<Navigate to="/chat" />} />
    </Routes>
  )
}