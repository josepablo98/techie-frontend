// router/PrivateRouter.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsThunk } from "../store/settings/thunks";
import { RootState, AppDispatch } from "../store";
import { Navigate, Route, Routes } from "react-router-dom";
import { ChatPage, SettingsPage } from "../pages";
import { LoadingPage } from "../pages/LoadingPage";

export const PrivateRouter = () => {
  const dispatch: AppDispatch = useDispatch();
  const token = localStorage.getItem("token");
  // Obtenemos el theme desde Redux
  const { theme } = useSelector((state: RootState) => state.settings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      dispatch(getSettingsThunk(token)).then(() => {
        setIsLoading(false);
      });
    } else {
      // Si no hay token, no cargamos nada
      setIsLoading(false);
    }
  }, [dispatch, token]);

  if (isLoading) {
    return <LoadingPage />;
  }

  // Clases globales en base al theme
  const containerClasses =
    theme === "dark"
      ? "min-h-screen bg-gray-900 text-gray-100"
      : "min-h-screen bg-gray-100 text-black";

  return (
    <div className={containerClasses}>
      <Routes>
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/newchat" element={<Navigate to="/chat" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/*" element={<Navigate to="/chat" />} />
      </Routes>
    </div>
  );
};
