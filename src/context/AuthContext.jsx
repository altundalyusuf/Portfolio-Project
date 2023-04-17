import { useContext, createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from 'react-router';
import { auth } from '../firebase';


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUid(user.uid);
        }
    }, [user]);

    // Sign in with Google
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }

    // Log out
    const logOut = () => {
        signOut(auth);
    }

    // Track user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    // When logout redirect to login page
    useEffect(() => {
        if (user == null) {
            navigate('/')
        }
    }, [user])



    // Export to other files
    const values = {
        googleSignIn,
        logOut,
        user,
        uid,
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}