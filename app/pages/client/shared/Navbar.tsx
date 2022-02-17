import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";

// The theme provider should go here to implement dark mode

export default function Navbar() {
    return (
        <Container maxWidth="md">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                    Photos
                    </Typography>
                </Toolbar>
                </AppBar>
            </Box>
        </Container>
    )
}