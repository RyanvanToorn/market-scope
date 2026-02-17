import { Tab } from "@components/Tabs/Tab";
import { Tabs } from "@components/Tabs/Tabs";
import styles from "./TabBrowser.module.css";
import { useState } from "react";
import { Button } from "@components/Button/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Icon } from "@components/Icon/Icon";
import { Box } from "@components/Box/Box";

const tabSx = {};
const tabsSx = {};






export function TabBrowser(): React.ReactElement | null{
    const [currentTabNumber, setCurrentTabNumber] = useState<number>(1);

    function addTab(){
        console.log("Tab Added");
    }

    return (
        <Box sx={{
            display:"flex",
            flexDirection:"row",
        }}>
            <Tabs value={currentTabNumber} extendedClass={styles.Tabs} sx={tabsSx} onChange={setCurrentTab}>
                <Tab value={1} label="Tab 1" extendedClass={styles.Tab} sx={tabSx} />
                <Tab value={2} label="Tab 2" extendedClass={styles.Tab} sx={tabSx}/>
                <Tab value={3} label="Tab 3" extendedClass={styles.Tab} sx={tabSx}/>
                <Tab value={4} label="Tab 4" extendedClass={styles.Tab} sx={tabSx}/>
                <Tab value={5} label="Tab 5" extendedClass={styles.Tab} sx={tabSx}/>
            </Tabs>
            <Button extendedClass={styles.TabAddButton} onClick={addTab} children={<Icon icon={AddCircleOutlineIcon}/>}/>
        </Box>
    );

    function setCurrentTab(_event: React.SyntheticEvent, newValue: number): void{
        setCurrentTabNumber(newValue);
    }
}