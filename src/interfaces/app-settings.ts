import type { ThemeMode } from "@type/theme-mode";

export interface AppSettings {
	themeMode: ThemeMode;
	apiKeys: {
		alphaVantageKey?: string;
		coinCapKey?: string;
	};
}
