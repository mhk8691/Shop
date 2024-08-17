import { Grid } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
function ProductsItem({ item }) {
    const navigate = useNavigate();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ borderRadius: 4 }} onClick={() => navigate(`/product/${item.id}`)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={item.images[0]}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" sx={{ color: 'primary.dark' }}>
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                            {item.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Typography variant="body1" color="primary.dark" sx={{ px: 1, pb: 1 }}>
                        ${item.price}
                    </Typography>
                </CardActions>
            </Card>
        </Grid>

    )
}

export default ProductsItem
