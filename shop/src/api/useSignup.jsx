import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const fetchSignup = async function (data) {
    const response = axios.post('https://api.escuelajs.co/api/v1/users/', data)
    return response.data
}

const useSignup = () => {
    return useMutation(
        { mutationFn: fetchSignup, }
    )
}
export default useSignup