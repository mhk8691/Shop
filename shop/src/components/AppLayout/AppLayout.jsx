import { Outlet } from "react-router-dom"
import Typography from '@mui/material/Typography'
import Navbar from '../Navbar/Navbar.jsx'
function AppLayout() {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <footer>
                <Typography variant="body1" color="initial">footer</Typography>
            </footer>
        </div>
    )
}

export default AppLayout
