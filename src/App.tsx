import { Router } from "./router/Router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkToken } from "./helpers"

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    checkToken(dispatch);
  }, [dispatch])

  return (
    <Router />
  )
}