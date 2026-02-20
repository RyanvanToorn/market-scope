import { Box } from "@components/Box/Box";
import styles from "./AssetOverview.styles.module.css"
import type { AssetType } from "@type/asset-type";

/* Parity needs to be ensured with AssetTypes from src/types/AssetTypes */


export interface AssetOverviewProps{
    /** The asset's type */
    assetType: AssetType | undefined;
    /** The asset's unique identifier @example symbol value or coin name */
    identifier: string | undefined;
}


const overviewMap = {
    "Equities" : OverviewEquities(),
    "ETFs": OverviewETFs(),
    "Indices":OverviewIndices(),
    "Commodities":OverviewCommodities(),
    "Crypto":OverviewCrypto(),
    "Currencies":OverviewCurrencies(),
    "Bonds": OverviewBonds(),
}

function OverviewEquities(): React.ReactElement | null{
    return (<Box extendedClass={`${styles.OverviewEquities} ${styles.OverviewShared}`}></Box>);
}

function OverviewETFs(): React.ReactElement | null{
    return (<Box extendedClass={`${styles.OverviewETFs} ${styles.OverviewShared}`}></Box>);
}

function OverviewIndices(): React.ReactElement | null{
    return (<Box extendedClass={`${styles.OverviewIndices} ${styles.OverviewShared}`}></Box>);
}

function OverviewCommodities(): React.ReactElement | null{
    return (<Box extendedClass={`${styles.OverviewCommodities} ${styles.OverviewShared}`}></Box>);
}

function OverviewCrypto(): React.ReactElement | null{
    return (<Box extendedClass={`${styles.OverviewCrypto} ${styles.OverviewShared}`}></Box>);
}

function OverviewCurrencies(): React.ReactElement | null{
    return (<Box extendedClass={`${styles.OverviewCurrencies} ${styles.OverviewShared}`}></Box>);
}

function OverviewBonds(): React.ReactElement | null{
    return (<Box extendedClass={`${styles.OverviewBonds} ${styles.OverviewShared}`}></Box>);
}




export function AssetOverview(props: AssetOverviewProps): React.ReactElement | null{

    if (props.assetType === undefined){
        return null;
    }

    return (
        <Box extendedClass={styles.AssetOverview}>
            {overviewMap[props.assetType]}
        </Box>
    )
}