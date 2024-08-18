import { useDispatch, useSelector } from 'react-redux'
import Categories from '../components/Categories/Categories.jsx'
import Slider from '../components/Slider/Slider.jsx'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { login } from '../Slice/accountSlice.js'
function HomePage() {
    document.title = "Home"
    const dispatch = useDispatch()
    const token = Cookies.get('access_token')
    const isLogin = useSelector(state => state.account.isLogin)
    useEffect(() => {

        if (!isLogin) {

            if (token) {
                dispatch(login(token))
            }
        }
    }, [token, dispatch]);
    return (
        <div>
            <Slider />
            <Categories />
        </div>
    )
}

export default HomePage
