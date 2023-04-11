import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from '../context/AuthContext';
// Pages
import Home from '../pages/Homepage/Home'
import Account from '../pages/Profile/Account'
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import NotFound from '../pages/NotFound';
import LoginLayout from '../layouts/LoginLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Settings from '../pages/Settings/Settings';
import CreatePost from '../components/Posts/CreatePost';
import Posts from '../components/Posts/Posts';

function IndexRoute() {
    const { user } = useAuth();
    return (
        <>
            <Routes>
                {/* If there is no user */}
                {!user &&
                    <Route path="/" element={<LoginLayout />} >
                        <Route index element={<Login />} />
                        <Route path='signup' element={<Register />} />
                    </Route>
                }

                {/* If user signed in */}
                {user &&
                    <Route path="/" element={<DashboardLayout />} >
                        <Route index element={<Home />} />
                        <Route path='signup' element={<Navigate replace to='/' />} />
                        <Route path="account" element={<Account />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="create-post" element={<CreatePost />} />
                        <Route path="posts" element={<Posts />} />
                    </Route>
                }

                {/* Not Found Pages */}
                <Route path='*' element={<NotFound />} />

            </Routes>
        </>
    )
}

export default IndexRoute