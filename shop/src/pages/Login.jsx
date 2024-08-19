import { Box, Typography, Container, TextField, Button, Link } from '@mui/material'
import useLogin from '../api/useLogin'
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Slice/accountSlice';
function Login() {
    const { mutateAsync: Login, reset, isPending } = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [focus, setFocus] = useState(false)
    const [token, setToken] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            email,
            password,
        }
        const res = await Login(data)


        const token = res.access_token;
        Cookies.set('access_token', token, { expires: 7 });
        dispatch(login(token))
        navigate('/')
        setEmail("")
        setPassword("")
        reset()
        setFocus(false)
    }
    useEffect(() => {
        document.title = 'Login'
    }, [])

    useEffect(() => {
        setToken(Cookies.get('access_token'))
    }, [token])
    if (token) return navigate('/')
    return (

        <Container sx={{ mt: 10 }} maxWidth="sm">
            <Box sx={{ backgroundColor: 'primary.light', py: 1.5, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', }} >
                <Typography variant="h6" px={6} color='primary.contrastText' >
                    Login
                </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#efefef', py: 2, }} >

                <Box px={5} mt={3} pb={5}>
                    <form method="post" onSubmit={handleSubmit}>

                        <TextField label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
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
                            {isPending ? 'Loading...' : 'Login'}
                        </Button>
                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', }}>
                            Don't have an account?
                            <Link
                                component={RouterLink}
                                to="/signup"
                                underline="none"
                                sx={{ ml: .5 }}
                                color="primary.dark"

                            >
                                Sign up
                            </Link>
                        </Typography>
                    </form>
                </Box>
            </Box>
        </Container>

    )
}

export default Login
