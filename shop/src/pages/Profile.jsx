import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useProfile from "../api/useProfile"
import Info from "../components/Profile/Info"
import { CircularProgress, Container, IconButton } from '@mui/material'
import EditProfile from "../components/Profile/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { login } from "../Slice/accountSlice";

const containerStyle = {
    backgroundColor: '#efefef',
    borderRadius: 5,
    pb: 5,
    mt: 13,
    position: 'relative'
}
const loaingStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100
}
const editStyle = { position: 'absolute', top: 0, right: 0 }

function Profile() {
    const [editState, setEditState] = useState(false)
    const { data, isPending } = useProfile()
    const dispatch = useDispatch()
    const token = Cookies.get('access_token')
    const isLogin = useSelector(state => state.account.isLogin)
    const navigate = useNavigate()


    useEffect(() => {
        document.title = 'Profile'
    }, []);


    function handleEdit() {
        setEditState(!editState)
    }

    useEffect(() => {

        if (!isLogin) {

            if (token) {
                dispatch(login(token))
            }
            else {
                navigate('/login')
            }
        }
    }, [token, dispatch]);

    if (isPending) return <CircularProgress color="primary" sx={loaingStyle} />
    return (
        < Container maxWidth="sm" sx={containerStyle} >
            <IconButton color="primary" size="large" sx={editStyle} onClick={handleEdit} >
                {!editState ? <EditIcon fontSize="large" /> : <AccountCircleIcon fontSize="large" />}
            </IconButton>
            {
                editState ? <EditProfile data={data} setEditState={setEditState} /> : <Info data={data} />
            }
        </ Container >
    )
}

export default Profile
