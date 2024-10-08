import { Box, Typography, Container, TextField, Button, Link, IconButton, Snackbar } from '@mui/material'
import useSignup from '../api/useSignup'
import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import CloseIcon from '@mui/icons-material/Close';

function Login() {
    const { mutateAsync: signup, reset, isPending } = useSignup()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [focus, setFocus] = useState(false)
    const [token, setToken] = useState('')
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const data = {
                name,
                email,
                password,
                avatar: 'https://picsum.photos/800'
            }
            await signup(data)
            setOpen(true)
            setMessage('Sign up Successful')
            const intervalSignup = setInterval(() => {
                setName("")
                setEmail("")
                setPassword("")
                reset()
                setFocus(false)
                navigate('/login')
                clearInterval(intervalSignup);
            }, 2000)
        }
        catch (e) {
            setOpen(true)
            setMessage('Invalid email or password or name')
            setFocus(false)
        }
    }
    useEffect(() => {
        document.title = 'Sign up'
    }, [])
    useEffect(() => {
        setToken(Cookies.get('access_token'))
    }, [token])
    function handleClose() {
        setOpen(false)
        setMessage('')
    }
    if (token) return navigate('/')
    const action = (
        <>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );
    return (

        <>
            <Container sx={{ mt: 5 }} maxWidth="sm">
                <Box sx={{ backgroundColor: 'primary.light', py: 1.5, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', }} >
                    <Typography variant="h6" px={6} color='primary.contrastText' >
                        Sign up
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: '#efefef', py: 2, }} >

                    <Box px={5} mt={3} pb={5}>
                        <form method="post" onSubmit={handleSubmit}>
                            <TextField
                                label="userName"
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

                            <Button variant="contained" sx={{ mt: 4, }} disabled={isPending} fullWidth size="large" type="submit">
                                {isPending ? 'Loading...' : 'Sign up'}
                            </Button>
                            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', }}>
                                Already have an account?
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    underline="none"
                                    sx={{ ml: .5 }}
                                    color="primary.dark"

                                >
                                    Login
                                </Link>
                            </Typography>
                        </form>
                    </Box>
                </Box>
            </Container>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                backgroundColor='primary.light'
                message={message}
                action={action}
            />
        </>

    )
}

export default Login
