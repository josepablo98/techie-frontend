import { Router } from "./router/Router"
import { useEffect } from "react"
import { checkToken } from "./helpers"
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { setSettings } from "./store/settings";

export const App = () => {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {

    const storedLanguage = localStorage.getItem("publicLanguage") || "es";

    dispatch(setSettings({ Language: storedLanguage }));

    checkToken({ dispatch });
  }, [dispatch])

  return (
    <Router />
  )
}