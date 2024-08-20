import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const fetchUpdate = async (data) => {
    const BASE_URL = 'https://api.escuelajs.co/api/v1/'
    const response = await axios.put(`${BASE_URL}${data.key}/${data.id}`, data.object)
    return response.data
}

const useUpdate = (key) => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: fetchUpdate,
            onSuccess: () => {
                queryClient.invalidateQueries([key])
            }
        }
    )
}
export default useUpdate