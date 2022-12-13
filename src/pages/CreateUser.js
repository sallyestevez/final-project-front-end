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
            if(!e.currentTarget) return;
            // e.currentTarget -referencing form that exists at the time
            // assign email and password to variables from form
            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            const displayName = e.currentTarget.displayName.value;

            console.log({displayName})

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
                       // provide information about user via setState 
                        setUserInformation({
                            email: user.email,
                            displayName: displayName,
                            uid: user.uid,
                            accessToken: user.accessToken,
                        });
                    })
                    .catch((err) => {
                        const errorCode = err.code;
                        const errorMessage = err.message;
                        console.warn({ err, errorCode, errorMessage });
                        setErrors(errorMessage);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.warn({ error, errorCode, errorMessage });
                    setErrors(errorMessage);
                });
        },
        [ setErrors, setIsLoggedIn, setUserInformation ]
    );
    
    return (
        <>
            <Header 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn} 
                setUserInformation={setUserInformation} 
            />
            <div className="PageWrapper">
                <h1 className='PageTitle'>Welcome!</h1>
                <div class="InputField">
                    <CreateUserForm signUpUser={signUpUser}/>
                    <p>{errors}</p>
                </div>
                <p className='Account'>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </>
    );
}

export default CreateUserPage;