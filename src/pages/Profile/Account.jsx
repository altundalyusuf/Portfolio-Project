import React from 'react'
import { useAuth } from '../../context/AuthContext';

const Account = () => {
    const { user } = useAuth();

    return (
        <div className='w-[300px] m-auto'>
            <h1 className='text-center text-2xl font-bold pt-12'>Hesabım</h1>
            <div>
                <p>Hoşgeldin, {user.displayName ? user.displayName : user.email}</p>
            </div>
            <h1 className='text-center text-lg font-bold py-8'>Bu sayfada isim değişikliği, kişisel bilgilerim vs yer alacak.</h1>
        </div>
    )
}

export default Account
