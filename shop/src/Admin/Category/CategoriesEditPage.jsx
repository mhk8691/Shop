import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CategoriesEdit from "./CategoriesEdit";
import useOneCategory from "../../api/useOneCategory";

function ProductsEdit() {
    const { id } = useParams();
    const { data, isPending } = useOneCategory({ key: '', id });
    const loaingStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100
    }
    if (isPending) return <CircularProgress sx={loaingStyle} />

    return (
        <CategoriesEdit data={data} isPending={isPending} />
    )
}

export default ProductsEdit
