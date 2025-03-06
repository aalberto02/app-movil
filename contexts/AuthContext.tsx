import { createContext, isValidElement, useContext, useState } from "react"

const defaultReminders = [
    { id: '1', titulo: "Ir por pan", descripcion: "Hay que ir por pan" },
    { id: '2', titulo: "Preparar Almuerzo", descripcion: "Hay que preparar almuerzo" },
    { id: '3', titulo: "Llevar el perro a bañar", descripcion: "El perro necesita un baño" },
]
type User = {
    email: string,
    reminders: Array<Reminder>
} | null;
export type Reminder = {
    id: string,
    titulo: string,
    descripcion: string,
} | null;
const AuthContext = createContext<{
    user: User,
    isAllowed: boolean;
    login: (email: string) => void;
    logout: () => void;
    addReminder: (reminder: Reminder) => void;
} | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [isAllowed, setIsAllowed] = useState<boolean>(false);

    const login = (email: string) => {
        const isValidEmail = email.endsWith('@gmail.com');

        if (true || isValidEmail) {
            setUser({ email, reminders: defaultReminders });
            setIsAllowed(true);
        } else {
            setUser(null);
            setIsAllowed(false);
            alert("Formato de correo invalido")
        }
    };

    const logout = () => {
        setUser(null);
        setIsAllowed(false);
    }

    const addReminder = (reminder: Reminder) => {
        const reminderArray = [...(user?.reminders as Array<Reminder>), reminder];
        if (user != null) {
            setUser({ email: user.email, reminders: reminderArray });
        }

    }

    return (
        <AuthContext.Provider value={{ user, isAllowed, login, logout, addReminder: addReminder }}>
            {children}
        </AuthContext.Provider>
    )

}