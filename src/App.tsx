import { Router } from "./router/Router"
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { setSettings } from "./store/settings";
import { startCheckingToken } from "./store/auth";

export const App = () => {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {

    const storedLanguage = localStorage.getItem("publicLanguage") || "es";

    dispatch(setSettings({ Language: storedLanguage }));

    dispatch(startCheckingToken());
  }, [dispatch]);

  return (
    <Router />
  )
}