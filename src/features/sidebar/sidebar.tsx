import { Box } from "@components/Box/Box";
import styles from "./sidebar.module.css";
import { Button } from "@components/Button/Button";
import { Icon } from "@components/Icon/Icon";
import CloseIcon from '@mui/icons-material/Close';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Paper } from "@components/Paper/Paper";
import { useState } from "react";

export interface SidebarProps{
    isOpen: boolean;
    onClose: ()=>void;
    startExpanded?: boolean;
    headerContents?: React.ReactNode;
    bodyContents?: React.ReactNode;
}

export function Sidebar(props: SidebarProps): React.ReactElement | null{
    let startExpanded = false;
    if (!props.startExpanded){
        startExpanded = false;
    } else {
        startExpanded = props.startExpanded;
    }

    const [isExpanded, setIsExpanded] = useState<boolean>(startExpanded);

    function toggleExpand(){
        setIsExpanded(!isExpanded);
    }

    if(!props.isOpen){
        return null
    }


    return (
        <Box extendedClass={`${styles.SidebarContainer} ${isExpanded ? styles.SidebarContainerExpanded : ''}`}>
            <Box extendedClass={styles.Sidebar}>
                <Box extendedClass={styles.SidebarHeader}>
                    <Paper extendedClass={styles.SidebarPaper}>
                        <Box extendedClass={styles.SidebarHeaderButtonBox}>
                            <Button extendedClass="standard-button" onClick={toggleExpand} variant="contained">
                                <Icon icon={isExpanded ? CloseFullscreenIcon : OpenInFullIcon}/>
                            </Button>
                            <Button extendedClass="standard-button" onClick={props.onClose} variant="contained">
                                <Icon icon={CloseIcon}/>
                            </Button>
                        </Box>
                        {props.headerContents}
                    </Paper>
                </Box>
                <Box extendedClass={styles.SidebarBody}>
                    <Paper extendedClass={styles.SidebarPaper}>
                        {props.bodyContents}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
} 