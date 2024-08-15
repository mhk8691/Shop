import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchProducts = async () => {
    const response = await axios.get('https://api.escuelajs.co/api/v1/products?offset=10&limit=5')
    return response.data
}

const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })
}
export default useProducts