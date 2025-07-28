import { AppSettings } from '@/constants/types';

export async function getAppSettings(db: any): Promise<AppSettings | null> {
    try {
        const result = await db.getFirstAsync('SELECT * FROM app_settings LIMIT 1');

        if (!result) return null;

        const mappedSettings: AppSettings = {
            id: result.id,
            theme: result.theme,
            notificationsEnabled: result.notifications_enabled,
            weightUnit: result.weight_unit,
            vibrationFeedback: result.vibration_feedback,
            currentSplitId: result.current_split_id,
            removeAds: result.remove_ads
        };

        return mappedSettings;
    } catch (error) {
        console.log('Failed to get app settings:', error);
        return null;
    }
}