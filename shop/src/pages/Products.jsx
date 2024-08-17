import { CircularProgress, Container, Grid } from "@mui/material";
import ProductsItem from "../components/Products/ProductsItem";
import useProducts from "../api/useProducts"
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
function Products() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const serchParams = { key: '?title=', params: query }
    const emptyParams = { key: '', params: '' }
    const { data, isPending } = useProducts(query ? serchParams : emptyParams);
    useEffect(() => {
        document.title = `Products`;
    }, [data])
    const loaingStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100
    }
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
