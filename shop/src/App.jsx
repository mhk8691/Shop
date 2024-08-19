import { RouterProvider } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"
import AppLayout from './components/AppLayout/AppLayout.jsx'
import HomePage from "./pages/HomePage.jsx"
import Category from "./pages/Category.jsx"
import SignUp from "./pages/SignUp.jsx"
import Products from "./pages/Products.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"
import Login from "./pages/Login.jsx"
import Profile from "./pages/Profile.jsx"
import Cart from "./pages/Cart.jsx"
import Checkout from "./pages/Checkout.jsx"
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/category/:categoryId',
        element: <Category />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/product/:productId',
        element: <ProductDetail />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />

}

export default App
