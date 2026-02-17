import { Tab } from "@components/Tabs/Tab";
import { Tabs } from "@components/Tabs/Tabs";
import styles from "./TabBrowser.module.css";
import { useState } from "react";

const tabSx = {};
const tabsSx = {};

const [currentTabNumber, setCurrentTabNumber] = useState<number>(0);


export function TabBrowser(): React.ReactElement | null{
    return (
        <>
        <Tabs value={currentTabNumber} extendedClass={styles.Tabs} sx={tabsSx} children={
          <>
            <Tab value="1" label="Tab 1" extendedClass={styles.Tab} sx={tabSx} />
            <Tab value="2" label="Tab 2" extendedClass={styles.Tab} sx={tabSx}/>
            <Tab value="3" label="Tab 3" extendedClass={styles.Tab} sx={tabSx}/>
            <Tab value="4" label="Tab 4" extendedClass={styles.Tab} sx={tabSx}/>
            <Tab value="5" label="Tab 5" extendedClass={styles.Tab} sx={tabSx}/>
          </>
}/> 
        </>
    );
}