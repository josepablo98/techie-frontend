import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage, RequestPasswordResetPage, ResetPasswordPage, VerifiedEmailPage } from "../pages"

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