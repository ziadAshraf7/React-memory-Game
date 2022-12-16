import { collection, getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyA4xmoT4YDGN6vZXzShTKj5FpWaPwF_dTQ",
    authDomain: "memory-game-4aa4e.firebaseapp.com",
    projectId: "memory-game-4aa4e",
    storageBucket: "memory-game-4aa4e.appspot.com",
    messagingSenderId: "356675683074",
    appId: "1:356675683074:web:dfae8d26d7665c450ef81b",
    measurementId: "G-5VT7R11KL7"
  };
  export const FirebaseApp = initializeApp(firebaseConfig);
  
  export const db = getFirestore()
  
  export const auth = getAuth(FirebaseApp)
  
  export const usersCollection = collection(db , "users")