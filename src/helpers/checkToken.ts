import { AppDispatch } from "../store"
import { login, logout } from "../store/auth"


export const checkToken = async (dispatch : AppDispatch) => {
  const token = localStorage.getItem("token")
  if (!token) {
    dispatch(logout({ message: "No token" }))
  } else {
    try {
      const resp = await fetch('http://localhost:8080/auth/renew', {
        method: 'GET',
        headers: {
          'x-token': token
        }
      })
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }
      const data = await resp.json()
      localStorage.setItem('token', data.token)
      dispatch(login(data))
    } catch (error) {
      localStorage.removeItem('token')
      dispatch(logout({ message: "Invalid token" }))
    }
  }
}