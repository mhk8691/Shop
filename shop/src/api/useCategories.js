import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fethCategories = async () => {
    const response = await axios.get('https://api.escuelajs.co/api/v1/categories')
    return response.data
}

const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fethCategories,
    })
}
export default useCategories