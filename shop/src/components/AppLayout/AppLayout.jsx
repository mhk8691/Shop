import { Outlet } from "react-router-dom"
import Navbar from '../Navbar/Navbar.jsx'
function AppLayout() {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout
