// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmlFgY2z1jGKT3QExvw9wCTiaUxaPUYfg",
    authDomain: "auth-firebase-41263.firebaseapp.com",
    projectId: "auth-firebase-41263",
    storageBucket: "auth-firebase-41263.appspot.com",
    messagingSenderId: "1052171803820",
    appId: "1:1052171803820:web:975e5d64543922eb791309"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage();
export const db = getFirestore(app);


// Storage functions
// Upload profile photo to user
export const upload = async (file, currentUser, setLoading) => {
    const fileRef = ref(storage, currentUser.uid + '.png');
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef)
    updateProfile(currentUser, { photoURL })
    setLoading(false);
    alert('Profil fotoğrafı başarıyla değişti.');
} 