import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Example from '../components/Navbar/Navbar'

const DashboardLayout = () => {
    return (
        <>
            {/* <Navbar /> */}
            <Example />
            <Outlet />
        </>
    )
}

export default DashboardLayout
