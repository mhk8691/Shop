import { useDispatch, useSelector } from "react-redux"
import Cookies from 'js-cookie'
import { login } from "../Slice/accountSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
function Cart() {
    const cartList = useSelector(state => state.cart.cartList)
    const dispatch = useDispatch()
    const token = Cookies.get('access_token')
    const isLogin = useSelector(state => state.account.isLogin)
    const navigator = useNavigate()

    useEffect(() => {
        document.title = 'Cart'
        if (!isLogin) {

            if (token) {
                dispatch(login(token))
            }
        }
    }, [token, dispatch]);

    return (
        <div>
            {cartList && cartList.map((item) => (
                <li key={item.id}>{item.title}</li>
            ))}
            {cartList.length === 0 && <h1>No items in your cart</h1>}
        </div>
    )
}

export default Cart
