import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useProfile from "../api/useProfile"
import Info from "../components/Profile/Info"
import { CircularProgress, Container, IconButton, Grid, Box, Typography } from '@mui/material'
import EditProfile from "../components/Profile/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { login } from "../Slice/accountSlice";
import CheckoutItem from "../components/Checkout/CheckoutItem";

const containerStyle = {
    backgroundColor: '#efefef',
    borderRadius: 5,
    py: 5,
    mt: 5,
    height: '75vh',
}
const Style = {
    borderRadius: 5,
    pb: 5,
    position: 'relative',
    px: 2,
}
const loaingStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100
}
const editStyle = { position: 'absolute', top: 0, right: 0 }

function Profile() {
    const [editState, setEditState] = useState(false)
    const { data, isPending } = useProfile()
    const dispatch = useDispatch()
    const token = Cookies.get('access_token')
    const isLogin = useSelector(state => state.account.isLogin)
    const navigate = useNavigate()


    useEffect(() => {
        document.title = 'Profile'
    }, []);


    function handleEdit() {
        setEditState(!editState)
    }

    useEffect(() => {

        if (!isLogin) {

            if (token) {
                dispatch(login(token))
            }
            else {
                navigate('/login')
            }
        }
    }, [token, dispatch]);
    const payment = JSON.parse(localStorage.getItem('PaymentList') || '[]')


    if (isPending) return <CircularProgress color="primary" sx={loaingStyle} />
    return (
        <Container sx={containerStyle}>
            <Grid container>
                <Grid item xs={12} md={5} sx={Style} border={2} borderColor={'primary.main'} >
                    <div>
                        <IconButton color="primary" size="large" sx={editStyle} onClick={handleEdit} >
                            {!editState ? <EditIcon fontSize="large" /> : <AccountCircleIcon fontSize="large" />}
                        </IconButton>
                        {
                            editState ? <EditProfile data={data} setEditState={setEditState} /> : <Info data={data} />
                        }
                    </div>
                </Grid>
                <Grid item xs={12} md={7} sx={{ px: 2 }} >
                    <Box height={'410px'} overflow={'auto'} border={2} borderColor={'secondary.dark'} borderRadius={5} >
                        {payment.length !== 0 ? (

                            payment.map((item, index) => (
                                <Box key={index} p={2}  >
                                    {item[0].map(item2 => (
                                        <CheckoutItem item={item2} key={item2.id} style='15px' />
                                    ))}
                                    <Box ml={2}>
                                        <Typography variant="body1" color="secondary.dark"  >
                                            Total Price: ${item.totalPrice}
                                        </Typography>
                                        <Typography variant="body1" color="secondary.dark" mt={1}>
                                            {item.method}
                                        </Typography>
                                        <Typography variant="body2" color="secondary.dark" mt={1} mb={2}>
                                            {item.date.split('T')[0]}
                                        </Typography>
                                    </Box>
                                    <hr />
                                </Box>
                            ))

                        ) : (
                            <Typography variant="h6" color="primary.dark" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                No Transactions Yet
                            </Typography>
                        )}
                    </Box>

                </Grid>
            </Grid>
        </Container>
    )
}

export default Profile
