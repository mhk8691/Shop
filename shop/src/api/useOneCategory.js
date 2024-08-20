import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fethCategory = async ({ queryKey }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const [_key, object] = await queryKey;
    const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${object.id}`)
    return response.data
}

const useCategory = (object) => {
    return useQuery({
        queryKey: ['category', object],
        queryFn: fethCategory,
    })
}
export default useCategory