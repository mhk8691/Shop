import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const fetchUpdateUser = async (data) => {
    const response = await axios.put(`https://api.escuelajs.co/api/v1/users/${data.id}`, {
        name: data.name,
        email: data.email,
    })
    return response.data
}

const useUpdateUser = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: fetchUpdateUser,
            onSuccess: () => {
                queryClient.invalidateQueries(['profile'])
            }
        }
    )
}
export default useUpdateUser