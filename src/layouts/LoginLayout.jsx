import React from 'react'
import { Outlet } from 'react-router';

const LoginLayout = () => {
    return (
        <>
            <div className="navbar bg-secondary-focus ">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Portfolyo Portalı</a>
                </div>
            </div>

            <Outlet />
        </>
    )
}

export default LoginLayout
