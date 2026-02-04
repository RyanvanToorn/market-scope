import type React from "react";
import Styles from "./api-button.styles.module.css"
import { APIController } from "@controllers/api-controller";
import { AlphaVantageClient } from "@services/alpha-vantage-client";


export const APIButton: React.FC = () => {
    return (
        <div className={`api-button ${Styles.Root}`} style={{ padding: "0.2 rem" }}>
        <button type="button" onClick={fireAPI}>API Test</button>
        </div>
    )

    async function fireAPI(){
        console.warn("API Fired");
        const apiKey = import.meta.env.VITE_API_KEY;
        const alphaClient: AlphaVantageClient =  new AlphaVantageClient(apiKey);
        const alphaController: APIController = new APIController(alphaClient)

        try {

        /* getAllSymbols test 
        const symbols = await alphaController.getAllSymbols();
        console.log("Symbols:", symbols);
        */   

        /* getTimeSeriesDaily test */ 
            const dailyData = await alphaController.getTimeSeriesDaily("AAPL");
            console.log("Daily Data:", dailyData);
        } catch (error) {
            console.error("Error fetching data:", error);
    }
    }
}