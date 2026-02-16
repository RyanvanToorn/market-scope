import type { AppSettings } from "@interfaces/app-settings";
import { safeGetItem, safeRemoveItem, safeSetItem } from "./local-storage";

const SETTINGS_STORAGE_KEY = "userSettings"

export function loadAppSettings(): Partial<AppSettings> | null{
    const appSettings = safeGetItem(SETTINGS_STORAGE_KEY);

    return appSettings;
}

export function saveAppSettings( settings: Partial<AppSettings>): void{
    safeSetItem(settings);
}

export function clearAppSettings(): void{
    safeRemoveItem(SETTINGS_STORAGE_KEY);
}