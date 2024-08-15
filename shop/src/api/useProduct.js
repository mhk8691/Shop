import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchProduct = async () => {
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