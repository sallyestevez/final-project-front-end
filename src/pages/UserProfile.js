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
                <h1 className='PageTitle'>User Profile</h1>
                <div class="UserProfile">
                    <div className=''>
                    <p>
                        <strong>Display Name: </strong>
                        {userInformation.displayName}
                    </p>
                    <p>
                        <strong>Email: </strong>
                        {userInformation.email}
                    </p>
                    <p>
                        <strong>User ID: </strong>
                        {userInformation.uid}
                    </p>
                </div>
            </div>
                
            </div>
        </>
    );
}

export default UserProfilePage;