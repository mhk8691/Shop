import { Box, Typography, Container, TextField, Button } from '@mui/material'
import useSignup from '../api/useSignup'
import { useEffect, useState } from 'react'

function Login() {
    const { mutateAsync: signup, reset } = useSignup()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [focus, setFocus] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            name,
            email,
            password,
            avatar: 'https://picsum.photos/800'
        }
        await signup(data)
        setName("")
        setEmail("")
        setPassword("")
        reset()
        setFocus(false)
    }
    useEffect(() => {
        document.title = 'Sign up'
    }, [])
    return (

        <Container sx={{ mt: 7 }} maxWidth="sm">
            <Box sx={{ backgroundColor: 'primary.light', py: 1.5, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', }} >
                <Typography variant="h6" px={6} color='primary.contrastText' >
                    Sign up
                </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#efefef', py: 2, }} >

                <Box px={5} mt={3} pb={5}>
                    <form method="post" onSubmit={handleSubmit}>
                        <TextField
                            label="UserName"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                sx: {
                                    fontSize: '0.875rem',
                                },
                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={focus}
                        />
                        <TextField label="Email"
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
                            disabled={focus}
                        />
                        <TextField label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            sx={{ mt: 4 }}
                            InputLabelProps={{
                                sx: {
                                    fontSize: '0.875rem',
                                },
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={focus}

                        />

                        <Button variant="contained" sx={{ mt: 4, }} fullWidth size="large" type="submit">
                            Sign up
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>

    )
}

export default Login
