import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { toggleTheme, selectTheme } from '@/features/theme/themeSlice'
import { THEME } from '@/utils/constants'

const useTheme = () => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector(selectTheme)

  return {
    mode,
    isDark: mode === THEME.DARK,
    toggle: () => dispatch(toggleTheme()),
  }
}

export default useTheme
