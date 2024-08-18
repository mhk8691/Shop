import { CircularProgress, Container, Grid } from "@mui/material";
import ProductsItem from "../components/Products/ProductsItem";
import useProducts from "../api/useProducts"
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'
import { login } from "../Slice/accountSlice";

const loaingStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100
}

function Products() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const serchParams = { key: '?title=', params: query }
    const emptyParams = { key: '', params: '' }
    const dispatch = useDispatch()
    const token = Cookies.get('access_token')
    const isLogin = useSelector(state => state.account.isLogin)
    const { data, isPending } = useProducts(query ? serchParams : emptyParams);


    useEffect(() => {
        document.title = `Products`;
    }, [data])


    useEffect(() => {

        if (!isLogin) {

            if (token) {
                dispatch(login(token))
            }
        }
    }, [token, dispatch]);
    if (isPending) return <CircularProgress color="primary" sx={loaingStyle} />
    return (
        <Container sx={{ my: 10 }}>
            <Grid container spacing={2.5}>

                {data?.map((item) => (

                    <ProductsItem item={item} key={item.id} />

                ))
                }
            </Grid>
        </Container>
    )
}

export default Products
