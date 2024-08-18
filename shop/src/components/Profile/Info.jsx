import { Container, Grid, Box, IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'



const avatarStyle = {
    width: '200px',
    borderRadius: '50%',
    border: '5px solid red',
    borderLeftColor: '#EF476F',
    borderBottomColor: '#EF476F',
    marginTop: '2rem',
    borderTopColor: '#06D6A0',
    borderRightColor: '#06D6A0',
}
function Info({ data }) {
    return (
            <Box display="flex" justifyContent="start" alignItems="center" columnGap={4}>

                <img src={data?.avatar} alt="profile" style={avatarStyle} />

                <Box >
                    <Typography variant="h6" gutterBottom component="div" color='primary.dark'>
                        name:  <Typography variant="h6" gutterBottom component="span" color='primary.light'>{data?.name}</Typography>
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div" color='primary.dark'>
                        email:  <Typography variant="h6" gutterBottom component="span" color='primary.light'>{data?.email}</Typography>
                    </Typography>
                </Box>
            </Box>



    )
}

export default Info
