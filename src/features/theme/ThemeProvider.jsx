import { useEffect } from 'react'
import { useAppSelector } from '@/app/hooks'
import { selectTheme } from './themeSlice'
import { THEME } from '@/utils/constants'

const ThemeProvider = ({ children }) => {
  const mode = useAppSelector(selectTheme)

  useEffect(() => {
    const root = document.documentElement
    if (mode === THEME.DARK) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [mode])

  return children
}

export default ThemeProvider
