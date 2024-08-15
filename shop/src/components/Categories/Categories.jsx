import useCategories from "../../api/useCategories"
import ImageList from '@mui/material/ImageList';
import useMediaQuery from '@mui/material/useMediaQuery';
import CategoryItem from './CategoryItem';
function Categories() {
    const { data, isLoading, error } = useCategories()
    const sm = useMediaQuery('(min-width:600px)');
    const md = useMediaQuery('(min-width:900px)');
    const lg = useMediaQuery('(min-width:1200px)');
    const xl = useMediaQuery('(min-width:1536px)');

    let cols = 1;
    if (sm) cols = 2;
    if (md) cols = 3;
    if (lg) cols = 4;
    if (xl) cols = 5;

    // const imageCategory = {}

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            <ImageList cols={cols} gap={10} style={{ marginTop: '3rem' }} >
                {data?.map((item) => (
                    <CategoryItem key={item.id} item={item} />
                ))}
            </ImageList>
        </div >
    )
}

export default Categories
