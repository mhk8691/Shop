import { Box, Button, Container, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAdd from "../../api/useAdd"

const style = {
    marginTop: '5rem',
    backgroundColor: '#efefef',
    paddingBottom: 7,
    borderRadius: 5,
}
function AddProduct() {
    const [name, setName] = useState('')

    const { mutateAsync: addCategory, reset } = useAdd()
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        const data2 = {
            object: {
                name: name,

                image: "https://imgur.com/9LFjwpI"
            },
            key: 'categories'
        }
        addCategory(data2)
        setName('')
        reset()
        navigate('/categories/list')
    }
    return (
        <Container maxWidth='sm' sx={style}>
            <Box >
                <form action="" style={{ paddingTop: '3rem' }} onSubmit={handleSubmit}>
                    <Typography variant="h6" color="primary.dark" style={{ marginBottom: '1.5rem' }}>
                        Add Category
                    </Typography>
                    <TextField
                        label='name'
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            sx: {
                                fontSize: '0.875rem',
                            },
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />


                    <Button variant='contained' type='submit' fullWidth size='large' sx={{ mt: 4 }}>
                        Save
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default AddProduct
