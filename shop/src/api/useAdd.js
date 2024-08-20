import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const fetchAdd = async function (data) {
    const BASE_URL = 'https://api.escuelajs.co/api/v1/'
    const response = await axios.post(`${BASE_URL}${data.key}`, data.object)
    return response.data
}

const useAdd = (key) => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: fetchAdd,
            onSuccess: () => {
                queryClient.invalidateQueries([key])
            }
        }
    )
}
export default useAdd