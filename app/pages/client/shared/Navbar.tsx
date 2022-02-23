import { useState, useContext } from "react";
import { InfoContentManagerContext } from "../context/InfoContentManagerContext";
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const pages = [
    {title: 'Home', route: "/"}, 
    {title: 'List', route: "/detail"}
];

const Navbar = () => {
    const { toggleColorMode } = useContext(InfoContentManagerContext);
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        toggleColorMode(event.target.checked);
        setChecked(event.target.checked);
    };
  
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
            <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page, index) => (
                        <Button
                        key={index}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        <Link href={page.route}>
                            {page.title}
                        </Link>
                        </Button>
                    ))}
                </Box>

                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    color="default"
                />
                { checked ? <DarkModeIcon /> : <LightModeIcon /> }
            </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;