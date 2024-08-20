import { Box, Typography, Button } from '@mui/material'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

const avatarStyle = {
    width: '150px',
    borderRadius: '50%',
    border: '5px solid red',
    borderLeftColor: '#EF476F',
    borderBottomColor: '#EF476F',
    marginTop: '2rem',
    borderTopColor: '#06D6A0',
    borderRightColor: '#06D6A0',
}
function Info({ data }) {
    const navigate = useNavigate()
    return (
        <Box display="flex" justifyContent="start" flexDirection={'column'} columnGap={4}>

            <img src={data?.avatar} alt="profile" style={avatarStyle} />

            <Box mt={2} ml={2}>
                <Typography variant="h6" gutterBottom component="div" color='primary.dark'>
                    name:  <Typography variant="h6" gutterBottom component="span" color='primary.light'>{data?.name}</Typography>
                </Typography>
                <Typography variant="h6" gutterBottom component="div" color='primary.dark'>
                    email:  <Typography variant="h6" gutterBottom component="span" color='primary.light'>{data?.email}</Typography>
                </Typography>
                <Button variant='contained' style={{ marginTop: 15 }} startIcon={<LocalMallIcon />} onClick={() => navigate('/products/list')} sx={{ mb: 2 }}>Products</Button>
                <Button variant='contained' style={{ marginTop: 15, marginLeft: 5 }} color='sungLow' startIcon={<CategoryIcon />} onClick={() => navigate('/categories/list')} sx={{ mb: 2 }}>Categories</Button>

            </Box>
        </Box>



    )
}

export default Info
