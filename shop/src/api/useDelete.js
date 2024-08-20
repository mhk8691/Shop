import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const fetchDelete = async ({ url, id }) => {
    const BASE_URL = 'https://api.escuelajs.co/api/v1/'
    const response = await axios.delete(`${BASE_URL}${url}/${id}`)
    return response.data
}

export default function useDelete(key) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: fetchDelete,
        onSuccess: () => {
            queryClient.invalidateQueries([key])
        }
    })
}