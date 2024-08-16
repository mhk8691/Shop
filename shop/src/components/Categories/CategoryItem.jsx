import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function CategoryItem({ item }) {
    return (
        <Link to={`/category/${item.id}`}>
            <ImageListItem key={item.image} sx={{ position: 'relative' }}>
                <img
                    srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                    style={{ borderRadius: '10px', width: '324px', height: '324px' }}
                    alt={item.name}
                    loading="lazy"
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, paddingLeft: '10px' }}>
                    <Typography variant="h6" gutterBottom color='sungLow.dark'>
                        {item.name}
                    </Typography>
                </div>
            </ImageListItem>
        </Link>
    )
}

export default CategoryItem
