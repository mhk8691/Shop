import { AppBar, Box, IconButton, TextField, Toolbar, Typography, Link, Button, useMediaQuery, ThemeProvider } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import zIndex from "@mui/material/styles/zIndex";

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
const cartStyles = {
    position: 'absolute',
    bottom: '-4rem',
    right: '50%',
    transform: 'translateX(50%)',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
    width: '300px',
    padding: '.7rem',
    zIndex: '100',
    
}
function Navbar() {
    const theme = useTheme()
    const menu = useMediaQuery(theme.breakpoints.down('md'))
    const [isHover, setIsHover] = useState(false)
    const handleMouseEnter = () => {
        setIsHover(true)
    }
    const handleMouseLeave = () => {
        setIsHover(false)
    }
    return (
        <AppBar position="static" color="default" sx={{ borderRadius: 2, bgcolor: 'primary.contrastText' }}>
            <Toolbar variant="dense" sx={toolbarStyles}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" color="primary" fontSize={19}>
                        <Link
                            component={RouterLink}
                            to="/"
                            color={'primary'}
                            underline="none"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <img src="../../../public/logo.png" alt="" style={{ width: '45px', height: '45px' }} />
                            Shop

                        </Link>

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
                        <div style={{ display: 'flex' }}>
                            <Box sx={{ position: 'relative' }}>
                                <IconButton sx={{ mr: 1.5 }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <ShoppingCartIcon color="primary" />
                                </IconButton>
                                {isHover ? <div style={cartStyles}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, consequatur.</div> : null}
                            </Box>
                            <Button variant="contained" size="large" component={RouterLink} to="/login">login / sign up</Button>
                        </div>
                    )}
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Navbar
