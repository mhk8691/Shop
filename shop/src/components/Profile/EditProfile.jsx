import { Box, TextField, Typography, Button } from "@mui/material"
import { useState } from "react"
import useUpdateUser from "../../api/useUpdateUser"

function EditeProfile({ data, setEditState }) {
    const [name, setName] = useState(data?.name)
    const [email, setEmail] = useState(data?.email)
    const { mutateAsync: updateUser, reset } = useUpdateUser()
    function handleSubmit(e) {
        e.preventDefault()
        const newObject = {
            ...data,
            name,
            email
        }
        updateUser(data = newObject)

        setEditState(false)

        reset()
    }
    return (
        <Box >
            <form action="" style={{ paddingTop: '3rem' }} onSubmit={handleSubmit}>
                <Typography variant="h6" color="primary.dark" style={{ marginBottom: '1.5rem' }}>
                    Edit Profile
                </Typography>
                <TextField
                    label="name"
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
                <TextField label="email"
                    variant="outlined"
                    type="email"
                    fullWidth
                    sx={{ mt: 4 }}
                    InputLabelProps={{
                        sx: {
                            fontSize: '0.875rem',
                        },
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                />
                <Button variant='contained' type='submit' fullWidth size='large' sx={{ mt: 4 }}>
                    Save
                </Button>
            </form>
        </Box>
    )
}

export default EditeProfile
