import type React from "react";
import Styles from "./api-button.styles.module.css"


export const APIButton: React.FC = () => {
    return (
        <div className={`api-button ${Styles.Root}`} style={{ padding: "0.2 rem" }}>
        <button type="button" onClick={fireAPI}>API Test</button>
        </div>
    )

    function fireAPI(): undefined{
        console.warn("API Fired");
        return undefined;
    }
}