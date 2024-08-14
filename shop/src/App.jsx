import { RouterProvider } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"
import AppLayout from './components/AppLayout/AppLayout.jsx'
import Typography from '@mui/material/Typography'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Typography variant="body1" color="initial">hello</Typography>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />

}

export default App
