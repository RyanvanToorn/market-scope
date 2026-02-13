import { Box } from "@components/Box/Box";
import styles from "./Testing.module.css";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useBasicLayout } from "@layouts/BasicLayout";
import { Paper } from "@components/Paper/Paper";
import { Button } from "@components/Button/Button";
import { APIController } from "@controllers/api-controller";
import { AlphaVantageClient } from "@services/alpha-vantage-client";
import { CoinCapClient } from "@services/coin-cap-client";

export interface TestingProps {

}

export function Testing(_props: TestingProps): React.ReactElement | null {
    const { setLayout } = useBasicLayout();

    const controllerRef = useRef<APIController | null>(null);

    const getController = useCallback(async (): Promise<APIController> => {
        if (controllerRef.current) return controllerRef.current;

        const storedAlphaKey = localStorage.getItem("alphaVantageApiKey") ?? "";
        const storedCoinCapKey = localStorage.getItem("coinCapApiKey") ?? "";

        const alphaKey = storedAlphaKey || window.prompt("Enter Alpha Vantage API key") || "";
        const coinCapKey = storedCoinCapKey || window.prompt("Enter CoinCap API key") || "";

        if (!alphaKey || !coinCapKey) {
            throw new Error("Missing API key(s). Provide both Alpha Vantage and CoinCap keys.");
        }

        localStorage.setItem("alphaVantageApiKey", alphaKey);
        localStorage.setItem("coinCapApiKey", coinCapKey);

        const alphaClient = new AlphaVantageClient(alphaKey);
        const coinCapClient = new CoinCapClient(coinCapKey);
        controllerRef.current = new APIController(alphaClient, coinCapClient);
        return controllerRef.current;
    }, []);

    const promptArgsForMethod = useCallback((methodName: string): string[] => {
        const promptMap: Record<string, string[]> = {
            getTimeSeriesDaily: ["symbol"],
            getTimeSeriesWeekly: ["symbol"],
            getTimeSeriesMonthly: ["symbol"],
            getPriceBySymbol: ["symbol"],
            getPriceByAddress: ["tokenAddress", "network"],
            getAsset: ["slug"],
            getAssetMarkets: ["slug"],
            getAssetHistory: ["slug"],
            getAssetMarketCapHistory: ["slug"],
            getExchange: ["exchange"],
            getRate: ["slug"],
            getTechnicalAnalysisSMAFull: ["slug"],
            getTechnicalAnalysisSMALatest: ["slug"],
            getTechnicalAnalysisEMAFull: ["slug"],
            getTechnicalAnalysisEMALatest: ["slug"],
            getTechnicalAnalysisMACDFull: ["slug"],
            getTechnicalAnalysisMACDLatest: ["slug"],
            getTechnicalAnalysisVWAPLatest: ["slug"],
            getTechnicalAnalysisCandlesticks: ["slug"],
            getTechnicalAnalysisRSIFull: ["slug"],
            getTechnicalAnalysisRSILatest: ["slug"],
            getTechnicalAnalysisGetAllLatest: ["slug"],
        };

        const paramNames = promptMap[methodName];
        const arity = typeof (APIController.prototype as any)[methodName] === "function" ? (APIController.prototype as any)[methodName].length : 0;
        const finalParamNames = paramNames ?? Array.from({ length: arity }, (_, index) => `arg${index + 1}`);

        return finalParamNames.map((param) => window.prompt(`Enter ${param} for ${methodName}`) ?? "");
    }, []);

    const invokeMethod = useCallback(async (methodName: string) => {
        try {
            const controller = await getController();
            const args = promptArgsForMethod(methodName);
            const result = await (controller as any)[methodName](...args);
            console.log(`[APIController.${methodName}] result:`, result);
        } catch (error) {
            console.warn(`[APIController.${methodName}] error:`, error);
        }
    }, [getController, promptArgsForMethod]);

    const apiControllerMethodNames = useMemo(() => {
        const proto = APIController.prototype;
        return Object.getOwnPropertyNames(proto).filter((name) => name !== "constructor" && typeof (proto as any)[name] === "function");
    }, []);

    useEffect(() => {
        setLayout(prev => ({
            ...prev,
            title: 'Testing'
        }));
    }, [setLayout]);

    return (
    <Box extendedClass={styles.Testing}>
        <Paper extendedClass={styles.TestingPaper}>
            <Box extendedClass={styles.APIButtonContainer}>
				{apiControllerMethodNames.map((methodName) => (
                    <Button key={methodName} onClick={() => void invokeMethod(methodName)} extendedClass={styles.APIButton}>
						{methodName}
					</Button>
				))}
            </Box>
        </Paper>
    </Box>);
}
