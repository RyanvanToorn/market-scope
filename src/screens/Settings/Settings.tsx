import { Box } from "@components/Box/Box";
import styles from "./Settings.module.css";
import { useEffect } from "react";
import { useBasicLayout } from "@layouts/BasicLayout";
import { Paper } from "@components/Paper/Paper";
import { TextField } from "@components/TextField/TextField";
import { Typography } from "@components/Typography/Typography";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup/ToggleButtonGroup";
import { ToggleButton } from "@components/ToggleButtonGroup/ToggleButton";
import { Divider } from "@components/Divider/Divider";
import { Icon } from "@components/Icon/Icon";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import { useAppSettings } from "@context/AppSettingsContext";

export function Settings(): React.ReactElement | null {
	const { setLayout } = useBasicLayout();
    const { settings, updateSettings } = useAppSettings();

    useEffect(() => {
        setLayout(prev => ({
            ...prev,
            title: 'Settings'
        }));
    }, [setLayout]);

    const labels = {
        coinCapApiKey: "Coin Cap API Key",
        alphaVantageApiKey: "Alpha Vantage API Key",
        themePreference: "Theme Preference",
        apiKeys: "API Keys",
        light: "Light",
        dark: "Dark",
        system: "System",
        settings: "Settings"
    }

    const fontSx = {
	    fontFamily: "'Fjalla One', sans-serif",
    };

    return (
    <Box extendedClass={styles.Settings}>
        <Paper extendedClass={styles.SettingsPaper} sx={{
            borderRadius: "0rem",
        }}>
            <form className={styles.SettingsForm}>
                <Box extendedClass={styles.SettingsHeading}>
                    <Typography text={labels.settings} variant="h4" sx={fontSx}/> 
                </Box>
                
                <Divider orientation="horizontal" variant="fullWidth" flexItem/>

                <Box extendedClass={styles.SettingsSubHeading}>
                    <Typography text={labels.apiKeys} variant="h5" sx={fontSx}/> 
                </Box>

                <Box extendedClass={styles.SettingsFormRow}>
                    <TextField extendedClass={styles.SettingsTextField} label={labels.alphaVantageApiKey}/>
                </Box>

                <Box extendedClass={styles.SettingsFormRow}>
                    <TextField extendedClass={styles.SettingsTextField} label={labels.coinCapApiKey}/>
                </Box>

                <Divider orientation="horizontal" variant="fullWidth" flexItem/>

                <Box extendedClass={styles.SettingsSubHeading}>
                    <Typography text={labels.themePreference} variant="h5" sx={fontSx}/> 
                </Box>
                
                <Box extendedClass={styles.SettingsFormRow}>
                    <ToggleButtonGroup
                        exclusive={true}
                        value={settings.themeMode}
                        onChange={(_, value) => {
                            if (value === null) return;
                            updateSettings({ themeMode: value });
                        }}
                    >

                        <ToggleButton value={"light"} contents={
                            <> 
                                <Typography text={labels.light} extendedClass={styles.SettingsToggleButtonText} sx={fontSx}/> 
                                <Icon icon={LightModeIcon} extendedClass={styles.SettingsToggleButtonIcon}/>
                            </> 
                        }/>

                        <ToggleButton value={"dark"} contents={
                            <> 
                                <Typography text={labels.dark} extendedClass={styles.SettingsToggleButtonText} sx={fontSx}/>
                                <Icon icon={DarkModeIcon} extendedClass={styles.SettingsToggleButtonIcon}/>
                            </> 
                        }/>

                        <ToggleButton value={"system"} contents={
                            <> 
                                <Typography text={labels.system} extendedClass={styles.SettingsToggleButtonText} sx={fontSx}/>
                                <Icon icon={AutoModeIcon} extendedClass={styles.SettingsToggleButtonIcon}/>
                            </> 
                        }/>

                    </ToggleButtonGroup>
                </Box>
            </form>
        </Paper>
    </Box>);
}

