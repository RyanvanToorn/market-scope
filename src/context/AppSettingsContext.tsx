import type { AppSettings } from "@interfaces/app-settings";
import { defaultSettings, settingsStorage } from "@utils/settings-storage";
import { createContext, useEffect, useState } from "react";

interface AppSettingsContextValue {
    settings: AppSettings;
    updateSettings: (settings: Partial<AppSettings>) => void;
}

const AppSettingsContext = createContext<AppSettingsContextValue | undefined>(undefined);

export const AppSettingsProvider: React.FC<{children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // Load once on mount
  useEffect(() => {
    const loaded = settingsStorage.load();
    setSettings(loaded);
  }, []);

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...partial };
      settingsStorage.save(updated);
      return updated;
    });
  };

  return (
    <AppSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AppSettingsContext.Provider>
  );
};