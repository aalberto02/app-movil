import { AuthProvider } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
      </LanguageProvider>

    </ThemeProvider >
  )
}