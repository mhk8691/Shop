import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Slice/accountSlice";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useDelete from "../../api/useDelete";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useCategories from "../../api/useCategories";

const loaingStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100
}
function CategoriesAdmin() {
    const { data, isPending } = useCategories();
    const dispatch = useDispatch()
    const token = Cookies.get('access_token')
    const isLogin = useSelector(state => state.account.isLogin)
    const navigate = useNavigate()
    const { mutateAsync: deleteCategory } = useDelete()


    useEffect(() => {
        document.title = 'Category List'
        if (!isLogin) {

            if (token) {
                dispatch(login(token))
            }
            else {
                navigate('/login')
            }
        }
    }, [token, dispatch]);


    async function handleDelete(id) {
        await deleteCategory({ url: 'categories', id: id, key: 'categories' })
    }
    function handleEdit(id) {
        navigate(`/categories/edit/${id}`)
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'name', width: 200 },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt="Product"
                    style={{ width: '100%', height: '100%' }}
                />
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 60,
            renderCell: (params) => (
                <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDelete(params.id)}
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
                <IconButton
                    color="primary"
                    onClick={() => handleEdit(params.id)}
                >
                    <EditIcon />
                </IconButton>
            ),
        },

    ];



    const rows = data?.map(row => ({
        id: row.id,
        name: row.name,
        image: row.image,
    }));


    if (isPending) return <CircularProgress sx={loaingStyle} />
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <div style={{ marginTop: '20px', padding: '20px', width: '50%',height: '100%' }}>
                <Button variant='contained' startIcon={<AddCircleIcon />} onClick={() => navigate('/categories/add')} sx={{ mb: 2 }}>new Category</Button>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20, 30, 50, 100]}
                    checkboxSelection
                />
            </div >
        </div>
    )
}

export default CategoriesAdmin
