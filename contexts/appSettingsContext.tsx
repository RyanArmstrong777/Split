import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppSettings } from '@/constants/types';
import { getAppSettings } from '@/db/queries/app_settings/getAppSettings';
import { useSQLiteContext } from 'expo-sqlite';
import { updateAppSettings } from '@/db/queries/app_settings/updateAppSettings';

interface AppSettingsContextProps {
    settings: AppSettings | null;
    updateSettings: (newSettings: Partial<AppSettings>) => void;
    refreshKey: boolean;
    triggerRefresh: () => void;
}

const defaultSettings: AppSettings = {
    id: 1,
    theme: 'dark',
    weightUnit: 'kg',
    notificationsEnabled: 1,
    vibrationFeedback: 1,
    currentSplitId: 1
};

const AppSettingsContext = createContext<AppSettingsContextProps | null>(null);

interface AppSettingsProviderProps {
    children: ReactNode;
}

export const AppSettingsProvider = ({ children }: AppSettingsProviderProps) => {

    const db = useSQLiteContext()
    const [settings, setSettings] = useState<AppSettings | null>(defaultSettings);
    const [refreshKey, setRefreshKey] = useState(true);

    const triggerRefresh = () => {
        setRefreshKey(prev => !prev);
    };

    useEffect(() => {
        async function initialiseSettings() {
            setSettings(await getAppSettings(db))
        }
        initialiseSettings()
    }, [refreshKey]);

    async function updateSettings(newSettings: Partial<AppSettings>) {
        await updateAppSettings(db, newSettings)
        setSettings(await getAppSettings(db))
        triggerRefresh()
    };

    return (
        <AppSettingsContext.Provider value={{ settings , updateSettings, refreshKey, triggerRefresh }}>
            {children}
        </AppSettingsContext.Provider>
    );
};

export const useAppSettingsContext = () => {
    const context = useContext(AppSettingsContext);
    if (!context) {
        throw new Error('useAppSettings must be used within an AppSettingsProvider');
    }
    return context;
};
