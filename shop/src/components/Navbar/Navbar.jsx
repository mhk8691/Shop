import { AppBar, Box, IconButton, TextField, Toolbar, Typography, Link, Button, useMediaQuery, ThemeProvider, ButtonGroup } from "@mui/material"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Slice/accountSlice";
import { clearCart } from "../../Slice/CartSlice";

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
    right: '50%',
    transform: 'translateX(50%)',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
    width: '350px',
    padding: '.7rem',
    marginTop: '.3rem',
    zIndex: '100',

}
function Navbar() {
    const [isHover, setIsHover] = useState(false)
    const [query, setQuery] = useState('')
    const navigator = useNavigate()
    const theme = useTheme()
    const menu = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useDispatch()
    const isLogin = useSelector(state => state.account.isLogin)
    const cartList = useSelector(state => state.cart.cartList)
    const handleMouseEnter = () => {
        setIsHover(true)
    }
    const handleMouseLeave = () => {
        setIsHover(false)
    }
    function handleSubmit(e) {
        e.preventDefault()
        navigator(`/products/?q=${query}`)
        setQuery('')
    }
    function handleLogout() {
        Cookies.remove('access_token')
        dispatch(logout())
        dispatch(clearCart())
    }
    function handleCart() {
        navigator('/cart')
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
                    <form action="" onSubmit={handleSubmit}>
                        <TextField
                            label="search"
                            color="primary"
                            sx={
                                searchBarStyles
                            }
                            focused
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                </Box>
                <Box>
                    {menu ? (
                        null
                    ) : (
                        <div style={{ display: 'flex' }}>
                            <Box sx={{ position: 'relative' }}>
                                {isLogin ? (
                                    <IconButton sx={{ mr: 1.5 }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleCart}>
                                        <ShoppingCartIcon color="primary" />
                                    </IconButton>
                                ) : null}
                                {isHover ? <div style={cartStyles}>

                                    {

                                        cartList.length > 0 ? cartList.map((item, index) => (
                                            <Box key={index} display={'flex'} alignItems={'center'} border={2} p={1} borderColor={'primary.light'} justifyContent={'space-between'} borderRadius={'5px'} marginTop={'.5rem'} marginBottom={'.5rem'}>
                                                <Typography variant="body2" color="primary.dark">
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="primary.main">
                                                    ${item.price}
                                                </Typography>

                                            </Box>
                                        )) : <Typography variant="body1" color="primary.dark" sx={{ textAlign: 'center' }}>No items in your cart</Typography>
                                    }
                                </div> : null}
                            </Box>
                            {
                                !isLogin ? (
                                    <Button variant="contained" size="large" component={RouterLink} to="/signup">login / sign up</Button>
                                ) : <ButtonGroup variant="contained" >
                                    < Button variant="contained" color="sungLow" size="small" onClick={handleLogout} endIcon={<LogoutIcon />} > logout</ Button >
                                    <Button variant="contained" color="primary" size="small" endIcon={<AccountBoxIcon />} component={RouterLink} to='/profile' >Profile</Button>
                                </ButtonGroup>
                            }
                        </div>
                    )}
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Navbar
