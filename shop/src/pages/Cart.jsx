import { useDispatch, useSelector } from "react-redux"
import Cookies from 'js-cookie'
import { login } from "../Slice/accountSlice"
import { useEffect } from "react"
import { Container, Grid, Typography } from '@mui/material'
import CartItem from "../components/Cart/CartItem"

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
    console.table(cartList)
    useEffect(() => {
        document.title = 'Cart'
        if (!isLogin) {

            if (token) {
                dispatch(login(token))
            }
        }
    }, [token, dispatch]);

    return (
        <Container maxWidth="lg" sx={containerStyle}>
            <Typography variant="h6" color="primary.dark">
                Cart
            </Typography>
            <Grid container rowGap={2} spacing={2} sx={{ mt: 2, pb: 2 }}>
                {cartList.map((item, index) => (
                    <CartItem key={index} item={item} />
                ))}

            </Grid>
        </Container>
    )
}

export default Cart
