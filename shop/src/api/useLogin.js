import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const fetchLogin = async function (data) {
    const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', data)
    return response.data
}

const useLogin = () => {
    return useMutation(
        {
            mutationFn: fetchLogin
        }
    )
}
export default useLogin