import React, { useEffect, useRef, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { GoogleButton } from 'react-google-button';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase';

const Signin = () => {
    const [authData, setAuthData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const errorRef = useRef();


    const onChangeFunc = (e) => {
        setAuthData({ ...authData, [e.target.name]: e.target.value });
    }
    // Sign in function
    const authFunc = async () => {
        try {
            const data = await signInWithEmailAndPassword(auth, authData.email, authData.password)
            const user = data.user;
            user && navigate('/');
        } catch (err) {
            const errorMessage = (message) => (
                `
            <div class="alert alert-error shadow-sm">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>${message}</span>
            </div>
          </div>
                `
            )
            if (err.message === 'Firebase: Error (auth/wrong-password).') {
                errorRef.current.innerHTML = errorMessage('Hatalı şifre.')
            }
            else if (err.message === 'Firebase: Error (auth/missing-password).') {
                errorRef.current.innerHTML = errorMessage('Lütfen şifrenizi girin.')
            }
            else if (err.message === 'Firebase: Error (auth/invalid-email).') {
                errorRef.current.innerHTML = errorMessage('Geçersiz mail adresi')
            }
            else if (err.message === 'Firebase: Error (auth/user-not-found).') {
                errorRef.current.innerHTML = errorMessage('Böyle bir hesap bulunmamaktadır.')
            }
            else {
                errorRef.current.innerHTML = errorMessage(err.message)
            }
            console.log(err.message);

        }
    }

    // Google login 
    const { googleSignIn, user } = useAuth();

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
        <>
            <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
                            Hesabına giriş yap
                        </h2>
                    </div>
                    <form className="mt-8 space-y-5" action="#" method="POST">
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={authData.email}
                                    onChange={onChangeFunc}
                                    required
                                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="E-Posta"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={authData.password}
                                    onChange={onChangeFunc}
                                    required
                                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Şifre"
                                />
                            </div>
                        </div>

                        <div ref={errorRef}>

                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                Hesabın yok mu?
                            </div>

                            <div className="text-sm">
                                <Link to="signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Kayıt Ol
                                </Link>
                            </div>
                        </div>


                        <div>
                            <button
                                type="button"
                                onClick={authFunc}
                                className="transition ease-in active:-translate-y-1 active:scale-90  duration-200 group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Giriş
                            </button>
                        </div>
                    </form>
                    {/* Google auth */}
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="divider m-0">veya</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="max-w-[240px] m-auto">
                            {/* type="light" eklersen buton beyaz olur */}
                            <GoogleButton label='Google ile giriş' onClick={handleGoogleSignIn} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin
