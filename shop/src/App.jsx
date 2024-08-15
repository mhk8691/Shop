import { RouterProvider } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"
import AppLayout from './components/AppLayout/AppLayout.jsx'
import Typography from '@mui/material/Typography'
import HomePage from "./pages/HomePage.jsx"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />

}

export default App
