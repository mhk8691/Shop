import { useParams } from "react-router-dom";
import useProducts from "../api/useProducts";
import styles from './ProductDetail.module.css'
import { useEffect } from "react";
import { Badge, Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'
import { login } from "../Slice/accountSlice";
import { addItem, removeItem } from "../Slice/CartSlice";
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import useProfile from "../api/useProfile";


const containerStyle = {
    backgroundColor: '#efefef',
    borderRadius: 5,
    pb: 5,

}
const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    textAlign: {
        xs: 'center',
        sm: 'start',
    },

}
const loaingStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100
}
function ProductDetail() {

    const { productId } = useParams();
    const { data, isPending } = useProducts({ key: '', params: productId });
    const dispatch = useDispatch()
    const token = Cookies.get('access_token')
    const isLogin = useSelector(state => state.account.isLogin)
    const cartList = useSelector(state => state.cart.cartList)
    const isInCart = cartList.find(item => item.id === data?.id)

    useEffect(() => {
        data ? document.title = data?.title : document.title = 'product'
    }, [data]);



    useEffect(() => {

        if (!isLogin) {

            if (token) {
                dispatch(login(token))
            }
        }
    }, [token, dispatch]);
    if (isPending) return <CircularProgress color="primary" sx={loaingStyle} />
    return (
        <div style={{ marginTop: '5rem', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
            <Badge badgeContent={data?.category.name} color="primary"  >
                <Container sx={containerStyle} >
                    <Grid container spacing={3} rowSpacing={5}>
                        <Grid item xs={12} md={4} >
                            <Box >
                                <Swiper
                                    effect={'cards'}
                                    grabCursor={true}
                                    modules={[EffectCards]}
                                    className={styles.swiper}
                                >
                                    {data?.images.map((image) => (
                                        <SwiperSlide key={image} className={styles.swiperSlide}>
                                            <img src={image} alt="" style={{ width: '100%', objectFit: 'contain' }} />
                                        </SwiperSlide>
                                    ))}

                                </Swiper>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8} >
                            <Box sx={boxStyle}>
                                <Typography variant="h4" sx={{ color: 'primary.main' }}>{data?.title}</Typography>
                                <Typography variant="body1" sx={{ mt: 2 }} >{data?.description}</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ color: 'primary.dark' }}>${data?.price}</Typography>
                                    {
                                        isLogin ? isInCart ? <Button variant="contained" onClick={() => dispatch(removeItem(data?.id))} >Remove from Cart</Button> : <Button variant="contained" onClick={() => dispatch(addItem(data))} >Add to Cart</Button> : null
                                    }
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Badge>
        </div>
    )
}

export default ProductDetail