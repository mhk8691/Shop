import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchProduct = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = await axios.get('https://api.escuelajs.co/api/v1/products?offset=15&limit=5')
    return response.data
}

const useProduct = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProduct,
    })
}
export default useProduct