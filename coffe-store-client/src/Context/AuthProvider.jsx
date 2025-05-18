import React from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({children}) => {

    const signUpWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const user = {
       signUpWithEmail,
       loginUser
    }

    return (
        <AuthContext value={user}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;