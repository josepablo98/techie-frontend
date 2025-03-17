import { createContext } from 'react'
import { ThemeContextType } from '../interfaces'

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => {},
})