import { useParams } from "react-router-dom";
import useProducts from "../../api/useProducts";
import ProductEdit from "./ProductEdit";
import { CircularProgress } from "@mui/material";

function ProductsEdit() {
    const { id } = useParams();
    const { data, isPending } = useProducts({ key: '', param: id });
    const loaingStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100
    }
    if (isPending) return <CircularProgress sx={loaingStyle} />

    return (
        <ProductEdit data={data} />
    )
}

export default ProductsEdit
