import { APIController } from "@controllers/api-controller";
import { AlphaVantageClient } from "@services/alpha-vantage-client";
import { CoinCapClient } from "@services/coin-cap-client";
import { useMemo } from "react";
import { useAppSettings } from "./AppSettingsContext";
import { APIControllerContext } from "./APIControllerContext";

export const APIControllerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { settings } = useAppSettings();
	const { alphaVantageKey, coinCapKey } = settings.apiKeys;

	const controller = useMemo(() => {
		if (!alphaVantageKey || !coinCapKey) return null;
		const alpha = new AlphaVantageClient(alphaVantageKey);
		const coin = new CoinCapClient(coinCapKey);
		return new APIController(alpha, coin);
	}, [alphaVantageKey, coinCapKey]);

	return <APIControllerContext.Provider value={controller}>{children}</APIControllerContext.Provider>;
};
