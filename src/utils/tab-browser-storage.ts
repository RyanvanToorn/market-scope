import type { TabDefinition } from "@features/tab-browser/TabBrowser";
import { safeGetItem, safeRemoveItem, safeSetItem } from "./local-storage";

const STORAGE_KEY = "marketscope.tabBrowser";

export type PersistedTabState = {
	tabs: TabDefinition[];
	currentTabNumber: number;
};

export const tabBrowserStorage = {
	load(): PersistedTabState | null {
		try {
			const raw = safeGetItem(STORAGE_KEY);
			if (!raw) return null;

			const parsed: unknown = JSON.parse(raw);
			if (
				typeof parsed !== "object" ||
				parsed === null ||
				!Array.isArray((parsed as PersistedTabState).tabs) ||
				typeof (parsed as PersistedTabState).currentTabNumber !== "number"
			) {
				return null;
			}

			return parsed as PersistedTabState;
		} catch {
			return null;
		}
	},

	save(state: PersistedTabState): void {
		safeSetItem(STORAGE_KEY, JSON.stringify(state));
	},

	clear(): void {
		safeRemoveItem(STORAGE_KEY);
	},
};
