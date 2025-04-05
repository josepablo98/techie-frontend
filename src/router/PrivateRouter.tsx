import { useEffect, useState, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsThunk } from "../store/settings/thunks";
import { RootState, AppDispatch } from "../store";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoadingPage } from "../pages/LoadingPage";
import { ChatPage } from "../pages";

const SettingsPage = lazy(() => import(/* webpackChunkName: "SettingsPage" */ "../pages/SettingsPage"));
const AboutPage = lazy(() => import(/* webpackChunkName: "AboutPage" */ "../pages/AboutPage"));
const ContactPage = lazy(() => import(/* webpackChunkName: "ContactPage" */ "../pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import(/* webpackChunkName: "PrivacyPolicyPage" */ "../pages/PrivacyPolicyPage"));
const AccountInformationPage = lazy(() => import(/* webpackChunkName: "AccountInformationPage" */ "../pages/AccountInformationPage"));

export const PrivateRouter = () => {
  const dispatch: AppDispatch = useDispatch();
  const { theme, language } = useSelector((state: RootState) => state.settings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getSettingsThunk({ language })).finally(() => {
      setIsLoading(false);
    })

  }, [dispatch]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const containerClasses =
    theme === "dark"
      ? "min-h-screen bg-gray-900 text-gray-100"
      : "min-h-screen bg-gray-100 text-black";

  return (
    <div className={containerClasses}>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/chat/:chatId" element={<ChatPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/newchat" element={<Navigate to="/chat" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/account" element={<AccountInformationPage />} />
          <Route path="/*" element={<Navigate to="/chat" />} />
        </Routes>
      </Suspense>
    </div>
  );
};