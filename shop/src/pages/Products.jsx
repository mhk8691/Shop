import { useParams } from "react-router-dom"
import useProducts from "../api/useProducts"
import { useEffect } from "react";
import ProductsItem from "../components/Products/ProductsItem";
import { Container, Grid } from "@mui/material";

function Products() {
    const parmas = useParams()
    const { data } = useProducts(parmas.categoryId)

    useEffect(() => {
        if (data && data.length > 0) {
            document.title = `${data[0].category?.name} - Products`;
        }
        else {
            document.title = "Products"
        }
    }, [data]);
    return (
        <Container sx={{ my: 10 }}>
            <Grid container spacing={2.5}>

                {data?.map((item) => (

                    <ProductsItem item={item} />

                ))
                }
            </Grid>
        </Container>
    )
}

export default Products
