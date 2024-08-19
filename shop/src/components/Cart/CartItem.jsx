import { Grid, Typography, Box, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { useDispatch } from "react-redux"
import { sumQuantity, minusQuantity } from "../../Slice/CartSlice"
// style
const cartStyle = {
    borderRadius: '10px',
    padding: '10px',
    marginLeft: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}
const contentStyle = {
    display: 'flex',
}
const textStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    marginLeft: '10px',
}
const quantityStyle = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px'
}


function CartItem({ item }) {
    const dispatch = useDispatch()
    return (
        <Grid item xs={12} sx={cartStyle} border={2} borderColor={'primary.light'}>
            <Box sx={contentStyle}>
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
            <Box sx={quantityStyle}>
                <IconButton color='primary' onClick={() => dispatch(sumQuantity(item.id))}>
                    <AddShoppingCartIcon />
                </IconButton>
                <Typography variant="body2" color='secondary.dark' mx={.5}>{item.quantity}</Typography>
                <IconButton color='primary' onClick={() => dispatch(minusQuantity(item.id))} >
                    <RemoveShoppingCartIcon />
                </IconButton>
            </Box>
        </Grid>
    )
}

export default CartItem
