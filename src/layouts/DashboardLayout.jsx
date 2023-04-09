import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar/Navbar'

const DashboardLayout = () => {
    return (
        <>
            {/* <Navbar /> */}
            <Navbar />
            <Outlet />
        </>
    )
}

export default DashboardLayout
