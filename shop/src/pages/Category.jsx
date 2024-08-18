import { useNavigate, useParams } from "react-router-dom"
import useProducts from "../api/useProducts"
import { useEffect } from "react";
import ProductsItem from "../components/Products/ProductsItem";
import { CircularProgress, Container, Grid } from "@mui/material";
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
    const params = useParams().categoryId
    const { data, isPending } = useProducts({ key: '?categoryId=', params })
    const dispatch = useDispatch()
    const token = Cookies.get('access_token')
    const isLogin = useSelector(state => state.account.isLogin)

    useEffect(() => {
        if (data && data.length > 0) {
            document.title = `${data[0].category?.name} - Products`;
        }
        else {
            document.title = "Products"
        }
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
