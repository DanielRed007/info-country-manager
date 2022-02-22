import { useEffect ,useState, useMemo ,FC } from "react";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { infoManagerDefaultState, InfoContentManagerContext } from "./InfoContentManagerContext";
import { CssBaseline, PaletteMode, Theme } from "@mui/material";

export const InfoContentManagerProvider: FC = ({children}) => {
    const [mode, setMode] = useState<PaletteMode>('dark');

    const toggleColorMode = (mode: boolean) => { 
        if(!mode) setMode("light");
        if(mode) setMode("dark");
    }; 
    
    const theme: Theme = useMemo<Theme>(
        () =>
          createTheme({
            palette: {
              mode,
            },
          }),
        [mode],
    );

    return (
        <InfoContentManagerContext.Provider value={{ mode, toggleColorMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                { children }
            </ThemeProvider>
        </InfoContentManagerContext.Provider>
    );
}