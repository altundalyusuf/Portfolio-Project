import React from 'react'
import { Route, Routes } from "react-router-dom"
import { useAuth } from '../context/AuthContext';
// Pages
import Home from '../pages/Home'
import Account from '../pages/Account'
import Login from '../pages/Login/Login';
import Signup from '../components/Login/Signup';
import NotFound from '../pages/NotFound';
import LoginLayout from '../layouts/LoginLayout';
import DashboardLayout from '../layouts/DashboardLayout';

function IndexRoute() {
    const { user } = useAuth();
    return (
        <>
            <Routes>
                {/* If there is no user */}
                {!user &&
                    <Route path="/" element={<LoginLayout />} >
                        <Route index element={<Login />} />
                        <Route path='signup' element={<Signup />} />
                    </Route>
                }

                {/* If user signed in */}
                {user &&
                    <Route path="/" element={<DashboardLayout />} >
                        <Route index element={<Home />} />
                        <Route path="account" element={<Account />} />
                    </Route>
                }

                {/* Not Found Pages */}
                <Route path='*' element={<NotFound />} />

            </Routes>
        </>
    )
}

export default IndexRoute