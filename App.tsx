import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';

import { AuthProvider } from './src/hooks/useAuth';
import { Routes } from './src/routes';
import { ThemeProvider } from 'styled-components/native';

import theme from './src/styles/theme';

export default function App() {
    const [isLoaded] = useFonts({
        DMSans_400Regular,
        DMSans_700Bold
    });

    if (!isLoaded) {
        return <AppLoading />;
    }

    return (
        <SafeAreaProvider>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <StatusBar
                        style="light"
                        backgroundColor={theme.colors.purple}
                        translucent
                    />
                    <Routes />
                </ThemeProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
