import { ReactNode, createContext, useState, useEffect } from "react";

// Definindo a interface do contexto
interface UserContextType {
    username: string;
    setUsername: (name: string) => void;
}

// Criando o contexto com um valor padrão
export const UserContext = createContext<UserContextType>({
    username: "",
    setUsername: () => {}
});

// Criando o provedor do contexto
const UserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsernameState] = useState(() => {
        const savedUsername = localStorage.getItem("username");
        return savedUsername ? savedUsername : "";
    });

    useEffect(() => {
        localStorage.setItem("username", username);
    }, [username]);

    const setUsername = (name: string) => setUsernameState(name);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
