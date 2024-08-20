import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useUpdateCategories from "../../api/useUpdate"

const style = {
    marginTop: '5rem',
    backgroundColor: '#efefef',
    paddingBottom: 7,
    borderRadius: 5,
}

function Edit({ data }) {
    const [state, setState] = useState(data?.name)
    const { mutateAsync: updateCategory, reset } = useUpdateCategories()
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        const data2 = {
            id: data?.id,
            object: {
                name: state,
            },
            key: 'categories'
        }
        updateCategory(data = data2)
        setState('')
        reset()
        navigate('/categories/list')
    }

    return (
        <Container maxWidth='sm' sx={style}>
            <Box >
                <form action="" style={{ paddingTop: '3rem' }} onSubmit={handleSubmit}>
                    <Typography variant="h6" color="primary.dark" style={{ marginBottom: '1.5rem' }}>
                        Categories Edit
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

                        value={state}
                        onChange={(e) => setState(e.target.value)}

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
