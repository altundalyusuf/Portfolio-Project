// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
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