import React, { useCallback, useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    // if logged in navigate to Home/User Profile
    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn, navigate]);

    const loginUser = useCallback((e) => {
        e.preventDefault();

        // assign email and password to variables from form
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // since the user is true, set logged in
            setIsLoggedIn(true);
            //provide some information about the user via setState
            setUserInformation({
                email: user.email,
                displayName: user.displayName,
                uid: user.uid,
                accessToken: user.accessToken,
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({error, errorCode, errorMessage });
            setErrors(errorMessage);
        })
    }, [setIsLoggedIn, setUserInformation]);
    
    return (
    <>
        <Header 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn} 
            setUserInformation={setUserInformation}
        />
        <div className="PageWrapper">
            <h1 className='PageTitle'>Welcome back!</h1>
            <div class="InputField">
                <LoginForm loginUser={loginUser}/>
                <p>{errors}</p>
            </div>
            <p className='Account'>Don't have an account? <Link to="/create">Create Account</Link></p>
        </div>
    </>
    );
}

export default LoginPage;