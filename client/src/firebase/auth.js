import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const register = async (email, password, confirmPassword) => {
    try {
        if(email === '' || password === '') {
            throw new Error('Email and password cannot be empty');
        }
        if(password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        return await createUserWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.error(error);
    }
}

export const login = async (email, password) => {
    try {
        if(email === '' || password === '') {
            throw new Error('Email and password cannot be empty');
        }
        return await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.error(error);
    }
}

export const logout = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error(error);
    }
}