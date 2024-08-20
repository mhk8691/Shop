import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"
import useUpdateProduct from "../../api/useUpdate"
import { useNavigate } from "react-router-dom"

const style = {
    marginTop: '5rem',
    backgroundColor: '#efefef',
    paddingBottom: 7,
    borderRadius: 5,
}

function Edit({ data }) {
    const [state, setState] = useState(data?.title)
    const [state2, setState2] = useState(data?.price)
    const { mutateAsync: updateProduct, reset } = useUpdateProduct()
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        const data2 = {
            id: data?.id,
            object: {
                title: state,
                price: state2,
            },
            key: 'products',
        }
        updateProduct(data2)
        setState('')
        setState2('')
        reset()
        navigate('/products/list')
    }

    return (
        <Container maxWidth='sm' sx={style}>
            <Box >
                <form action="" style={{ paddingTop: '3rem' }} onSubmit={handleSubmit}>
                    <Typography variant="h6" color="primary.dark" style={{ marginBottom: '1.5rem' }}>
                        Product Edit
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

                        value={state}
                        onChange={(e) => setState(e.target.value)}

                    />
                    <TextField label='price'
                        variant="outlined"
                        type='number'
                        fullWidth
                        sx={{ mt: 4 }}
                        InputLabelProps={{
                            sx: {
                                fontSize: '0.875rem',
                            },
                        }}
                        value={state2}
                        onChange={(e) => setState2(e.target.value)}

                    />
                    <Button variant='contained' type='submit' fullWidth size='large' sx={{ mt: 4 }}>
                        Save
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default Edit
