import { AppBar, Box, IconButton, TextField, Toolbar, Typography, Link, Button, useMediaQuery, ThemeProvider } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const toolbarStyles = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.8 }
const searchBarStyles =
{
    fontSize: 16,
    label: { fontSize: 15 },
    input: { fontSize: 16 },
    width: '100%',
    '& .MuiInputBase-root': {
        height: '50px',
    },
    '& .MuiInputBase-input': {
        height: '100%',
    },
}
function Navbar() {
    const theme = useTheme()
    const menu = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <AppBar position="static" color="" sx={{ borderRadius: 2 }}>
            <Toolbar variant="dense" sx={toolbarStyles}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                        <Link
                            component={RouterLink}
                            to="/"
                            color={'primary'}
                            underline="none"
                        >Shop</Link>
                    </Typography>
                </Box>
                <Box width={'60%'} >
                    <form action="">
                        <TextField
                            label="search"
                            color="primary"
                            sx={
                                searchBarStyles
                            }
                            focused
                        />
                    </form>
                </Box>
                <Box>
                    {menu ? (
                        <IconButton sx={{ mr: 1 }}>
                            <MenuIcon color="primary" fontSize="large" />
                        </IconButton>
                    ) : (
                        <>
                            <IconButton sx={{ mr: 1.5 }} >
                                <ShoppingCartIcon color="primary" />
                            </IconButton>
                            <Button variant="contained" size="large" component={RouterLink} to="/login">login / sign up</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Navbar
