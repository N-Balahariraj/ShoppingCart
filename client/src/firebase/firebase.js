// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-sYNFU6c7MMGxBaU8b_vlGQy5f8E4LNE",
  authDomain: "e-commerce-ae1b9.firebaseapp.com",
  projectId: "e-commerce-ae1b9",
  storageBucket: "e-commerce-ae1b9.appspot.com",
  messagingSenderId: "398030863362",
  appId: "1:398030863362:web:fb0a834281a72a94ef3b1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage, db };