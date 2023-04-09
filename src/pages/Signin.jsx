import React, { useEffect } from 'react'
import { GoogleButton } from 'react-google-button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const Signin = () => {

    const { googleSignIn, user } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user != null) {
            navigate('/account')
        }
    }, [user])

    return (
        <div>
            <h1 className='text-center text-3xl font-bold py-8'>Sign in</h1>
            <div className='max-w-[240px] m-auto py-4'>
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>
        </div>
    )
}

export default Signin