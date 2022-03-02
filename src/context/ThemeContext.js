import { createContext , useReducer} from "react";

export const ThemeContext = createContext()
/*
ThemeContext
Provider for ThemeContext which provide value of the context to all the children which is App component but since it wraps every other component including page component they can access the context value
*/

// context provider component
// can write custom logic for value which gives more flexibility to  context value
    const themeReducer = (state, action) => {
        switch(action.type) {
            case 'CHANGE_COLOR': 
                return {...state, color: action.payload}
            case 'CHANGE_MODE': 
                return {...state, mode: action.payload}
            default: 
                return state
        }
    }

    export function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#58249c',
        mode: 'dark'
    })

    const changeColor  = (color) => {
        dispatch({type: 'CHANGE_COLOR', payload: color})
    }
    const changeMode = (mode) => {
        dispatch({type: 'CHANGE_MODE', payload: mode})
    }
    return (
        <ThemeContext.Provider value={{...state ,changeColor, changeMode}}> 
            {children}
        </ThemeContext.Provider>
    )
}