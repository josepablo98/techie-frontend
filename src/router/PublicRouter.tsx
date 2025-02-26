import { Navigate, Route, Routes } from "react-router-dom"
import { RegisterPage } from "../pages/RegisterPage"
import { LoginPage } from "../pages/LoginPage"
import { RequestPasswordResetPage } from "../pages/RequestPasswordResetPage"
import { ResetPasswordPage } from "../pages/ResetPasswordPage"
import { VerifiedEmailPage } from "../pages/VerifiedEmailPage"

export const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/request-password-reset" element={<RequestPasswordResetPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifiedEmailPage />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  )
}