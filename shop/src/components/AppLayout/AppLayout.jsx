import { Outlet } from "react-router-dom"
import Navbar from '../Navbar/Navbar.jsx'
import BasicSpeedDial from '../Navbar/BasicSpeedDial.jsx'

function AppLayout() {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
                <BasicSpeedDial />

            </main>
        </div>
    )
}

export default AppLayout
