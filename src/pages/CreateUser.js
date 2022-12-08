import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import CreateUserForm from '../components/CreateUserForm';
import Header from '../components/Header';

function CreateUserPage({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    // if logged in navigate to Home/User Profile
    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn, navigate]);

    const signUpUser = useCallback(
        // generic argument placeholder (element)
        (e) => {
            e.preventDefault();

            // e.currentTarget -referencing form that exists at the time
            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            const displayName = e.currentTarget.displayName.value;

            const auth = getAuth();

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // since the user is true, set logged in
                    setIsLoggedIn(true);
                    // clear any errors
                    setErrors();
                
                // code to add display name to info
                // chain information
                updateProfile(user, { displayName: displayName })
                    .then(() => {
                        setUserInformation({
                            email: user.email,
                            displayName: user.displayName,
                            uid: user.uid,
                            accessToken: user.accessToken,
                        });
                    })
                    .catch((err) => {
                        const errorCode = err.code;
                        const errorMessage = err.message;
                        console.warn({err, errorCode, errorMessage });
                        setErrors(errorMessage);
                    })
                
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.warn({error, errorCode, errorMessage });
                    setErrors(errorMessage);
                });
        }),
        [getAuth, setErrors, setIsLoggedIn, setUserInformation]
    });
    
    return (
        <>
            <Header 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn} 
                setUserInformation={setUserInformation} 
            />
            <div className="PageWrapper">
                <h1 className='loginMessage'>Welcome!</h1>
                <CreateUserForm signUpUser={signUpUser}/>
                <p>{errors}</p>
                <p>Already have an account?</p>
                <p><Link to="/login">Login</Link></p>
            </div>
        </>
    );
}

export default CreateUserPage;