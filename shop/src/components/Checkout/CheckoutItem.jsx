import { Grid, Typography, Box, Badge } from '@mui/material'
// style

const contentStyle = {
    display: 'flex',
}
const textStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    marginLeft: '10px',
}


function CheckoutItem({ item, style }) {
    const cartStyle = {
        borderRadius: '10px',
        padding: '10px',
        marginLeft: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: style,
    }
    return (
        <Grid item xs={12} sx={cartStyle} border={2} borderColor={'primary.light'} position={'relative'}>
            {!style ? (
                <Badge badgeContent={item.quantity} color="primary" sx={{ position: 'absolute', top: 0, right: 0 }}>
                </Badge>
            ) : null}
            <Box sx={contentStyle} >
                <Box>
                    <img src={item.images[0]} alt={item.title} width={80} height={80} style={{ borderRadius: '5px' }} />
                </Box>
                <Box sx={textStyle}>
                    <Typography variant="body1" color='primary.dark'>
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color='secondary.dark'>
                        ${item.totalPrice}
                    </Typography>
                </Box>
            </Box>

        </Grid>
    )
}

export default CheckoutItem
