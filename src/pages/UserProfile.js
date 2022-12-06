import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function UserProfilePage({ isLoading, isLoggedIn, setIsLoggedIn, setUserInformation, userInformation }) {
    const navigate = useNavigate();

    // if not logged in & not loading navigate to login page
    useEffect(() => {
        if(!isLoggedIn && !isLoading) navigate("/login");
    }, [isLoading, isLoggedIn, navigate]);

    return (
        <>
            <Header 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn} 
                setUserInformation={setUserInformation}
            />
            <div className="PageWrapper">
                <h1>User Profile</h1>
                <p>
                    <strong>Display Name: </strong>
                    {userInformation.displayName}
                </p>
                <p>
                    <strong>Email: </strong>
                    {userInformation.email}
                </p>
            </div>
        </>
    );
}

export default UserProfilePage;