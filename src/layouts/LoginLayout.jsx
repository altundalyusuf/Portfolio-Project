import React from 'react'
import { Outlet } from 'react-router';

const LoginLayout = () => {
    return (
        <>
            <div className="navbar bg-secondary-focus text-primary-content">
                <a className="btn btn-ghost normal-case text-xl">Benim Portfolyom</a>
            </div>
            <Outlet />
        </>
    )
}

export default LoginLayout
