import { ReactNode, createContext, useEffect, useState } from "react";
import { SIMPLES } from "../constants/keyboard_types";

interface KeyboardContextType {
    keyboard: string;
    setKeyboard: (option: string) => void;
}

export const KeyboardContext = createContext<KeyboardContextType>({
    keyboard: SIMPLES,
    setKeyboard: () => {}
});


const KeyboardProvider = ({ children }: { children: ReactNode }) => {
    const [keyboard, setKeyboardState] = useState(() => {
        const savedKeyboard = localStorage.getItem("keyboardType");
        return savedKeyboard ? savedKeyboard : SIMPLES;
    });

    useEffect(() => {
        localStorage.setItem("keyboardType", keyboard);
    }, [keyboard]);

    const setKeyboard = (option: string) => setKeyboardState(option);

    return (
        <KeyboardContext.Provider value={{ keyboard, setKeyboard }}>
            {children}
        </KeyboardContext.Provider>
    );
};

export default KeyboardProvider;