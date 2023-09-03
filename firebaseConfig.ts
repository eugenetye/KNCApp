// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN-Ff6g14sbhpuNWZ6OL9tk5S0kHQKQX0",
  authDomain: "kncapp-6f5fc.firebaseapp.com",
  projectId: "kncapp-6f5fc",
  storageBucket: "kncapp-6f5fc.appspot.com",
  messagingSenderId: "458963000820",
  appId: "1:458963000820:web:e0918cb31c9509872f2da1",
  measurementId: "G-CQW4WLPT21"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
