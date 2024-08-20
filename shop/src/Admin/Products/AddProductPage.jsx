import { Box, Button, Container, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import useCategories from "../../api/useCategories"
import { useNavigate } from "react-router-dom"
import useAdd from "../../api/useAdd"

const style = {
    marginTop: '5rem',
    backgroundColor: '#efefef',
    paddingBottom: 7,
    borderRadius: 5,
}
function AddProduct() {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const { data } = useCategories()
    const { mutateAsync: addProduct, reset } = useAdd()
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        const data2 = {
            object: {
                title: title,
                price: price,
                description: description,
                categoryId: category,
                images: ["https://imgur.com/9LFjwpI"]
            },
            key: 'products'
        }
        addProduct(data2)
        setCategory('')
        setTitle('')
        setPrice('')
        setDescription('')
        reset()
        navigate('/products/list')
    }
    return (
        <Container maxWidth='sm' sx={style}>
            <Box >
                <form action="" style={{ paddingTop: '3rem' }} onSubmit={handleSubmit}>
                    <Typography variant="h6" color="primary.dark" style={{ marginBottom: '1.5rem' }}>
                        Add Product
                    </Typography>
                    <TextField
                        label='title'
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            sx: {
                                fontSize: '0.875rem',
                            },
                        }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        label='price'
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            sx: {
                                fontSize: '0.875rem',
                            },
                        }}
                        sx={{ mt: 2 }}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        label='description'
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            sx: {
                                fontSize: '0.875rem',
                            },
                        }}
                        sx={{ mt: 2 }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        sx={{ mt: 2 }}
                        value={category}

                        label="Category"
                        fullWidth
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {
                            data?.map((item, index) => (
                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            ))
                        }

                    </Select>


                    <Button variant='contained' type='submit' fullWidth size='large' sx={{ mt: 4 }}>
                        Save
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default AddProduct
