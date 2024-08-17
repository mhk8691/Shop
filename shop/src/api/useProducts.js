import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const BASE_URL = `https://api.escuelajs.co/api/v1/products/`
const fetchProducts = async ({ queryKey }) => {
    const [_key, object] = await queryKey;
    const response = await axios.get(`${BASE_URL}${object.key}${object.params}`);
    return response.data;
};

const useProducts = (object) => {
    return useQuery({
        queryKey: ['products', object],
        queryFn: fetchProducts,

    });
};
export default useProducts