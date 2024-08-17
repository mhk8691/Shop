import { useParams } from "react-router-dom"
import useProducts from "../api/useProducts"
import { useEffect } from "react";
import ProductsItem from "../components/Products/ProductsItem";
import { CircularProgress, Container, Grid } from "@mui/material";

function Products() {
    const params = useParams().categoryId

    const { data, isPending } = useProducts({ key: '?categoryId=', params })

    useEffect(() => {
        if (data && data.length > 0) {
            document.title = `${data[0].category?.name} - Products`;
        }
        else {
            document.title = "Products"
        }
    }, [data]);
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
