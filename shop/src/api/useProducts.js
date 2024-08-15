import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchProducts = async ({ queryKey }) => {
    const [_key, categoryId] = queryKey;
    const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`);
    return response.data;
};

const useProducts = (categoryId) => {
    return useQuery({
        queryKey: ['products', categoryId],
        queryFn: fetchProducts,

    });
};
export default useProducts