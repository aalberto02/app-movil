import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18n } from "i18n-js"
import { createContext, useContext, useEffect, useState } from "react";

const translationTexts = {
    es: { greeting: "Bienvenido", email: "Correo electrónico", reminders: "Recordatorios", tittle: "Titulo", description: "Descripcion" },
    en: { greeting: "Welcome", email: "Email", reminders: "Reminders", tittle: "Tittle", description: "Description" },
}
const translationButtons = {
    es: { login: "Ingresar", logout: "Cerrar Sesión", language: "Cambiar a ingles", reminder: "Recordatorio", newReminder: "Nuevo Recordatorio", save: "Guardar", erase: "Borrar" },
    en: { login: "Login", logout: "Logout", language: "Change to spanish", reminder: "Reminder", newReminder: "New Reminder", save: "Save", erase: "Clear" },
}
const translations = {
    es: { ...translationButtons.es, ...translationTexts.es },
    en: { ...translationButtons.en, ...translationTexts.en },
}

const i18n = new I18n(translations);
i18n.defaultLocale = "en";
i18n.enableFallback = true;

type Language = "en" | "es";

interface LanguageContextProps {
    language: Language;
    changeLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
    return context;
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>("es");
    useEffect(() => {

        const loadLanguage = async () => {
            const storedLanguage = await AsyncStorage.getItem("language");
            if (storedLanguage) {
                setLanguage(storedLanguage as Language);
                i18n.locale = storedLanguage;
            } else {
                setLanguage(storedLanguage as Language);
                i18n.locale = i18n.defaultLocale;

            }
        };
        loadLanguage();

    }, []);

    const changeLanguage = async () => {
        const lang = language === "es" ? "en" : "es";
        setLanguage(lang);
        i18n.locale = lang;
        await AsyncStorage.setItem("language", lang);
    }

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    )

}
export { i18n };
