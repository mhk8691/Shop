import axios from "axios";
import { useQuery } from "@tanstack/react-query"
import Cookies from 'js-cookie';

const fetchProfile = async () => {
    if (!Cookies.get('access_token')) return null
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
            "Authorization": `Bearer ${Cookies.get('access_token')}`
        }
    })
    return response.data
}

const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
    })
}
export default useProfile