import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { AppDispatch } from "../store";
import { logout } from "../store/auth";

export const PrivateRouter = () => {

  const dispatch : AppDispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout({}));
    localStorage.clear();
  }

  return (
    <>
      <div>PrivateRouter</div>
      <button onClick={() => onLogout()}>Logout</button>
    </>
  )
}