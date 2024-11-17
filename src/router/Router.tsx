import { Navigate, Route, Routes } from "react-router-dom"
import { PrivateRouter } from "./PrivateRouter"
import { PublicRouter } from "./PublicRouter"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { status as st } from "../helpers"

export const Router = () => {
  const { status } = useSelector((state : RootState) => state.auth);
  return (
    <Routes>
      {
        status === st.AUTHENTICATED
          ?
          <>
            <Route path="/home/*" element={<PrivateRouter />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
          :
          <>
            <Route path="/*" element={<PublicRouter />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
      }
    </Routes>
  )
}