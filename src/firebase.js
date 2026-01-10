// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6pqRTeSZWBi4u21N3OWjiKopwvsdFcVk",
  authDomain: "portofolio-1b7e1.firebaseapp.com",
  projectId: "portofolio-1b7e1",
  storageBucket: "portofolio-1b7e1.firebasestorage.app",
  messagingSenderId: "625326357322",
  appId: "1:625326357322:web:a3ac481eb64552e0c11fb3"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
