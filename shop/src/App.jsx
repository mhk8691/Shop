import { RouterProvider } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"
import AppLayout from './components/AppLayout/AppLayout.jsx'
import HomePage from "./pages/HomePage.jsx"
import Products from "./pages/Products.jsx"
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
        element: <Products />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />

}

export default App
