import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export const useTheme = () => {
    const context = useContext(ThemeContext)
    // the context is undefined if we use outside the scope of it

    if(context === undefined) {
        throw new Error('useTheme() must be used inisde a ThemeProvider')
    }
    return context
}