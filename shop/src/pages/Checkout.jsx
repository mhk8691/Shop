import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Slice/accountSlice";
import Cookies from 'js-cookie';
import CheckoutItem from "../components/Checkout/CheckoutItem";
import { Container, FormControlLabel, Grid, Radio, RadioGroup, Typography, Box, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { clearCart } from "../Slice/CartSlice";
const containerStyle = {
    backgroundColor: '#efefef',
    borderRadius: 5,
    py: 1,
    mt: 7,
}

function Checkout() {
    const cartList = useSelector(state => state.cart.cartList)
    const [date, setDate] = useState(null)
    const [method, setMethod] = useState('person')
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const isLogin = useSelector(state => state.account.isLogin)
    const token = Cookies.get('access_token')
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'Checkout'
        if (!isLogin) {

            if (token) {
                dispatch(login(token))
            }
            else {
                navigate('/login')
            }
        }
    }, [token, dispatch]);
    const totalPrice = cartList.reduce((acc, item) => acc + item.totalPrice, 0)

    function handlePayment() {
        if (date && method) {
            const paymentListOld = JSON.parse(localStorage.getItem('PaymentList') || '[]')
            const payment = [cartList]
            const cartList2 = {
                ...payment,
                method: method,
                date: date,
                totalPrice: totalPrice
            }
            const paymentList = [...paymentListOld, cartList2]
            console.log(paymentList)
            localStorage.setItem('PaymentList', JSON.stringify(paymentList))
            dispatch(clearCart())
            navigate('/')

        }
        else {
            setError(true)
        }
    }

    if (cartList.length === 0) {
        navigate('/products')
    }
    return (

        <Container maxWidth="lg" sx={containerStyle}>

            <Typography variant="h6" color="primary.dark">
                Checkout
            </Typography>

            <Grid container rowGap={2} spacing={2} sx={{ mt: 2, pb: 2 }}>
                {cartList.map((item, index) => (
                    <CheckoutItem key={index} item={item} />
                ))}

                <Box ml={2} border={2} borderColor="primary.light" borderRadius={5} p={2}>
                    <Box>
                        <Typography variant="body1" color="primary.dark"  >
                            Total Price: ${totalPrice}
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography variant="body1" color="primary.light" mb={1} >
                            Select the delivery date
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker label='select date' minDate={dayjs()} value={date} onChange={(newValue) => setDate(newValue)} />
                        </LocalizationProvider>
                    </Box>
                    <Box mt={2}>
                        <Typography variant="body1" color="primary.light"  >
                            Select payment method
                        </Typography>
                        <RadioGroup
                            name="controlled-radio-buttons-group"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                        >
                            <FormControlLabel value="person" control={<Radio />} label="person" />
                            <FormControlLabel value="online" control={<Radio />} label="online" />

                        </RadioGroup>
                    </Box>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={handlePayment} >Payment</Button>
                    </Box>
                </Box>
            </Grid>
        </Container>

    )
}

export default Checkout
