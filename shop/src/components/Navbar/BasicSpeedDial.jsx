import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../Slice/accountSlice';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../Slice/CartSlice';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CategoryIcon from '@mui/icons-material/Category';



export default function BasicSpeedDial() {
    const theme = useTheme()
    const menu = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useDispatch()
    const token = Cookies.get('access_token')
    const isLogin = useSelector(state => state.account.isLogin)
    const navigate = useNavigate()
    function handleLogout() {
        Cookies.remove('access_token')
        dispatch(logout())
        dispatch(clearCart())
    }
    const actionsLogout = [
        { icon: <LoginIcon />, name: 'Lgoin', onClick: () => navigate('/login') },
        { icon: <PersonAddIcon />, name: 'Sign Up', onClick: () => navigate('/signup') },
    ];
    const actionsLogin = [
        { icon: <AccountBoxIcon />, name: 'Profile', onClick: () => navigate('/profile') },
        { icon: <LogoutIcon />, name: 'Logout', onClick: handleLogout },
        { icon: <ShoppingCartIcon />, name: 'Cart', onClick: () => navigate('/cart') },
        { icon: <LocalMallIcon />, name: 'Products List', onClick: () => navigate('/products/list') },
        { icon: <CategoryIcon />, name: 'Categories List', onClick: () => navigate('/categories/list') },
    ]
    useEffect(() => {

        if (!isLogin) {

            if (token) {
                dispatch(login(token))
            }
        }
    }, [token, dispatch]);
    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: 0, right: 0, zIndex: 1000 }}>
            {
                menu ? (
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon />}
                    >
                        {
                            !isLogin ? (
                                actionsLogout.map((action) => (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        onClick={action.onClick}
                                    />
                                ))
                            ) : (
                                actionsLogin.map((action) => (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        onClick={action.onClick}
                                    />
                                ))
                            )

                        }
                    </SpeedDial>
                ) : null
            }
        </Box>
    );
}