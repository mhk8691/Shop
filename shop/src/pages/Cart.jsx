import { useDispatch, useSelector } from "react-redux"
import Cookies from 'js-cookie'
import { login } from "../Slice/accountSlice"
import { useEffect } from "react"
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import CartItem from "../components/Cart/CartItem"
import { useNavigate } from "react-router-dom"
import { clearCart } from "../Slice/CartSlice"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// style

const containerStyle = {
    backgroundColor: '#efefef',
    borderRadius: 5,
    py: 1,
    mt: 7,
}


function Cart() {
    const cartList = useSelector(state => state.cart.cartList)
    const dispatch = useDispatch()
    const token = Cookies.get('access_token')
    const isLogin = useSelector(state => state.account.isLogin)
    const navigate = useNavigate()
    console.table(cartList)
    useEffect(() => {
        document.title = 'Cart'
        if (!isLogin) {

            if (token) {
                dispatch(login(token))
            }
            else {
                navigate('/login')
            }
        }
    }, [token, dispatch]);

    return (
        <Container maxWidth="lg" sx={containerStyle}>
            {cartList.length > 0 ? (
                <Typography variant="h6" color="primary.dark">
                    Cart
                </Typography>
            ) : (
                <Typography variant="h6" color="primary.dark" sx={{ textAlign: 'center', mt: 2 }}>
                    Your cart is empty
                </Typography>
            )}
            <Grid container rowGap={2} spacing={2} sx={{ mt: 2, pb: 2 }}>
                {cartList.map((item, index) => (
                    <CartItem key={index} item={item} />
                ))}
                {cartList.length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', pb: 2 }}>
                        <Typography variant="body1" color="primary" ml={2} >
                            Total Price: ${cartList.reduce((acc, item) => acc + item.totalPrice, 0)}
                        </Typography>
                        <Box>
                            <Button variant="contained" size="" color='sungLow' sx={{ ml: 2, mt: 2 }} endIcon={<DeleteForeverIcon />} onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                            <Button variant="contained" size="" color='primary' sx={{ ml: 2, mt: 2 }} endIcon={<CheckCircleIcon />} onClick={() => navigate('/checkout')}>Checkout</Button>
                        </Box>
                    </Box >
                ) : null}

            </Grid>
        </Container>
    )
}

export default Cart
