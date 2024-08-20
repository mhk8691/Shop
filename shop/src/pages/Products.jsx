import { CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import ProductsItem from "../components/Products/ProductsItem";
import useProducts from "../api/useProducts"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'
import { login } from "../Slice/accountSlice";
import Slider from '@mui/material/Slider';
const loaingStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
    marginTop: '3rem',
}

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState();
    const [priceState, setPriceState] = useState('')
    const q = searchParams.get("q");
    const price = searchParams.get("price");
    const priceMin = searchParams.get("price_min");
    const priceMax = searchParams.get("price_max");

    const dispatch = useDispatch()
    const token = Cookies.get('access_token')
    const isLogin = useSelector(state => state.account.isLogin)

    const { data, isPending } = useProducts(query);

    useEffect(() => {
        if (q) {
            setQuery({ key: 'title', param: `?title=${q}` })
            console.log(q)
        }
        else if (price) {
            setQuery({ key: 'price', param: `?price=${price}` })
            console.log(price)
        }
        else if (priceMin && priceMax) {
            setQuery({ key: 'min_max', param: `?price_min=${priceMin}&price_max=${priceMax}` })
            console.log(priceMin)
            console.log(priceMax)
        }
        else {
            setQuery({ key: 'all', param: '' })
        }
    }, [q, price, priceMin, priceMax])
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

    function handlePrice(e) {
        e.preventDefault()
        setSearchParams({ price: priceState })
        setValue([10, 30])
    }

    const [value, setValue] = useState([10, 30]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleCommitted = (event, newValue) => {
        setSearchParams({ price_min: newValue[0], price_max: newValue[1] })
        setPriceState('')

    };

    return (
        <Container sx={{ my: 10 }}>
            <form action="" onSubmit={handlePrice}>
                <TextField
                    label="price"
                    variant="filled"
                    InputLabelProps={{
                        sx: {
                            fontSize: '0.875rem',
                        },
                    }}

                    value={priceState}
                    onChange={(e) => setPriceState(e.target.value)}

                />
            </form>
            <Typography variant="body1" color="primary.dark" mt={2}>Filter by price range </Typography>
            <Slider
                sx={{ mt: .5, mb: 2 }}
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                onChangeCommitted={handleCommitted}
                valueLabelDisplay="auto"
                max={1000}
                min={10}
            />

            <hr />
            {isPending ? <CircularProgress color="primary" sx={loaingStyle} /> : null}
            <Grid container spacing={2.5} mt={.5}>

                {data?.map((item) => (

                    <ProductsItem item={item} key={item.id} />

                ))
                }
            </Grid>
        </Container>
    )
}

export default Products
