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
import ProductsList from './Admin/Products/ProductsList.jsx'
import ProductsEdit from "./Admin/Products/ProductsEditPage.jsx"
import ProductsAddPage from "./Admin/Products/AddProductPage.jsx"
import CategoriesAdmin from "./Admin/Category/CategoriesList.jsx"
import CategoriesEdit from "./Admin/Category/CategoriesEditPage.jsx"
import AddCategoryPage from "./Admin/Category/AddCategoryPage.jsx"
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
        path: '/products/',
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
      {
        path: '/products/list',
        element: <ProductsList />
      },
      {
        path: '/products/edit/:id',
        element: <ProductsEdit />
      },
      {
        path: '/products/add',
        element: <ProductsAddPage />
      },
      {
        path: '/categories/list',
        element: <CategoriesAdmin />
      },
      {
        path: '/categories/edit/:id',
        element: <CategoriesEdit />
      },
      {
        path: '/categories/add',
        element: <AddCategoryPage />
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />

}

export default App
